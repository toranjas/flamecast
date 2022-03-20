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

// // Services
import StorageProvider from 'src/app/shared/services/storage-providers/StorageProvider';

// Actions
import { loadEpisodeSuccessAction } from '../../episode/store/episode.actions';
import {
  loadMostRecentlyUsedItemsAction,
  loadMostRecentlyUsedItemsSuccessAction,
  upsertMostRecentlyUsedItemAction,
} from './most-recently-used.actions';

// import { EpisodeState } from '../episode.models';
// import { selectEpisodeState } from './episode.selectors';
// import { episodeHasChanges } from '../episode.utils';

@Injectable()
export class MostRecentlyUsedEffects {
  updateMostRecentlyUsedList$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadEpisodeSuccessAction),
      map((action) => ({
        episodeId: action.episode.id,
        episodeLocation: action.episodeLocation,
        lastLoaded: new Date(),
      })),
      mergeMap((recentItem) =>
        from(this.storageProvider.saveMostRecentlyUsedItem(recentItem)).pipe(
          map((data) => upsertMostRecentlyUsedItemAction(recentItem)), // We call "Load" here because we are loading the newly-created episode
          catchError((e) => {
            console.log('FAILED TO SAVE MRU!!!!');
            console.log(e);
            return EMPTY;
          }),
        ),
      ),
    ),
  );

  loadMostRecentlyUsedList = createEffect(() =>
    this.actions$.pipe(
      ofType(loadMostRecentlyUsedItemsAction),
      mergeMap((action) =>
        from(this.storageProvider.loadMostRecentlyUsedItems()).pipe(
          map(
            (data) => loadMostRecentlyUsedItemsSuccessAction({ items: data }),
            catchError((e) => {
              console.log('FAILED TO LOAD MRUs!!!!');
              console.log(e);
              return EMPTY;
            }),
          ),
        ),
      ),
    ),
  );

  constructor(
    private store: Store,
    private actions$: Actions,
    @Inject('StorageProvider') private storageProvider: StorageProvider,
  ) {}
}
