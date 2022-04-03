import { createSelector, createFeatureSelector } from '@ngrx/store';
import { Episode } from '@app/episode/episode.models';
import { EPISODE_STORE } from '@app/episode/episode.consts';

export const selectEpisodeInfo = createSelector(
  createFeatureSelector(EPISODE_STORE),
  (episode: Episode) => {
    console.log('Select Episode Info', episode.info);
    return episode.info;
  },
);
