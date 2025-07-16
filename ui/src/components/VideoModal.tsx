import { useEffect } from 'react'
import type { SortType } from '../types/types'

type Props = {
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void,
  sortType: SortType,
}

const VideoModal = ({ onClick, sortType }: Props) => {

  useEffect(() => {
    // TODO - replace with ref
    document.getElementById('videoModal')?.focus();
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
      >
        <button
          aria-label='close video'
          id='closeVideo' 
          className="closeButton" 
          onClick={onClick} 
        >X</button>
        <iframe 
          src={getVideo()}
          title='Video Explaining how to do the algorithm'
        ></iframe> 
      </aside>
  )
}
export default VideoModal