import { createSelector, createFeatureSelector } from '@ngrx/store';
import { Episode } from '../../episode.models';

export const selectEpisodeInfo = createSelector(
  createFeatureSelector('episode'),
  (episode: Episode) => episode.info
);
