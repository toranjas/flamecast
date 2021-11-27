import { v4 as uuidv4 } from 'uuid';
import { diff } from 'deep-object-diff';
import {
  Episode,
  EpisodeInfo,
  OrderableItem,
  OrderableItemDictionary,
  OrderableItemPredicate,
} from './episode.models';

// ███████ ███    ███ ██████  ████████ ██    ██
// ██      ████  ████ ██   ██    ██     ██  ██
// █████   ██ ████ ██ ██████     ██      ████
// ██      ██  ██  ██ ██         ██       ██
// ███████ ██      ██ ██         ██       ██

export const emptyEpisodeInfo = (): EpisodeInfo => ({
    showName: '',
    title: '',
    episodeNumber: '',
    releaseDate: undefined,
    description: '',
    author: '',
    category: '',
    copyright: '',
  });

export const emptyEpisode = (): Episode => ({
    id: uuidv4(),
    info: emptyEpisodeInfo(),
    segments: {},
    parts: {},
    slides: {},
    takes: {}
  });

//  █████  ██████  ██████   █████  ██    ██       ██             ██        ██████  ██████       ██
// ██   ██ ██   ██ ██   ██ ██   ██  ██  ██       ██               ██      ██    ██ ██   ██      ██
// ███████ ██████  ██████  ███████   ████       ██   █████ █████   ██     ██    ██ ██████       ██
// ██   ██ ██   ██ ██   ██ ██   ██    ██         ██               ██      ██    ██ ██   ██ ██   ██
// ██   ██ ██   ██ ██   ██ ██   ██    ██          ██             ██        ██████  ██████   █████

const arrayOfIds = <T extends OrderableItem>(items: OrderableItemDictionary<T>) => Object.keys(items);

const arrayOfItems = <T extends OrderableItem>(
  items: OrderableItemDictionary<T>,
  predicate?: OrderableItemPredicate<T>
) => arrayOfIds(items)
    .map((id) => items[id])
    .filter((item) => !predicate || predicate(item));

const arrayOfKeyItemPairs = <T extends OrderableItem>(items: OrderableItemDictionary<T>) => Object.keys(items)
    .map((key) => ({ key, item: items[key] }));

const getArrayOfOrders = <T extends OrderableItem>(
  items: OrderableItemDictionary<T>,
  predicate?: OrderableItemPredicate<T>) => {
  let temp = arrayOfIds(items).map(key => items[key]);
    if(predicate) {
      temp = temp.filter(predicate);
    }
    return temp.map(item => item.order);
};

export const orderableItemDictionaryToArray = <T extends OrderableItem>(
  d: OrderableItemDictionary<T>) => Object
    .keys(d)
    .map(key => d[key])
    .sort(compareOrderableItem);


//  ██████  ██████  ███    ███ ██████   █████  ██████  ███████
// ██      ██    ██ ████  ████ ██   ██ ██   ██ ██   ██ ██
// ██      ██    ██ ██ ████ ██ ██████  ███████ ██████  █████
// ██      ██    ██ ██  ██  ██ ██      ██   ██ ██   ██ ██
//  ██████  ██████  ██      ██ ██      ██   ██ ██   ██ ███████

export const compareOrderableItem = (a: OrderableItem, b: OrderableItem) => {
  if (a.order < b.order) {return -1;}
  if (a.order > b.order) {return 1;}
  return 0;
};

//  ██████  ███████ ████████      ██████  ██████  ██████  ███████ ██████
// ██       ██         ██        ██    ██ ██   ██ ██   ██ ██      ██   ██
// ██   ███ █████      ██        ██    ██ ██████  ██   ██ █████   ██████
// ██    ██ ██         ██        ██    ██ ██   ██ ██   ██ ██      ██   ██
//  ██████  ███████    ██         ██████  ██   ██ ██████  ███████ ██   ██

