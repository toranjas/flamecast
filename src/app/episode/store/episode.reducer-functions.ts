import { Episode } from '../episode.models';

export const loadEpisodeSuccess = (
  state: Episode,
  { episode }: { episode: Episode; episodeLocation: string }
): Episode => episode;
