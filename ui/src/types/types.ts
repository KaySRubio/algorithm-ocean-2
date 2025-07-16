
export type SortType = 'Insertion' | 'Bubble' | 'Selection';

export type Operation = 'Insert' | 'Swap' | 'Split' | 'Merge' | 'None' | 'markSorted'

export type ProgramStackItem = [Operation, number, number];

export type UserStackItem = [
  ...ProgramStackItem, number[],
  createjs.Container,
  (createjs.Container | createjs.Container[])
];