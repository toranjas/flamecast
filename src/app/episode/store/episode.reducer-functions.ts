import { Episode } from '../episode.models';

export const loadEpisodeSuccess = (
  _state: Episode,
  { episode }: { episode: Episode; episodeLocation: string },
): Episode => {
  console.log('Load episode success', episode);
  return {
    ...episode,
  };
};
