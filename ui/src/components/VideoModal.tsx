import { useEffect, useRef } from 'react'
import type { SortType } from '../types/types'
import undo from '@/assets/png/undo2.png';

type Props = {
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void,
  sortType: SortType,
}

const VideoModal = ({ onClick, sortType }: Props) => {
  const videoRef = useRef<HTMLMapElement>(null);

  useEffect(() => {
    videoRef.current?.focus()
  }, [])

  const getVideo = () => {
    if(sortType === 'Insertion') return 'https://www.youtube.com/embed/JU767SDMDvA';
    else if (sortType === 'Selection') return 'https://www.youtube.com/embed/g-PGLbMth_g';
    else if (sortType === 'Bubble') return 'https://www.youtube.com/embed/xli_FI7CuzA';
  }

  return (
    <aside
      aria-label='Help Video'
      id="videoModal"
      role='region'
      tabIndex={-1}
      ref={videoRef}
    >
      <iframe 
        src={getVideo()}
        title='Video explaining how to do the algorithm'
      ></iframe>
      <div className='row-with-overflow-center'>
        <button 
          className='toolboxButton'
          onClick={onClick}
        >
          Return to Lesson
          <img src={undo} alt=''/>
        </button>
      </div>
      
    </aside>
  )
}
export default VideoModal