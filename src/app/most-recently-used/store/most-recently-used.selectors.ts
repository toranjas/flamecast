import { createFeatureSelector, createSelector } from '@ngrx/store';
import { MostRecentlyUsedItem } from '../most-recently-used.models';
import { compareMostRecentlyUsedItem } from '../most-recently-used.utils';

export const selectMostRecentlyUsedItems = createSelector(
  createFeatureSelector('mostRecentlyUsed'),
  (state: Array<MostRecentlyUsedItem>) =>
    [...state].sort(compareMostRecentlyUsedItem),
);
