import { createAction, props } from '@ngrx/store';
import { Episode } from '../episode.models';

export const createEpisodeAction = createAction(
  '[Episode] Create',
  props<{episodeLocation: string}>()
);

export const loadEpisodeAction = createAction(
  '[Episode] Load',
  props<{episodeLocation: string}>()
);

export const loadEpisodeSuccessAction = createAction(
  '[Episode] Load Success',
  props<{episode: Episode; episodeLocation: string}>()
);

export const saveEpisodeSuccessAction = createAction(
  '[Episode] Save Success'
);
