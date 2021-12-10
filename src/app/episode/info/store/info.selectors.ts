import { createSelector, createFeatureSelector } from '@ngrx/store';
import { Episode } from '@app/episode/episode.models';

export const selectEpisodeInfo = createSelector(
  createFeatureSelector('episode'),
  (episode: Episode) => episode.info,
);
