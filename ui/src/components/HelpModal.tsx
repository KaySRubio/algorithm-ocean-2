import { useState, useEffect, useRef } from 'react';
import { insertionDirections, generalDirections } from '../data/data';
import type { SortType } from '../types/types';
import arrow from '@/assets/png/arrow.png';

type Props = {
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void,
  sortType: SortType,
  closeModal: () => void,
  isQuiz: boolean,
}

const HelpModal = ({
  onClick,
  sortType,
  closeModal,
 }: Props) => {

  // Will hold current place of the direction number
  const [directionNum, setDirectionNum] = useState<number>(0);

  const helpModalRef=useRef<HTMLBaseElement>(null);

  // Array will hold algorithm-specific directions, arrow positions, and button IDs
  const directions = sortType === 'Insertion' ? insertionDirections : generalDirections;

  const directionClickHandler = () => {
    if(directionNum >= directions.length-1) {
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

  return (
    <>
      <aside
        aria-label='Directions'
        id="helpModal"
        role='region'
        tabIndex={-1}
        ref={helpModalRef}
      >
        <h2>Directions</h2>
        <button
          aria-label='close directions'
          id='closeHelp' 
          className="closeButton" 
          onClick={onClick} >
            X
        </button>

        <p id='directionText' tabIndex={-1}>
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
      <img
        alt=''
        className='helpArrow' 
        src={arrow}
        style={{
          top: directionNum > -1 ? directions[directionNum][3] : '500px',
          left: directionNum > -1 ? directions[directionNum][4] : '335px', 
          animation: directionNum > -1 ? directions[directionNum][5] : 'growRotate270 1s ease-in-out infinite'
        }}
        />
    </>
  )
}
export default HelpModal