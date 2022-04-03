import { createSelector, createFeatureSelector } from '@ngrx/store';
import { orderableItemDictionaryToArray } from '@app/episode/episode.utils';
import { EPISODE_STORE } from '@app/episode/episode.consts';
import { Episode } from '@app/episode/episode.models';

export const selectParts = createSelector(
  createFeatureSelector(EPISODE_STORE),
  (state: Episode) => {
    console.log('Select Parts');
    return orderableItemDictionaryToArray(state.parts);
  },
);
