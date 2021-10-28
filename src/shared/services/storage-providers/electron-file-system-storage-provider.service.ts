import { Injectable } from '@angular/core';
import { Episode } from "../../../app/episode/episode.models";
import { emptyEpisode } from '../../../app/episode/episode.utils';
//import { MostRecentlyUsedItem } from 'src/app/most-recently-used/most-recently-used.models';
import StorageProvider from './StorageProvider';

// TODO: Is there an "import" way to do this?
const {ipcRenderer} = (<any>window).require('electron');
//import { ipcRenderer } from 'electron';

@Injectable({
  providedIn: 'root',
})
export class ElectronFileSystemStorageProviderService
  implements StorageProvider
{

  constructor() {}

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
 
  // saveMostRecentlyUsedItem = async (item: MostRecentlyUsedItem) => {
  //   const response = await ipcRenderer.invoke(
  //     'file-system-save-most-recently-used-item',
  //     item.episodeId,
  //     item.episodeLocation,
  //     item.lastLoaded
  //   );    
  // }

  // loadMostRecentlyUsedItems = async () => {
  //   const response = await ipcRenderer.invoke(
  //     'file-system-load-most-recently-used-items'
  //   );      
  //   return response;
  // };  

}