export const maxOrderableItemOrder = <T extends OrderableItem>(
  items: OrderableItemDictionary<T>,
  predicate?: OrderableItemPredicate<T>
) => {
  if (!items) {return 0;}
  const orders = getArrayOfOrders(items, predicate); //Object.keys(items).map((key) => items[key].order);
  return Math.max(...orders);
};

export const minOrderableItemOrder = <T extends OrderableItem>(
  items: OrderableItemDictionary<T>,
  predicate?: OrderableItemPredicate<T>) => {
  if (!items) {return 0;}
  const orders = getArrayOfOrders(items, predicate); //Object.keys(items).map((key) => items[key].order);
  return Math.min(...orders);
};

export const nextOrderableItemOrder = <T extends OrderableItem>(
  items: OrderableItemDictionary<T>,
  predicate?: OrderableItemPredicate<T>) => maxOrderableItemOrder(items, predicate) + 1;

const itemBefore = <T extends OrderableItem>(
  items: OrderableItemDictionary<T>,
  targetOrder: number,
  predicate?: OrderableItemPredicate<T>) => {
    const itemsBefore = arrayOfItems(items, predicate).filter(item => item.order < targetOrder);
    const orderBefore = Math.max(...itemsBefore.map(item => item.order));
    return itemsBefore.find(item => item.order === orderBefore);
};

const itemAfter = <T extends OrderableItem>(
  items: OrderableItemDictionary<T>,
  targetOrder: number,
  predicate?: OrderableItemPredicate<T>) => {
    const itemsBefore = arrayOfItems(items, predicate).filter(item => item.order > targetOrder);
    const orderBefore = Math.min(...itemsBefore.map(item => item.order));
    return itemsBefore.find(item => item.order === orderBefore);
};

//  █████  ██████  ██████      ██ ██████  ███████ ███    ███  ██████  ██    ██ ███████
// ██   ██ ██   ██ ██   ██    ██  ██   ██ ██      ████  ████ ██    ██ ██    ██ ██
// ███████ ██   ██ ██   ██   ██   ██████  █████   ██ ████ ██ ██    ██ ██    ██ █████
// ██   ██ ██   ██ ██   ██  ██    ██   ██ ██      ██  ██  ██ ██    ██  ██  ██  ██
// ██   ██ ██████  ██████  ██     ██   ██ ███████ ██      ██  ██████    ████   ███████

export const addOrderableItem = <T extends OrderableItem>(
  items: OrderableItemDictionary<T>,
  newItem: T,
  predicate?: OrderableItemPredicate<T>
): OrderableItemDictionary<T> => {

  const newItems = {
    ...openSlotForOrderableItem(items, newItem.order, predicate),
    [newItem.id]: newItem,
  };

  console.log('before defrag', newItems);
  const defrag = defragmentOrderableItems(newItems, predicate);
  console.log('after defrag', defrag);

  return {
    ...items,
    ...defrag
  };

};

// export const removeOrderableItem = <T extends OrderableItem>(
//   items: OrderableItemDictionary<T>,
//   itemIdToRemove: string
// ): OrderableItemDictionary<T> => {
//   let newItems = {
//     ...items,
//   };
//   delete newItems[itemIdToRemove];

//   return defragmentOrderableItems(newItems);
// };

// ███    ███  ██████  ██    ██ ███████
// ████  ████ ██    ██ ██    ██ ██
// ██ ████ ██ ██    ██ ██    ██ █████
// ██  ██  ██ ██    ██  ██  ██  ██
// ██      ██  ██████    ████   ███████

