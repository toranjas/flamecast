import { Episode, EpisodeInfo } from "../../episode.models";

export const setInfoProperties = (state: Episode, payload: Partial<EpisodeInfo>) => ({
  ...state,
  info: {
    ...state.info,
    ...payload
  }
})