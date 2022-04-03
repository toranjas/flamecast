import { Injectable } from '@angular/core';
import { IpcRenderer } from 'electron';
import { defer, from, Observable } from 'rxjs';
import { filter, map, mapTo } from 'rxjs/operators';

import { MostRecentlyUsedItem } from '@app/most-recently-used/most-recently-used.models';
import { Episode, EpisodeInfo } from '@app/episode/episode.models';
import { emptyEpisode, emptyEpisodeInfo } from '@app/episode/episode.utils';
import StorageProvider from './storage-provider';

// SH: I had to move this down to the constructor.
//     When doing "browser only" development, electron is not available.
//     Thus, the call to require('electron') would throw and nothing else could work.
//     Now, we are only making a new ElectronFileSystemStorageProviderService() if running in electron.
//     See storage-provider-factory.ts
// const {ipcRenderer} = (<any>window).require('electron');

const CREATE_EPISODE = 'file-system-create-episode';
const LOAD_EPISODE = 'file-system-load-episode';
const SAVE_EPISODE = 'file-system-save-episode';
const SAVE_RECENT_LIST = 'file-system-save-most-recently-used-item';
const LOAD_RECENT_LIST = 'file-system-load-most-recently-used-items';
const OPEN_DIALOG = 'file-system-open-dialog';

@Injectable({
  providedIn: 'root',
})
export class ElectronFileSystemStorageProviderService implements StorageProvider {
  private ipcRenderer: IpcRenderer;

  constructor() {
    const { ipcRenderer } = (window as any).require('electron');
    this.ipcRenderer = ipcRenderer;
  }

  /**
   * Create a new episode in the file system
   *
   * @param episodeLocation ??
   * @param episodeInfo Episode Info to inject into the created episode
   */
  createEpisode(
    episodeLocation: string,
    episodeInfo?: EpisodeInfo,
  ): Observable<Episode | undefined> {
    const newEpisode = {
      ...emptyEpisode(),
      info: !episodeInfo ? emptyEpisodeInfo() : episodeInfo,
    };

    // Convert from Promise to Observable
    // https://trungk18.com/experience/convert-promise-to-observable/
    return defer(() => this.ipcRenderer.invoke(CREATE_EPISODE, episodeLocation, newEpisode)).pipe(
      mapTo(newEpisode),
    );
  }

  saveEpisode(episode: Episode): Observable<void> {
    // TODO: On error, we can catch here and wrap into a common API Response (TBD)
    return from(this.ipcRenderer.invoke(SAVE_EPISODE, episode));
  }

  // TODO: If an episode fail to load, should throw error instead of returning undefined
  //       Since Effects filter out undefined episodes, this can  be done here
  loadEpisode(episodeLocation: string): Observable<Episode | undefined> {
    return from(this.ipcRenderer.invoke(LOAD_EPISODE, episodeLocation)).pipe(
      filter((episode) => episode !== undefined),
    );
  }

  saveMostRecentlyUsedItem(item: MostRecentlyUsedItem): Observable<void> {
    console.log('Saving most recently used item.', item);
    return from(
      this.ipcRenderer.invoke(
        SAVE_RECENT_LIST,
        item.episodeId,
        item.episodeLocation,
        item.lastLoaded,
      ),
    );
  }

  loadMostRecentlyUsedItems(): Observable<MostRecentlyUsedItem[]> {
    console.log('Loading most recently used items.');
    return from(this.ipcRenderer.invoke(LOAD_RECENT_LIST));
  }

  /**
   * Opens a Select Folder native dialog
   * https://medium.com/developer-rants/opening-system-dialogs-in-electron-from-the-renderer-6daf49782fd8
   */
  openSelectFolderDialog(
    title: string,
    buttonLabel: string,
  ): Observable<{ canceled: boolean; folder: string }> {
    const config = {
      title,
      buttonLabel,
      properties: ['openDirectory', 'createDirectory', 'promptToCreate'],
    };

    return from(this.ipcRenderer.invoke(OPEN_DIALOG, config)).pipe(
      map(({ canceled, filePaths }) => {
        const folder = canceled ? '' : filePaths[0];
        return {
          canceled,
          folder,
        };
      }),
    );
  }
}
