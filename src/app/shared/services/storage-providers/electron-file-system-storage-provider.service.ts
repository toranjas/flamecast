import { Injectable } from '@angular/core';
import { Episode } from '../../../episode/episode.models';
import { emptyEpisode } from '../../../episode/episode.utils';
import StorageProvider from './StorageProvider';

// TODO: Is there an "import" way to do this?
const {ipcRenderer} = (<any>window).require('electron');

@Injectable({
  providedIn: 'root'
})
export class ElectronFileSystemStorageProviderService implements StorageProvider {

  constructor() { }


  createEpisode = async (episodeLocation: string) => {
    const newEpisode = emptyEpisode();
    const response = await ipcRenderer.invoke(
      'file-system-create-episode',
      episodeLocation,
      newEpisode
    );
    return newEpisode;
  }

  saveEpisode = async (episode: Episode) => {
    const response = await ipcRenderer.invoke(
      'file-system-save-episode',
      episode
    );
  }

  loadEpisode = async (episodeLocation: string) => {
    const response = await ipcRenderer.invoke(
      'file-system-load-episode',
      episodeLocation
    );
    return response;
  }
  

}
