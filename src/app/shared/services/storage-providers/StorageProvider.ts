import { Episode } from '@app/episode/episode.models';

export default interface StorageProvider {
  createEpisode: (episodeLocation: string) => Promise<Episode | undefined>;
  saveEpisode: (episode: Episode) => Promise<void>;
  loadEpisode: (episodeLocation: string) => Promise<Episode | undefined>;
}
