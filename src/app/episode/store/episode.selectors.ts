import { createSelector, createFeatureSelector } from '@ngrx/store';
import { Episode } from '../episode.models';

export const selectEpisodeState = createSelector(
  createFeatureSelector('episode'),
  (state: Episode) => state
);
