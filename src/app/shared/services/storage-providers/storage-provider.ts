import { Observable } from 'rxjs';
import { MostRecentlyUsedItem } from '@app/most-recently-used/most-recently-used.models';
import { Episode, EpisodeInfo } from '@app/episode/episode.models';

export default interface StorageProvider {
  createEpisode: (
    episodeLocation: string,
    episodeInfo?: EpisodeInfo,
  ) => Observable<Episode | undefined>;

  saveEpisode: (episode: Episode) => Observable<void>;

  loadEpisode: (episodeLocation: string) => Observable<Episode | undefined>;

  saveMostRecentlyUsedItem: (item: MostRecentlyUsedItem) => Observable<void>;

  loadMostRecentlyUsedItems: () => Observable<MostRecentlyUsedItem[]>;

  openSelectFolderDialog: (
    title: string,
    buttonLabel: string,
  ) => Observable<{
    canceled: boolean;
    folder: string;
  }>;
}
