//  ██████  ██████  ███    ███ ██████   █████  ██████  ███████
// ██      ██    ██ ████  ████ ██   ██ ██   ██ ██   ██ ██
// ██      ██    ██ ██ ████ ██ ██████  ███████ ██████  █████
// ██      ██    ██ ██  ██  ██ ██      ██   ██ ██   ██ ██
//  ██████  ██████  ██      ██ ██      ██   ██ ██   ██ ███████

import { MostRecentlyUsedItem } from './most-recently-used.models';

export const compareMostRecentlyUsedItem = (a: MostRecentlyUsedItem, b: MostRecentlyUsedItem) => {
  try {
    if (a.lastLoaded < b.lastLoaded) return -1;
    if (a.lastLoaded > b.lastLoaded) return 1;
    return 0;
  } catch (error) {
    console.log('Error comparing: ', error);
    throw error;
  }
};
