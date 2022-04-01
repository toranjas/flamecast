import { createAction, props } from '@ngrx/store';
import { EpisodeInfo } from '@app/episode/episode.models';

export const changeInfoPropertiesAction = createAction(
  '[Info] Change Properites',
  props<Partial<EpisodeInfo>>(),
);
