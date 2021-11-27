import { v4 as uuidv4 } from 'uuid';
import { Episode, Segment } from '@app/episode/episode.models';
import {
  addOrderableItem,
  moveOrderableItemDown,
  moveOrderableItemUp,
  nextOrderableItemOrder,
} from '@app/episode/episode.utils';

export const changeSegmentProperties = (
  state: Episode,
  { segmentId, changes }: { segmentId: string; changes: Partial<Segment> }
): Episode => ({
    ...state,
    segments: {
      ...state.segments,
      [segmentId]: {
        ...state.segments[segmentId],
        ...changes,
      }
    }
  });

export const createSegment = (
  state: Episode,
  { name, order }: { name: string; order?: number }
): Episode => {
  const newSegment: Segment = {
    id: uuidv4(),
    name,
    order: order ?? nextOrderableItemOrder(state.segments)
  };
  return {
    ...state,
    segments: addOrderableItem(state.segments, newSegment)
  };
};

export const moveSegmentUp = (
  state: Episode,
  { segmentId }: { segmentId: string }
): Episode => ({
    ...state,
    segments: {...moveOrderableItemUp(state.segments, segmentId)}
  });

export const moveSegmentDown = (
  state: Episode,
  { segmentId }: { segmentId: string }
): Episode => ({
    ...state,
    segments: {...moveOrderableItemDown(state.segments, segmentId)}
  });

export const deleteSegment = (
  state: Episode,
  { segmentId }: { segmentId: string }
): Episode => {
  const segments = {...state.segments};
  delete segments[segmentId];

  return {
    ...state,
    segments
  };
};
