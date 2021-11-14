import { Injectable } from '@angular/core';
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
  providedIn: 'root'
})
export class ElectronFileSystemStorageProviderService implements StorageProvider {

  private ipcRenderer: any;

  constructor() { 
    const {ipcRenderer} = (<any>window).require('electron');
    this.ipcRenderer = ipcRenderer;
  }


  createEpisode = async (episodeLocation: string) => {
    const newEpisode = emptyEpisode();
    const response = await this.ipcRenderer.invoke(
      'file-system-create-episode',
      episodeLocation,
      newEpisode
    );
    return newEpisode;
  }

  saveEpisode = async (episode: Episode) => {
    const response = await this.ipcRenderer.invoke(
      'file-system-save-episode',
      episode
    );
  }

  loadEpisode = async (episodeLocation: string) => {
    const response = await this.ipcRenderer.invoke(
      'file-system-load-episode',
      episodeLocation
    );
    return response;
  }
  

}
