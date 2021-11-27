import { v4 as uuidv4 } from 'uuid';
import {
  Episode,
  Part,
  OrderableItemPredicate,
} from '@app/episode/episode.models';
import {
  addOrderableItem,
  moveOrderableItemDown,
  moveOrderableItemUp,
  nextOrderableItemOrder,
} from '@app/episode/episode.utils';

export const changePartProperties = (
  state: Episode,
  { partId, changes }: { partId: string; changes: Partial<Part> }
): Episode => ({
    ...state,
    parts: {
      ...state.parts,
      [partId]: {...state.parts[partId], ...changes}
    }
  });


export const createPart = (
  state: Episode,
  {
    name,
    segmentId,
    order,
  }: { name: string; segmentId: string; order?: number }
): Episode => {
  const predicate: OrderableItemPredicate<Part> = (item) =>
    item.segmentId === segmentId;

  const newItem: Part = {
    id: uuidv4(),
    segmentId,
    name,
    order: order ?? nextOrderableItemOrder(state.parts, predicate),
  };
  return {
    ...state,
    parts: addOrderableItem(state.parts, newItem, predicate),
  };
};

export const movePartUp = (
  state: Episode,
  { partId }: { partId: string }
): Episode => ({
    ...state,
    parts: { ...moveOrderableItemUp(state.parts, partId, (item) => item.segmentId === state.parts[partId].segmentId) },
  });

export const movePartDown = (
  state: Episode,
  { partId }: { partId: string }
): Episode => ({
    ...state,
    parts: { ...moveOrderableItemDown(state.parts, partId, (item) => item.segmentId === state.parts[partId].segmentId) },
  });

export const deletePart = (
  state: Episode,
  { partId }: { partId: string }
): Episode => {
  const parts = {...state.parts};
  delete parts[partId];

  return {
    ...state,
    parts
  };
};
