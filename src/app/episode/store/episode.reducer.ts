import { createReducer, on } from '@ngrx/store';
import * as EpisodeActions from './episode.actions';
import * as EpisodeFunctions from './episode.reducer-functions';
import * as InfoActions from '../info/store/info.actions';
import * as InfoFunctions from '../info/store/info.reducer-functions';
import * as SegmentActions from '../segments/store/segments.actions';
import * as SegmentFunctions from '../segments/store/segments.reducer-functions';
import * as PartActions from '../parts/store/parts.actions';
import * as PartFunctions from '../parts/store/parts.reducer-functions';
import { Episode } from '../episode.models';
import { emptyEpisode } from '../episode.utils';

const initialState: Episode = emptyEpisode();

export const episodeReducer = createReducer(
  initialState,

  //#region Episode

  on(EpisodeActions.loadEpisodeSuccessAction, EpisodeFunctions.loadEpisodeSuccess),

  //#endregion

  //#region Info

  on(InfoActions.changeInfoPropertiesAction, InfoFunctions.setInfoProperties),

  // #endregion

  //#region Segments

  on(SegmentActions.changeSegmentPropertiesAction, SegmentFunctions.changeSegmentProperties),
  on(SegmentActions.createSegmentAction, SegmentFunctions.createSegment),
  on(SegmentActions.moveSegmentUpAction, SegmentFunctions.moveSegmentUp),
  on(SegmentActions.moveSegmentDownAction, SegmentFunctions.moveSegmentDown),
  on(SegmentActions.deleteSegmentAction, SegmentFunctions.deleteSegment),
  //#endregion

  //#region Parts

  on(PartActions.changePartPropertiesAction, PartFunctions.changePartProperties),
  on(PartActions.createPartAction, PartFunctions.createPart),
  on(PartActions.movePartUpAction, PartFunctions.movePartUp),
  on(PartActions.movePartDownAction, PartFunctions.movePartDown),
  on(PartActions.deletePartAction, PartFunctions.deletePart),

  //#endregion

  //#region Slides

  //#endregion

  //#region Takes

  //#endregion
);
