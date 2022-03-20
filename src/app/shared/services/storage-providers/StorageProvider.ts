import { MostRecentlyUsedItem } from '@app/most-recently-used/most-recently-used.models';
import { Episode } from '../../../episode/episode.models';

export default interface StorageProvider {
  createEpisode: (episodeLocation: string) => Promise<Episode | undefined>;

  saveEpisode: (episode: Episode) => Promise<void>;

  loadEpisode: (episodeLocation: string) => Promise<Episode | undefined>;

  saveMostRecentlyUsedItem: (item: MostRecentlyUsedItem) => Promise<void>;

  loadMostRecentlyUsedItems: () => Promise<Array<MostRecentlyUsedItem>>;
}
