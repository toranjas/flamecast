import { ipcMain } from 'electron';

const fs = require('fs').promises;
const fsSync = require('fs');
const path = require('path');

let currentEpisodeLocation: string = '';


export const initializeFileSystemHandlers = () => {

  console.log();
  console.log("Initializing file system handlers.");

  ipcMain.handle(
    'file-system-create-episode',
    async(
      e: any,
      episodeLocation: string,
      episode: object
    ) => {
      console.log('Creating episode.', episodeLocation);
  
      if(!episodeLocation) throw new Error('Episode location is undefined or blank.');
      if(episodeLocation.trim().length === 0) throw new Error('Episode location is blank.');
  
      const exists = fsSync.existsSync(episodeLocation);   
      if(exists) throw new Error('Episode already exists.');
  
      // TODO: If another .flamecast file is in this directory, boom!
      // TODO: If episodeIdentifier isn't a valid path, BOOM!
  
      // Episode Identifier is the path to the file
      const fullPathToFile = episodeLocation;
      currentEpisodeLocation = episodeLocation;
  
      // Make the directory
      const directoryPath = path.dirname(fullPathToFile);
      console.log('Making directory', directoryPath);
      var mkdirResponse = await fs.mkdir(directoryPath, { recursive: true });
      console.log('Directory created probably', mkdirResponse);
  
      // Make the file
      const jsonContents = JSON.stringify(episode, null, 2);
      console.log('Writing file', fullPathToFile);
      console.log("File's contents are: ", jsonContents);
      var writeResponse = await fs.writeFile(fullPathToFile, jsonContents);
      console.log('File written probably.', writeResponse);
  
      console.log('Save JSON item complete.');
    }
  );
  
  ipcMain.handle(
    'file-system-save-episode',
    async (
      e: any,
      episode:object
    ) => {
      console.log('Saving episode');
  
      if(!currentEpisodeLocation){
        throw new Error('Episode not loaded.');
      }
  
  
      // // Make the directory
      // const directoryPath = getFullPathToDirectory(itemType, itemId);
      // console.log("Making directory", directoryPath);
      // var mkdirResponse = await fs.mkdir(directoryPath, { recursive: true});
      // console.log("Directory created probably", mkdirResponse);
  
      // Make the file
      const filePath = currentEpisodeLocation;
      const jsonContents = JSON.stringify(episode, null, 2);
      console.log("Writing file", filePath);
      console.log("File's contents are: ", jsonContents);
      var writeResponse = await fs.writeFile(filePath, jsonContents);
      console.log("File written probably.", writeResponse);
  
      console.log("Episode saved.");
    }
  );
  
  ipcMain.handle(
    'file-system-load-episode',
    async (
      e: any,
      episodeLocation: string
    ) => {
      console.log('Loading episode', {
        episodeLocation
      });
  
      if(!episodeLocation) throw new Error('Episode location is undefined or blank.');
      if(episodeLocation.trim().length === 0) throw new Error('Episode location is blank.');
  
      const exists = fsSync.existsSync(episodeLocation);   
      if(!exists) throw new Error('Episode does not exists.');
  
  
      // TODO: If episodeIdentifier isn't a valid path, BOOM!
  
      // Episode Identifier is the path to the file
      const fullPathToFile = episodeLocation;
      currentEpisodeLocation = episodeLocation;
  
      console.log("Loading file. ", fullPathToFile);
  
      const data = await fs.readFile(fullPathToFile, 'utf8');
  
      console.log("Data from file: ", data);
      
      return JSON.parse(data);
  
    }
  );

  console.log("File system handlers initialized.");
  console.log();

};