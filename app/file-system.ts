import { ipcMain, app } from 'electron';

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


// ███    ███ ██████  ██    ██ 
// ████  ████ ██   ██ ██    ██ 
// ██ ████ ██ ██████  ██    ██ 
// ██  ██  ██ ██   ██ ██    ██ 
// ██      ██ ██   ██  ██████  

const mostRecentlyUsedDirectory = path.join(app.getPath('userData'), "recent");

ipcMain.handle(
  'file-system-save-most-recently-used-item',
  async (
    e: any,
    episodeId: string,
    episodeLocation: string,
    lastLoaded: Date
  ) => {

    console.log('Saving MRU Item', {
      episodeId,
      episodeLocation,
      lastLoaded
    });

    // TODO: Validate things
    // Episode id is blank? Fail.
    // Episode Location is blank? Fail.

    // Ensure MRU directory exists
    console.log('Ensuring MRU directory exists.', mostRecentlyUsedDirectory);
    const mkdirResponse = await fs.mkdir(mostRecentlyUsedDirectory, { recursive: true });
    console.log('Directory created probably', mkdirResponse);

    // Filename
    const filename = path.join(mostRecentlyUsedDirectory, episodeId + ".json")

    // Contents
    const jsonContents = JSON.stringify({ episodeId, episodeLocation, lastLoaded }, null, 2);

    // Save the file
    console.log("Writing file", filename);
    console.log("File's contents are: ", jsonContents);
    var writeResponse = await fs.writeFile(filename, jsonContents);
    console.log("File written probably.", writeResponse);    

    // TODO: Only keep the last N files in the MRU directory
    // Delete the rest

  }
);


ipcMain.handle(
  'file-system-load-most-recently-used-items',
  async (
    e: any
  ) => {
    console.log('Loading MRU Items', mostRecentlyUsedDirectory);


    const filenames = await fs.readdir(mostRecentlyUsedDirectory);
    console.log("Filenames:", filenames);
    
    const mruItems = filenames
      .map((filename: string) => path.join(mostRecentlyUsedDirectory, filename))
      // TODO: read the files asynchronously
      .map((filepath: string) => fsSync.readFileSync(filepath, 'utf8'))
      .map((json: string) => JSON.parse(json))


    // TODO: Make sure the location exist
    // TODO: Open up the JSON at the location (if possible) and get the Show Name and Title
    return mruItems;

    // if(!episodeLocation) throw new Error('Episode location is undefined or blank.');
    // if(episodeLocation.trim().length === 0) throw new Error('Episode location is blank.');

    // const exists = fsSync.existsSync(episodeLocation);   
    // if(!exists) throw new Error('Episode does not exists.');


    // // TODO: If episodeIdentifier isn't a valid path, BOOM!

    // // Episode Identifier is the path to the file
    // const fullPathToFile = episodeLocation;
    // currentEpisodeLocation = episodeLocation;

    // console.log("Loading file. ", fullPathToFile);

    // const data = await fs.readFile(fullPathToFile, 'utf8');

    // console.log("Data from file: ", data);
    
    // return JSON.parse(data);

  }
);
