import { Inject, Injectable } from '@angular/core';

// // RxJs
import { EMPTY, from, OperatorFunction } from 'rxjs';
import {
  mergeMap,
  tap,
  map,
  catchError,
  startWith,
  pairwise,
  filter,
} from 'rxjs/operators';

// NgRx
import { Store } from '@ngrx/store';
import { Actions, createEffect, ofType } from '@ngrx/effects';

// Services
import StorageProvider from '../../shared/services/storage-providers/StorageProvider';

// Actions
import { 
  createEpisodeAction, 
  loadEpisodeAction, 
  loadEpisodeSuccessAction, 
  saveEpisodeSuccessAction 
} from './episode.actions';

import { Episode } from '../episode.models';
import { selectEpisodeState } from './episode.selectors';
import { episodeHasChanges } from '../episode.utils';


@Injectable()
export class EpisodeEffects {
  // DN: Investigate the 'Loadable API' pattern.

  stopSavingChanges: boolean = false;
  hasLoadedOrCreated: boolean = false;

  //#region Helpers

  private readonly suspendSave = tap((episode: Episode) => {
    // Suspend saving until load is successfully finished
    this.stopSavingChanges = true;
    console.log("Preventing save.");

    // Letting the save routine know that it is allowed to save...
    // Once saving changes is no longer suspended.
    // When this is false (the initial value), it prevents saving when
    // the store is initialized.
    // Dorival - is there a better way to detect that a change is occuring because the store is initializing?
    this.hasLoadedOrCreated = true;
  });

  //#endregion

  createEpisode$ = createEffect(() =>
    this.actions$.pipe(
      ofType(createEpisodeAction),
      mergeMap((action) => 
        
         from(this.storageProvider.createEpisode(action.episodeLocation)).pipe(
          // Don't Propigate Episode if it is undefined
          filter((episode) => episode !== undefined) as OperatorFunction<
          Episode | undefined,
          Episode
          >,
          this.suspendSave,
          map((episode) => loadEpisodeSuccessAction({ episode, episodeLocation: action.episodeLocation })), // We call "Load" here because we are loading the newly-created episode
          catchError((e) => {
            console.log('FAILED TO CREATE EPISODE!!!!');
            console.log(e);
            return EMPTY;
          })
        )
      )
    )
  );

  loadEpisode$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadEpisodeAction),
      mergeMap((action) =>
        from(this.storageProvider.loadEpisode(action.episodeLocation)).pipe(
          // Don't Propigate Episode if it is undefined
          filter((episode) => episode !== undefined) as OperatorFunction<
          Episode | undefined,
          Episode
          >,
          this.suspendSave,         
          map((episode) => loadEpisodeSuccessAction({ episode, episodeLocation: action.episodeLocation })),
          catchError((e) => {
            console.log('FAILED TO LOAD EPISODE!!!!');
            console.log(e);
            return EMPTY;
          })
        )
      )
    )
  );

  loadEpisodeSucceeded$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadEpisodeSuccessAction),
      tap(action => {
        // Resume saving changes
        this.stopSavingChanges = false;
        console.log("Allowing save.");
      }),
    ),
    { dispatch: false });

  isFirstTime: boolean = true;

  saveEpisode$ = createEffect(
    () =>
      this.store.select(selectEpisodeState).pipe(
        startWith(undefined),

        // Don't do anything in this pipeline of saving is suspended
        filter(episode => {
          if(!this.hasLoadedOrCreated) {
            console.log("Saving prevented. Episode has not loaded or been created yet.");
            return false;
          }
          if(this.stopSavingChanges) {
            console.log("Saving prevented. Episode is currently creating or loading.");
            return false;
          }
          return true;
        }),

        // Get before-and-after
        pairwise(),

        // TODO: Perhaps want to know whether the episode is being loaded
        // Don't want to save what is already loading

        // Filter out store changes that don't affect episode state
        filter(([before, after]) => episodeHasChanges(before, after)),

        // Just get the "after"
        // We don't care *what* changed
        map(([before, after]) => after),

        // Filter out situations where 'after' is undefined
        // Which... should never happen.
        // But the typescript compiler doesn't know that
        filter((after) => after !== undefined) as OperatorFunction<
        Episode | undefined,
        Episode
        >,

        tap(action => {
          console.log("Saving...");
        }),

        // Do the actual saving
        mergeMap((after) =>
          from(this.storageProvider.saveEpisode(after)).pipe(
            map(() => saveEpisodeSuccessAction()),
            catchError((e) => {
              console.log('FAILED TO SAVE EPISODE!!!!');
              console.log(e);
              return EMPTY;
            })
          )
        )
      )
  );

  constructor(
    private store: Store,
    private actions$: Actions,
    @Inject('StorageProvider') private storageProvider: StorageProvider
  ) {}
}
