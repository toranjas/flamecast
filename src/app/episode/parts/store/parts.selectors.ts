import { createSelector, createFeatureSelector } from '@ngrx/store';
import { Episode } from '../../episode.models';
import { orderableItemDictionaryToArray } from '../../episode.utils';

export const selectParts = createSelector(
  createFeatureSelector('episode'),
  (state: Episode) => {
    console.log("Select Parts");
    return orderableItemDictionaryToArray(state.parts);
  }
)