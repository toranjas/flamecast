import { createSelector, createFeatureSelector } from '@ngrx/store';
import { Episode } from '@app/episode/episode.models';
import { orderableItemDictionaryToArray } from '@app/episode/episode.utils';

export const selectParts = createSelector(
  createFeatureSelector('episode'),
  (state: Episode) => {
    console.log('Select Parts');
    return orderableItemDictionaryToArray(state.parts);
  },
);
