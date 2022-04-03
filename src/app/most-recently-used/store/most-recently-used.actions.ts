import { createAction, props } from '@ngrx/store';
import { MostRecentlyUsedItem } from '../most-recently-used.models';

export const upsertMostRecentlyUsedItemAction = createAction(
  '[Most Recently Used] Upsert Item',
  props<MostRecentlyUsedItem>(),
);

export const loadMostRecentlyUsedItemsAction = createAction('[Most Recently Used] Load Items');

export const loadMostRecentlyUsedItemsSuccessAction = createAction(
  '[Most Recently Used] Load Items Success',
  props<{ items: MostRecentlyUsedItem[] }>(),
);
