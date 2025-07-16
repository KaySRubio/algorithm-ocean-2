import type { ProgramStackItem, Operation, UserStackItem } from '../types/types';
import swapc1 from '@/assets/png/swapc6.png'
import markc from '@/assets/png/markc.png'
import insertc from '@/assets/png/insertc4.png'

// get a random number between 10 and 100
export const getRandomNumBetween10and100 = () => {
  let m = Math.floor(Math.random()*100);
  while(m < 10) {
    m = Math.floor(Math.random()*100);
  }
  return m;
}

export const isArraySorted = (arr1: number[]) => {
  let i;
  for(i = 1; i < arr1.length; i++) {
    if(arr1[i] < arr1[i-1]) return false;
  }
  return true;
}

// Initialize an array of 6 elements with random numbers [10-100]
export const initializeArray = (length: number): number[] => {

    const array1 = [];
    
    // get the first random number
    array1[0] = getRandomNumBetween10and100();
    for (let i = 1; i < length; i++ ) {
      let m = getRandomNumBetween10and100();
      // get a different random number if that number was already in the array
      while(array1.includes(m)){
        m = getRandomNumBetween10and100();
      }
      array1[i] = m;
    }
    return array1 
  }

export const isAnswerCorrect = (stack1: UserStackItem[], stack2: ProgramStackItem[]): boolean => {
    if (stack1.length !== stack2.length) return false;
    let i;
    for(i = 0; i < stack1.length; i++) {
      if( stack1[i][0] !== stack2[i][0]) return false;
      if( stack1[i][1] !== stack2[i][1]) return false;
      if( stack2[i][2] !== stack2[i][2]) return false;
    }
    return true;
  }

  /**
   * Method to set the cursor that appears on the activity region depending upon which operation is being used
   * If operation not set, returns a string that will lead the browser to use the default cursor
   * @returns object
   */
  
export const cursor = (operation: Operation) => {
    if (operation === 'Swap') return swapc1;
    else if (operation === 'Insert') return insertc;
    else if (operation === 'markSorted') return markc;
    else return 'N/A';
  }


export const arraysAreEqual = (a: number[], b: number[]): boolean => {
  if (a.length !== b.length) return false;
  for (let i = 0; i < a.length; i++) {
    if (a[i] !== b[i]) return false;
  }
  return true;
};