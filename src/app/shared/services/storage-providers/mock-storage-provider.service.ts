import { Injectable } from '@angular/core';
import { MostRecentlyUsedItem } from '@app/most-recently-used/most-recently-used.models';
import { Episode } from '../../../episode/episode.models';
import { emptyEpisode, emptyEpisodeInfo } from '../../../episode/episode.utils';
import StorageProvider from './StorageProvider';

@Injectable({
  providedIn: 'root',
})
export class MockStorageProviderService implements StorageProvider {
  constructor() {}

  createEpisode = async (episodeLocation: string) => emptyEpisode();

  saveEpisode = async (episode: Episode) => {
    // Do nothing
  };

  loadEpisode = async (episodeLocation: string) =>
    // SH: Feel free to add any mock data you want here that makes it easier to build the UI.
    ({
      id: 'MOCK_EPISODE',
      info: emptyEpisodeInfo(),
      segments: {},
      parts: {},
      slides: {},
      takes: {},
    });

  saveMostRecentlyUsedItem = async (item: MostRecentlyUsedItem) => {
    // Do nothing
  };

  loadMostRecentlyUsedItems = async (): Promise<MostRecentlyUsedItem[]> => {
    return [];
  };
}
