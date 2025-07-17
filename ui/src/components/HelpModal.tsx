import { useState, useEffect, useRef } from 'react';
import { insertionDirections, generalDirections } from '../data/data';
import type { SortType } from '../types/types';

type Props = {
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void,
  sortType: SortType,
  closeModal: () => void,
  isQuiz: boolean,
}

const HelpModal = ({
  sortType,
  closeModal,
 }: Props) => {

  // Will hold current place of the direction number
  const [directionNum, setDirectionNum] = useState<number>(0);

  const helpModalRef=useRef<HTMLBaseElement>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const lastHighlightedElRef = useRef<any>(null);

  // Array will hold algorithm-specific directions, arrow positions, and button IDs
  const directions = sortType === 'Insertion' ? insertionDirections : generalDirections;

  const removeHighlightFromLastEl = () => {
    if(lastHighlightedElRef.current) {
      lastHighlightedElRef.current.classList.remove('orange-border');
    }
  }

  const closeHelpModal = () => {
    closeModal();
    removeHighlightFromLastEl();
  }

  const directionClickHandler = () => {
    if(directionNum >= directions.length-1) {
      console.log('closing')
      removeHighlightFromLastEl();
      closeModal();
    // else go to next direction by updating directionNum state variable
    } else {
      setDirectionNum((prev: number) => prev + 1)
      document.getElementById('directionText')?.focus();
    }
  }

  useEffect(() => {
    helpModalRef.current?.focus()
  }, [])

  useEffect(() => {
    console.log('here: ', directions[directionNum][3]);
    const elToHighlight = document.getElementsByClassName(directions[directionNum][3])[0];
    console.log('elToHighlight', elToHighlight);
    
    if(elToHighlight ) {
      elToHighlight.classList.add('orange-border')
      lastHighlightedElRef.current = elToHighlight;
    }

    if(directionNum > 0) {
      const elToRemoveHighlight = document.getElementsByClassName(directions[directionNum-1][3])[0];
      if(elToRemoveHighlight && elToRemoveHighlight !== elToHighlight) {
      
        elToRemoveHighlight.classList.remove('orange-border')
      }
    }
  }, [directionNum])

  return (
    <>
      <aside
        aria-label='Directions'
        id="help-modal"
        role='region'
        tabIndex={-1}
        ref={helpModalRef}
      >
        <h2>Directions</h2>
        <button
          aria-label='close directions'
          id='close-help'
          className="closeButton" 
          onClick={closeHelpModal} >
            X
        </button>

        <p className='direction-text' tabIndex={-1}>
          {directionNum > -1 ? directions[directionNum][0] : ''}
          <span className='sr-only'>{directionNum > -1 ? directions[directionNum][2] : ''}</span>
        </p>
        <button
          aria-label={directionNum >= directions.length-1 ? 'This was the last direction. Close directions.' : 'Next direction'}
          onClick={directionClickHandler}
          className="nextButton" 
        >
          {directionNum > -1 ? directions[directionNum][1] : 'Next'}
        </button>
      </aside>
    </>
  )
}
export default HelpModal
