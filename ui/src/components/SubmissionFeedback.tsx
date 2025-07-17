import { useEffect, useRef } from 'react'
import video from '@/assets/png/video1.png';
import incorrectX from '@/assets/png/incorrectX.png';
import correctCheck from '@/assets/png/correctCheck.png';
import FunFact from './FunFact';
import { Link } from 'react-router-dom';
import undo from '@/assets/png/undo2.png';
import type { SortType, ProgramStackItem, UserStackItem } from '../types/types'

type Props = {
  userMoves: UserStackItem[],
  programMoves: ProgramStackItem[],
  array: number[],
  sortType: SortType,
  correct: boolean,
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void,
}

const SubmissionFeedback = ({userMoves, programMoves, array, sortType, correct, onClick}: Props) => {
  const feedbackRef = useRef<HTMLMapElement>(null)
  useEffect(() => {
    feedbackRef.current?.focus()
  }, []) 

  return (
  <div className='feedback-wrapper'>
    <main 
      aria-label='Feedback After Activity Completion'
      id="feedback"
      role='region'
      tabIndex={-1}
      ref={feedbackRef}
    >
        <h1>{sortType} Sort</h1>
        <p className='center'>Sort from left to right, smallest to biggest</p>
        <br />
        <p className="center">
          <span className='sr-only'>Original array was&nbsp;</span>
          [{array.join(', ')}]
        </p>
        <div className='row-with-overflow-center'>
          <div id="movesListLeft" className="movesList">
            <h2>Your Moves</h2>
            <ol>
              {userMoves.map((item, index) => (
                <li key={index}
                  className="movesListItem"
                >
                  {item[0]}ed {item[1]}
                  {item[0]==='Insert' ? ' before ' : ' and '}
                  {item[2]}
                </li>
              ))}
            </ol>
          </div>
          <div id="movesListRight" className="movesList">
            <h2>Program Moves</h2>
            <ol>
              {programMoves.map((item, index) => (
                <li key={index}
                  className="movesListItem"
                >
                  {item[0]} {item[1]} 
                  {item[0]==='Insert' ? ' before ' : ' and '}
                  {item[2]}
                </li>
              ))}
            </ol>
          </div>
        </div>
        {correct ? 
          <div id="correctFeedback">
            <p className="center" id="greatJob">Great job!</p>
            <img src={correctCheck} className="feedbackImg" alt="Green checkmark for answer correct."/>
          </div> :
          
          <div id="incorrectFeedback">
            <img src={incorrectX} className="feedbackImg" alt="Red X mark for incorrect answer."/>
            <button
              aria-label='Watch a video to learn more'
              className='toolboxButton' 
              id='video' 
              onClick={onClick}
            >
            <img src={video} alt=''/>
            Learn more here
            </button>
          </div>
        }
        <div className='row-with-overflow-center'>
          <Link className="link submissionFeedbackReturn" to="/">Return Home</Link>
          <button className='toolboxButton' onClick={() => location.reload()}>
            Try Again
            <img src={undo} alt=''/>
          </button>
        </div>
        
      </main>
      <FunFact />
    </div>
  )
}
export default SubmissionFeedback