import { createAction, props } from '@ngrx/store';
import { Part } from '@app/episode/episode.models';

export const createPartAction = createAction(
  '[Parts] Create',
  props<{ name: string; segmentId: string; order?: number }>(),
);

export const changePartPropertiesAction = createAction(
  '[Parts] Change Properites',
  props<{ partId: string; changes: Partial<Part> }>(),
);

export const movePartUpAction = createAction(
  '[Parts] Move Up',
  props<{ partId: string }>(),
);

export const movePartDownAction = createAction(
  '[Parts] Move Down',
  props<{ partId: string }>(),
);

export const deletePartAction = createAction(
  '[Parts] Delete',
  props<{ partId: string }>(),
);
