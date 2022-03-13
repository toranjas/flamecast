import { MediaControlDeviceEffects } from '@app/media-control/store/media-control.devices.effects';
import { EpisodeEffects } from '../../episode/store/episode.effects';


export const effects: Array<any> = [
  EpisodeEffects, 
  MediaControlDeviceEffects
];
