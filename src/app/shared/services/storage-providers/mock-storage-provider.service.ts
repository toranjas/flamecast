import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { MostRecentlyUsedItem } from '@app/most-recently-used/most-recently-used.models';
import { Episode, EpisodeInfo } from '@app/episode/episode.models';
import { emptyEpisode, emptyEpisodeInfo } from '@app/episode/episode.utils';
import StorageProvider from './storage-provider';

@Injectable({
  providedIn: 'root',
})
export class MockStorageProviderService implements StorageProvider {
  constructor() {}

  createEpisode(
    _episodeLocation: string,
    _episodeInfo?: EpisodeInfo,
  ): Observable<Episode | undefined> {
    return of(emptyEpisode());
  }

  saveEpisode(episode: Episode): Observable<void> {
    return of(undefined);
  }

  loadEpisode(episodeLocation: string): Observable<Episode | undefined> {
    // SH: Feel free to add any mock data you want here that makes it easier to build the UI.
    return of({
      id: 'MOCK_EPISODE',
      info: emptyEpisodeInfo(),
      segments: {},
      parts: {},
      slides: {},
      takes: {},
    });
  }

  saveMostRecentlyUsedItem(item: MostRecentlyUsedItem): Observable<void> {
    return of(undefined);
  }

  loadMostRecentlyUsedItems(): Observable<MostRecentlyUsedItem[]> {
    return of([]);
  }

  openSelectFolderDialog(
    title: string,
    buttonLabel: string,
  ): Observable<{ canceled: boolean; folder: string }> {
    console.log(`Dialog to select folder titled ${title} with button ${buttonLabel}`);
    return of({
      canceled: false,
      folder: '/home/',
    });
  }
}
