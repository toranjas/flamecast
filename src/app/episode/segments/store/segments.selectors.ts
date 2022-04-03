import { createSelector, createFeatureSelector } from '@ngrx/store';
import { Episode } from '@app/episode/episode.models';
import { orderableItemDictionaryToArray } from '@app/episode/episode.utils';
import { selectParts } from '@app/episode/parts/store/parts.selectors';
import { EPISODE_STORE } from '@app/episode/episode.consts';

export const selectSegments = createSelector(
  createFeatureSelector(EPISODE_STORE),
  (state: Episode) => {
    console.log('Select Segments');
    return orderableItemDictionaryToArray(state.segments);
  },
);

export const selectSegmentsWithParts = createSelector(
  selectSegments,
  selectParts,
  (segments, parts) =>
    segments.map((segment) => ({
      ...segment,
      parts: parts.filter((part) => part.segmentId === segment.id),
    })),
);
