import { Injectable } from '@angular/core';
import { Episode } from '@app/episode/episode.models';
import { emptyEpisode } from '@app/episode/episode.utils';
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
export class ElectronFileSystemStorageProviderService
  implements StorageProvider
{
  private ipcRenderer: any;

  constructor() {
    const { ipcRenderer } = (window as any).require('electron');
    this.ipcRenderer = ipcRenderer;
  }

  createEpisode = async (episodeLocation: string) => {
    const newEpisode = emptyEpisode();
    await this.ipcRenderer.invoke(
      'file-system-create-episode',
      episodeLocation,
      newEpisode,
    );

    return newEpisode;
  };

  saveEpisode = async (episode: Episode) => {
    await this.ipcRenderer.invoke('file-system-save-episode', episode);
  };

  loadEpisode = async (episodeLocation: string) => {
    return await this.ipcRenderer.invoke(
      'file-system-load-episode',
      episodeLocation,
    );
  };
}
