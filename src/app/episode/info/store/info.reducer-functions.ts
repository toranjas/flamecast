import { Episode, EpisodeInfo } from '@app/episode/episode.models';

export const setInfoProperties = (
  state: Episode,
  payload: Partial<EpisodeInfo>,
) => ({
  ...state,
  info: {
    ...state.info,
    ...payload,
  },
});
