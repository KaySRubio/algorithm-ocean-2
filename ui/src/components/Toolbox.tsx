import swap from '@/assets/png/swap1.png';
import undo from '@/assets/png/undo2.png';
import insert from '@/assets/png/insert1.png';
import mark from '@/assets/png/mark1.png';
import video from '@/assets/png/video1.png';
import questionMark from '@/assets/png/q.png';
import checkmark from '@/assets/png/checkmark.png';

type Props = {
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void,
  enableSubmit: boolean,
  sortType: string,
  activeTool: string, // Used to help button that's activeTool have inner shadow
  isQuiz: boolean,
  hidden: boolean,
}

const Toolbox = ({
  onClick,
  enableSubmit,
  sortType,
  activeTool,
  isQuiz,
  hidden,
}: Props) => {
  return (
    <aside 
        aria-label='Toolbox'
        aria-hidden={hidden}
        id="toolbox"
        role='region'
      >
        <h2>Toolbox</h2>
        <div className='row-with-overflow'>
          { sortType === 'Insertion' ? 
            <button
              aria-label='Insert an array element before another array element'
              aria-pressed={activeTool === 'Insert' ? true : false}
              className={`toolboxButton ${activeTool} insert`}
              id='Insert' 
              onClick={onClick}
              tabIndex={hidden ? -1 : 0}
            >
              <img src={insert} alt=''/>
              Insert
              </button> 
            : 
            <button
              aria-label='Swap array elements'
              aria-pressed={activeTool === 'Swap' ? true : false}
              className={`toolboxButton ${activeTool} swap`}
              id='Swap' 
              onClick={onClick}
              tabIndex={hidden ? -1 : 0}
            >
              <img src={swap} alt=''/>
              Swap
            </button> 
          }
          <button 
            aria-label='Mark array elements as sorted'
            aria-pressed={activeTool === 'markSorted' ? true : false}
            className={`toolboxButton ${activeTool} mark-sorted`}
            id='markSorted' 
            onClick={onClick}
            tabIndex={hidden ? -1 : 0}
          >
            <img src={mark} alt=''/>
            Mark Sorted
          </button>
          <button 
            aria-label='Undo your last move'
            className={`toolboxButton undo`}
            id='undo' 
            onClick={onClick}
            tabIndex={hidden ? -1 : 0}
          >
            <img src={undo} alt=''/>
            Undo
          </button>
          <button
            aria-label='Open directions'
            className={`toolboxButton help`}
            id='help' 
            onClick={onClick}
            tabIndex={hidden ? -1 : 0}
          >
            <img src={questionMark} alt=''/>
            Help
          </button>
          { !isQuiz && <button
            aria-label='Open help video'
            className='toolboxButton' 
            id='video' 
            onClick={onClick}
            tabIndex={hidden ? -1 : 0}
          >
            <img src={video} alt=''/>
            Show me a video
          </button> }
          <button
            aria-disabled={!enableSubmit}
            aria-label='Submit your answer when complete'
            className={`toolboxButton ${enableSubmit && 'submit-animation'} submit`}
            disabled={!enableSubmit}
            id='submit'
            onClick={onClick}
            tabIndex={hidden ? -1 : 0}
            >
            <img src={checkmark} alt=''/>
              Submit
          </button>
        </div>
    </aside>
  )
}
export default Toolbox