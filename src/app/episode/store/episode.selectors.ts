import { createSelector, createFeatureSelector } from '@ngrx/store';
import { EPISODE_STORE } from '../episode.consts';
import { Episode } from '../episode.models';

export const selectEpisodeState = createSelector(
  createFeatureSelector(EPISODE_STORE),
  (state: Episode) => state,
);

export const selectIsEpisodeLoaded = createSelector(
  createFeatureSelector(EPISODE_STORE),
  (state: Episode) => {
    // This is where the loadable API will help, for now I'm just checking if there is a title
    // Better way is to have a flag, and the actual episode model nested, something like
    /*
    "@flame/episode": {
      status: {
        isLoaded: true,
        isSaving: false,
        etc,
      },
      episode: { ... }
    }
    */
    return !!state?.info?.title;
  },
);
