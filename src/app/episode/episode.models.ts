export interface OrderableItem {
  id: string;
  order: number;
}

export interface OrderableItemDictionary<T extends OrderableItem> {
  [id: string]: T;
}

export type OrderableItemPredicate<T extends OrderableItem> = (
  item: T,
) => boolean;

export interface Episode {
  id: string;
  info: EpisodeInfo;
  segments: SegmentDictionary;
  parts: PartDictionary;
  slides: SlideDictionary;
  takes: TakeDictionary;
}

export interface EpisodeInfo {
  showName?: string;
  title?: string;
  episodeNumber?: string;
  releaseDate?: Date;
  description?: string;
  author?: string;
  category?: string;
  copyright?: string;
}

export interface Segment extends OrderableItem {
  name: string;
}

export type SegmentDictionary = OrderableItemDictionary<Segment>;

export interface Part extends OrderableItem {
  segmentId: string;
  name: string;
}

export type PartDictionary = OrderableItemDictionary<Part>;

export interface Slide extends OrderableItem {
  partId: string;
  name: string;
}

export type SlideDictionary = OrderableItemDictionary<Slide>;

export interface Take extends OrderableItem {
  partId: string;
  name: string;
}

export type TakeDictionary = OrderableItemDictionary<Take>;
