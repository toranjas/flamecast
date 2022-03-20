export interface MostRecentlyUsedItem {
  episodeId: string;
  episodeLocation: string;
  lastLoaded: Date;

  // Information about each show could be redundantly included here.
  // For example, show-name, title, etc.
  // However,that risks things getting out of sync.
  // And, what? Do we update the MRU every single time episode info changes??
  // It might be better to quickly load each of the JSON files to extract the info we want.
  // Plus, if an episode file was missing, we could show it in Red in the UI.
}
