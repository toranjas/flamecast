import { createSelector, createFeatureSelector } from '@ngrx/store';
import { Episode } from '../../episode.models';
import { orderableItemDictionaryToArray } from '../../episode.utils';
import { selectParts } from '../../parts/store/parts.selectors';

export const selectSegments = createSelector(
  createFeatureSelector('episode'),
  (state: Episode) => {
    console.log("Select Segments");
    return orderableItemDictionaryToArray(state.segments);
  }
)

export const selectSegmentsWithParts = createSelector(
  selectSegments,
  selectParts,
  (segments, parts ) => {
    return segments
    .map(segment => ({
      ...segment,
      parts: parts.filter(part => part.segmentId === segment.id)
    }))
  }
)