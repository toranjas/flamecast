import { Episode } from "../../../app/episode/episode.models";
//import { MostRecentlyUsedItem } from "src/app/most-recently-used/most-recently-used.models";

export default interface StorageProvider {

  //setEpisodeIdentifier: (episodeIdentifier: string) => void;

  createEpisode: (episodeLocation: string) => Promise<Episode | undefined>;

  saveEpisode: (episode: Episode) => Promise<void>;

  loadEpisode: (episodeLocation: string) => Promise<Episode | undefined>;

  // saveMostRecentlyUsedItem: (item: MostRecentlyUsedItem) => Promise<void>;

  // loadMostRecentlyUsedItems: () => Promise<Array<MostRecentlyUsedItem>>;

}
