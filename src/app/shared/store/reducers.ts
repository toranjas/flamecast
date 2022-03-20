import { mediaControlReducer } from '@app/media-control/store/media-control.reducers';
import { mostRecentlyUsedReducer } from '@app/most-recently-used/store/most-recently-used.reducer';
import { episodeReducer } from '../../episode/store/episode.reducer';

export const reducers = {
  episode: episodeReducer,
  mediaControl: mediaControlReducer,
  mostRecentlyUsed: mostRecentlyUsedReducer,
  // Most Recently Used
  // History (undo/redo)
  // Recent
  // Media Control

  // Settings (as in deliberate configuration that is persisted)
  // - I think settings SHOULD NOT include "bachelor mode" for window position, MRU, etc.
  // - Why? Because we will persist it as a whole document.
  //   Imagine we have 2 flamecast windows open. One window makes a bunch of custom settings.
  //   Another window moves window position and overwrites ALL of those settings.
  //   Unless we're going to have constant file monitoring of settings and hot load them in,
  //   we should separate "Settings" (as in configuration) from "Shit we persist across sessions".

  // Application (batchelor mode stuff across sessions)
  // - The more I think about this, the more I realize that certain aspects NEED to be hot-reloaded
  //   For example, MRU. Two flamecast windows. Window 1 creates new episode and puts in MRU.
  //   Window 2 creates new episode and puts in MRU, but overwrites the MRU that contained Window 1's new episode.
  //   OR... MRU is separate or is persisted outside of a single file somehow.
  // - The StorageProvider could handle this, without the Angular app having to know or care.
  // - Or maybe better yet, MRU is special. It is not part of "Application".
  //   Every time an episode is created or loaded, something gets sent to the storage provider.
  //   "Episode with this identifier was last loaded at this time."
  //   Storage Provider saves a list of up to N files. Purgest the oldest files.
  //   Each episode would need a GUID identifier, which would become the filename.
  // - MRU is easier in a database. Problem is, most "compact" databases are single user.
  //   Couldn't support multiple flamecast windows connected at once.

  // Session (transient, non-persistent information for the runtime of the application. E.g. which episode is loaded in this window, which page is currently used.)

  // Are Application and Session good names?
  // Obviously, I stole them from HTML5 :-D
  // To me, they are serving the same purpose but maybe the names suck for our intended use.
};

// export const reducers2 = {
//   episode: episodeReducer,
//   history: historyReducer,
//   settings: settingsReducer, // <-- Global

//   episodeSettings: episodeSettingsReducer, // <-- Later on, *ngIf="needed"

//   mediaControl: mediaControlReducer,  //<-- Playback and Record

// }

// export const reducers = {
//   episodeInfo: episodeInfoReducer,
//   segments: segmentsReducer,
//   parts: partsReducer
// };
