import { Injectable } from '@angular/core';
import { MostRecentlyUsedItem } from '@app/most-recently-used/most-recently-used.models';
import { Episode } from '../../../episode/episode.models';
import { emptyEpisode } from '../../../episode/episode.utils';
import StorageProvider from './StorageProvider';

// SH: I had to move this down to the constructor.
//     When doing "browser only" development, electron is not available.
//     Thus, the call to require('electron') would throw and nothing else could work.
//     Now, we are only making a new ElectronFileSystemStorageProviderService() if running in electron.
//     See storage-provider-factory.ts
// const {ipcRenderer} = (<any>window).require('electron');

@Injectable({
  providedIn: 'root',
})
export class ElectronFileSystemStorageProviderService implements StorageProvider {
  private ipcRenderer: any;

  constructor() {
    const { ipcRenderer } = (window as any).require('electron');
    this.ipcRenderer = ipcRenderer;
  }

  createEpisode = async (episodeLocation: string) => {
    const newEpisode = emptyEpisode();
    const response = await this.ipcRenderer.invoke(
      'file-system-create-episode',
      episodeLocation,
      newEpisode,
    );
    return newEpisode;
  };

  saveEpisode = async (episode: Episode) => {
    const response = await this.ipcRenderer.invoke('file-system-save-episode', episode);
  };

  loadEpisode = async (episodeLocation: string) => {
    const response = await this.ipcRenderer.invoke('file-system-load-episode', episodeLocation);
    return response;
  };

  saveMostRecentlyUsedItem = async (item: MostRecentlyUsedItem) => {
    console.log('Saving most recently used item.', item);
    const response = await this.ipcRenderer.invoke(
      'file-system-save-most-recently-used-item',
      item.episodeId,
      item.episodeLocation,
      item.lastLoaded,
    );
  };

  loadMostRecentlyUsedItems = async () => {
    console.log('Loading most recently used items.');
    const response = await this.ipcRenderer.invoke('file-system-load-most-recently-used-items');
    return response;
  };
}
