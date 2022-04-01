/*
 * It's time to see the Loadable API, so we can plug an auto save in the meta-reducer
 * https://medium.com/angular-in-depth/handle-api-call-state-nicely-445ab37cc9f8
 * https://www.npmjs.com/package/loadable-state
 * or
 * https://indepth.dev/posts/1033/ngrx-how-and-where-to-handle-loading-and-error-states-of-ajax-calls
 */
import { Inject, Injectable } from '@angular/core';

// RxJs
import { EMPTY } from 'rxjs';
import {
  map,
  catchError,
  exhaustMap,
  debounceTime,
  withLatestFrom,
  switchMap,
  mapTo,
  pairwise,
  filter,
} from 'rxjs/operators';

// NgRx
import { Store } from '@ngrx/store';
import { Actions, createEffect, ofType } from '@ngrx/effects';

// Services
import StorageProvider from '@app/shared/services/storage-providers/storage-provider';

// Actions
import {
  createEpisodeAction,
  loadEpisodeAction,
  loadEpisodeSuccessAction,
  saveEpisodeAction,
  saveEpisodeSuccessAction,
} from './episode.actions';

import { Episode } from '../episode.models';
import { selectEpisodeState } from './episode.selectors';
import { AUTOSAVE_ACTIONS } from '../episode.consts';
import { episodeHasChanges } from '../episode.utils';

@Injectable()
export class EpisodeEffects {
  // DN: Investigate the 'Loadable API' pattern.

  createEpisode$ = createEffect(() =>
    this.actions$.pipe(
      ofType(createEpisodeAction),
      exhaustMap(({ episodeLocation, episodeInfo }) =>
        this.storage
          .createEpisode(episodeLocation, episodeInfo)
          .pipe(map((episode) => [episode, episodeLocation])),
      ),
      map(([episode, episodeLocation]) => {
        return loadEpisodeSuccessAction({
          episode: episode as Episode,
          episodeLocation: episodeLocation as string,
        });
      }),
      catchError((error) => {
        console.log('FAILED TO CREATE EPISODE!!!!');
        console.log(error);
        return EMPTY;
      }),
    ),
  );

  loadEpisode$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadEpisodeAction),
      exhaustMap(({ episodeLocation }) =>
        this.storage
          .loadEpisode(episodeLocation)
          .pipe(map((episode) => [episode, episodeLocation])),
      ),
      map(([episode, episodeLocation]) =>
        loadEpisodeSuccessAction({
          episode: episode as Episode,
          episodeLocation: episodeLocation as string,
        }),
      ),
      catchError((error) => {
        console.log('FAILED TO LOAD EPISODE!!!!');
        console.log(error);
        return EMPTY;
      }),
    ),
  );

  saveEpisode$ = createEffect(() =>
    this.actions$.pipe(
      ofType(saveEpisodeAction),
      withLatestFrom(this.store.select(selectEpisodeState)),
      map(([_action, episode]) => episode),
      pairwise(),
      filter(([before, after]) => episodeHasChanges(before, after)),
      switchMap(([_before, episode]) => this.storage.saveEpisode(episode)),
      mapTo(saveEpisodeSuccessAction()),
    ),
  );

  autoSave$ = createEffect(() =>
    this.actions$.pipe(ofType(...AUTOSAVE_ACTIONS), debounceTime(500), mapTo(saveEpisodeAction())),
  );

  constructor(
    private store: Store,
    private actions$: Actions,
    @Inject('StorageProvider') private storage: StorageProvider,
  ) {}
}
