import { ActionReducer } from '@ngrx/store';
import { MostRecentlyUsedItem } from '../most-recently-used.models';
import { loadMostRecentlyUsedItemsSuccessAction } from './most-recently-used.actions';

export function loadMostRecentlyUsedItemsMetaReducer(
  reducer: ActionReducer<any>,
): ActionReducer<any> {
  return function (state, action) {
    if (action.type === loadMostRecentlyUsedItemsSuccessAction.type) {
      const data = (action as any).items as MostRecentlyUsedItem[];
      if (data) {
        return data;
      }
    }
    // We weren't interested so pass the message along
    return reducer(state, action);
  };
}
