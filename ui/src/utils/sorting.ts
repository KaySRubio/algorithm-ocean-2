import type { ProgramStackItem, SortType } from '../types/types';


export const performBubbleSort = (array: number[]): ProgramStackItem[] => {
  // const array = [6, 5, 4, 3, 2, 1];
  const programStack: ProgramStackItem[] = [];

  for (let i = 0; i < array.length; i++) {
    for (let j = 0; j < array.length - i - 1; j++) {
      if (array[j] > array[j + 1]) {
        // Push the correct values that are being swapped
        programStack.push(['Swap', array[j], array[j + 1]]);

        // Swap them
        [array[j], array[j + 1]] = [array[j + 1], array[j]];
      }
    }
  }

  return programStack;
};

export const performInsertionSort = (array: number[]): ProgramStackItem[] => {
    // Operation is Insert operand1 right before operand2
    // When examining a number, if that number causes other numbers to shift right that number becomes operand1
    // When if numbers shifted right, the first one that shifted right becomes operand2
    let operand1: number = 0;
    let operand2: number = 0;
    const programStack: ProgramStackItem[] = [];

    for (let i = 1; i < array.length; i++) {

      // Choosing the first element in our unsorted subarray
      const current = array[i];
      // The last element of our sorted subarray
      let j = i-1; 

      while ((j > -1) && (current < array[j])) {
        operand1 = current; // store operands
        operand2 = array[j]; 
        array[j+1] = array[j]; // move this item to the right
        j--; // check the item next
      }
      
      // check if anything was moved
      if ( array[j+1] !== current ) {
        array[j+1] = current; // store current item in the new spot
        programStack.push(['Insert', operand1, operand2]);
      }
    }
    return programStack
  }

export const performSelectionSort = (array: number[]): ProgramStackItem[] => {
    const programStack: ProgramStackItem[] = [];
    for(let i = 0; i < array.length; i++) {
      let min = i;
      for(let j = i+1; j < array.length; j++){
        if(array[j] < array[min]) {
            min=j; 
        }
      }
      if (min !== i) {
        // push the swap operation to the stack, then perform it
        programStack.push(['Swap', array[i], array[min]]);
        [array[i], array[min]] = [array[min], array[i]]
      }
    }
    return programStack
  }

// sort array then re-call initializeArray if the list is too close to sorted
export const sort = (type: SortType, array: number[]): ProgramStackItem[] => {
  let programStack1: ProgramStackItem[] = [];
    switch(type) {
      case 'Bubble': {
        const programStack = performBubbleSort(array);
        programStack1 = programStack;
        break;
      }
      case 'Insertion': {
        const programStack = performInsertionSort(array);
        programStack1 = programStack;
        break;
      }
      case 'Selection': {
        const programStack = performSelectionSort(array);
        programStack1 = programStack;
        break;
      }
      default:
        console.warn('Program requested that a different type of array be sorted that is not available.');
        break;
    }
  return programStack1
}