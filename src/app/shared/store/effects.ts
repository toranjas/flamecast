import { MediaControlEffects } from '@app/media-control/store/media-control.effects';
import { MostRecentlyUsedEffects } from '@app/most-recently-used/store/most-recently-used.effects';
import { EpisodeEffects } from '../../episode/store/episode.effects';

export const effects: Array<any> = [
  EpisodeEffects,
  MediaControlEffects,
  MostRecentlyUsedEffects,
];
