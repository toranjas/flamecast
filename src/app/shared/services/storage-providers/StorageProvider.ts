import { MostRecentlyUsedItem } from '@app/most-recently-used/most-recently-used.models';
import { Episode, EpisodeInfo } from '../../../episode/episode.models';

export default interface StorageProvider {
  createEpisode: (
    episodeLocation: string,
    episodeInfo?: EpisodeInfo,
  ) => Promise<Episode | undefined>;

  saveEpisode: (episode: Episode) => Promise<void>;

  loadEpisode: (episodeLocation: string) => Promise<Episode | undefined>;

  saveMostRecentlyUsedItem: (item: MostRecentlyUsedItem) => Promise<void>;

  loadMostRecentlyUsedItems: () => Promise<Array<MostRecentlyUsedItem>>;

  openSelectFolderDialog: (
    title: string,
    buttonLabel: string,
  ) => Promise<{
    canceled: boolean;
    folder: string;
  }>;
}