const moveOrderableItemUpOrDown= <T extends OrderableItem>(
  items: OrderableItemDictionary<T>,
  targetId: string,
  findSwapWithItemFn: (x: OrderableItemDictionary<T>, order: number, predicate?: OrderableItemPredicate<T>) => T | undefined,
  predicate?: OrderableItemPredicate<T>
) => {

  if(Object.keys(items).length <= 1) {return items;}

  const target = items[targetId];
  if(!target) {return items;}

  // const minOrder = minOrderableItemOrder(items);
  // if(target.order === minOrder) return items;

  const swapWithItem = findSwapWithItemFn(items, target.order, predicate);
  if(!swapWithItem) {return items;}

  return {
    ...items,
    [targetId]: { ... target, order: swapWithItem.order },
    [swapWithItem.id]: {...swapWithItem, order: target.order}
  };

};

export const moveOrderableItemUp = <T extends OrderableItem>(
  items: OrderableItemDictionary<T>,
  targetId: string,
  predicate?: OrderableItemPredicate<T>
) => moveOrderableItemUpOrDown(items, targetId, itemBefore, predicate);

export const moveOrderableItemDown = <T extends OrderableItem>(
  items: OrderableItemDictionary<T>,
  targetId: string,
  predicate?: OrderableItemPredicate<T>
) => moveOrderableItemUpOrDown(items, targetId, itemAfter, predicate);

//  ██████ ██   ██  █████  ███    ██  ██████  ███████ ███████
// ██      ██   ██ ██   ██ ████   ██ ██       ██      ██
// ██      ███████ ███████ ██ ██  ██ ██   ███ █████   ███████
// ██      ██   ██ ██   ██ ██  ██ ██ ██    ██ ██           ██
//  ██████ ██   ██ ██   ██ ██   ████  ██████  ███████ ███████

export const episodeHasChanges = (before: Episode | undefined, after: Episode | undefined): boolean => {

  if(!before) {
    // No before or after. Nothing changed
    if(!after) {return false;}
    // No before but there is an after. Change.
    return true;
  }
  // There is a before but not after. Change.
  if(!after) {
    return true;
  }

  // Before but there is no after. Change
  if(before && !after) {return true;}

  // Both before and after are defined. So compare them.
  const changes = diff(before, after);
  if(!changes) {return false;}
  return Object.keys(changes).length !== 0;
};

// ██   ██ ███████ ██      ██████  ███████ ██████
// ██   ██ ██      ██      ██   ██ ██      ██   ██
// ███████ █████   ██      ██████  █████   ██████
// ██   ██ ██      ██      ██      ██      ██   ██
// ██   ██ ███████ ███████ ██      ███████ ██   ██

const openSlotForOrderableItem = <T extends OrderableItem>(
  items: OrderableItemDictionary<T>,
  orderToOpen: number,
  predicate?: OrderableItemPredicate<T>
): OrderableItemDictionary<T> => {
  const newItems: { [id: string]: T } = {};
  const keys = Object.keys(items);

  // Reason: need to track different collection by index
  // eslint-disable-next-line @typescript-eslint/prefer-for-of
  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];
    const oldItem = items[key];

    if(predicate && predicate(oldItem) === false) {
      continue;
    }

    const newItem = {
      ...oldItem,
    };

    // Only increment the order if it is >= the slot to open
    // This pushes items down the list
    if (oldItem.order >= orderToOpen) {
      newItem.order = oldItem.order + 1;
    }

    newItems[key] = newItem;
  }

  //console.log("Opening Slot", {before: items, after: newItems});

  return newItems;
};

const defragmentOrderableItems = <T extends OrderableItem>(
  items: OrderableItemDictionary<T>,
  predicate?: OrderableItemPredicate<T>
): OrderableItemDictionary<T> => {

  const newItems: OrderableItemDictionary<T> = {}; //{ [id: string]: T } = {};

  const itemsInOrder = arrayOfKeyItemPairs(items)
    .filter(keyItem => !predicate || predicate( keyItem.item))
    .sort((a, b) => compareOrderableItem(a.item, b.item));

  for (let i = 0; i < itemsInOrder.length; i++) {
    const item = itemsInOrder[i];
    newItems[item.key] = {
      ...item.item,
      order: i + 1,
    };
  }

  return newItems;
};
