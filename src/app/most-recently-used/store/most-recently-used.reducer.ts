import { createReducer, on } from '@ngrx/store';
import { MostRecentlyUsedItem } from '../most-recently-used.models';
import {
  loadMostRecentlyUsedItemsSuccessAction,
  upsertMostRecentlyUsedItemAction,
} from './most-recently-used.actions';

const initialState: Array<MostRecentlyUsedItem> = [];

export const mostRecentlyUsedReducer = createReducer(
  initialState,
  on(upsertMostRecentlyUsedItemAction, (state, mostRecentlyUsedItem) => {
    const existingItem = state.find(
      (item) => item.episodeId === mostRecentlyUsedItem.episodeId,
    );
    if (!existingItem) {
      return [...state, mostRecentlyUsedItem];
    }

    const index = state.indexOf(existingItem);

    // Is index + 1 going to get me in trouble?
    // Seems that javascript returns an empty array if slicing outside of the bounds.
    // If so, God bless you, Javascript!!!
    return [
      ...state.slice(0, index),
      mostRecentlyUsedItem,
      ...state.slice(index + 1),
    ];
  }),
  on(loadMostRecentlyUsedItemsSuccessAction, (state, { items }) => {
    return items;
  }),
);
