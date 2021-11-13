import { createAction, props } from '@ngrx/store';
import { Segment } from '../../episode.models';

export const createSegmentAction = createAction(
  '[Segments] Create',
  props<{name: string, order?: number}>()
)

export const changeSegmentPropertiesAction = createAction(
  '[Segments] Change Properites',
  props<{ segmentId: string, changes: Partial<Segment>}>()
)

export const moveSegmentUpAction = createAction(
  '[Segments] Move Up',
  props<{segmentId: string}>()
)

export const moveSegmentDownAction = createAction(
  '[Segments] Move Down',
  props<{segmentId: string}>()
)

export const deleteSegmentAction = createAction(
  '[Segments] Delete',
  props<{segmentId: string}>()
)
