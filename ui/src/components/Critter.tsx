import anem from '@/assets/png/anem.png'
import anemsmile from '@/assets/png/anemsmile.png'
import yellowjelly from '@/assets/png/yellowjelly.png'
import yellowjellysmile from '@/assets/png/yellowjellysmile.png'
import starfish from '@/assets/png/starfish.png'
import starfishsmile from '@/assets/png/starfishsmile.png'
import type { SortType } from '../types/types'

type Props = {
  sortType: SortType,
  answerCorrect: boolean,
  hidden: boolean,
}

const Critter = ({sortType, answerCorrect, hidden}: Props) => {
  let altText;
  let critter;
  if (sortType === 'Bubble') {
    if (answerCorrect) {
      critter = anemsmile;
      altText = 'An anemone with green body and pink tentacles that is smiling';
    }
    else {
      critter = anem;
      altText = 'An anemone with green body and pink tentacles';
    }
  }
  else if (sortType === 'Insertion') {
    if (answerCorrect) {
      critter = yellowjellysmile;
      altText = 'A yellow jellyfish that is smiling';
    }
    else {
      critter = yellowjelly;
      altText = 'A yellow jellyfish';
    }
  }
  else {
    if (answerCorrect) {
      critter = starfishsmile;
      altText = 'A red starfish that is smiling';
    }
    else {
      critter = starfish;
      altText = 'A red starfish';
    }
  }
  
  return (
   <img 
    alt={altText}
    aria-hidden={hidden}
    className='critter'
    src={critter} 
  />
  )
}
export default Critter