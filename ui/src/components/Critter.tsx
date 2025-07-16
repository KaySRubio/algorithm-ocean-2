import anem from '@/assets/png/anem.png'
import anemsmile from '@/assets/png/anemsmile.png'
import yellowjelly from '@/assets/png/yellowjelly.png'
import yellowjellysmile from '@/assets/png/yellowjellysmile.png'
import starfish from '@/assets/png/starfish.png'
import starfishsmile from '@/assets/png/starfishsmile.png'
/* Additional characters to bring in if program more lesson
import seahorse from '@/assets/png/seahorse.png';
import seahorsesmile from '@/assets/png/seahorsesmile.png';
import pinkjelly from '@/assets/png/pinkjelly.png';
import pinkjellysmile from '@/assets/png/pinkjellysmile.png';
import squid from '@/assets/png/squid.png';
import squidsmile from '@/assets/png/squidsmile.png';
import hermitcrab from '@/assets/png/hermitcrab.png';
import hermitcrabsmile from '@/assets/png/hermitcrabsmile.png';
import sanddollar from '@/assets/png/sanddollar.png';
import sanddollarsmile from '@/assets/png/sanddollarsmile.png';
import ray from '@/assets/png/ray.png';
import raysmile from '@/assets/png/raysmile.png';
*/
import type { SortType } from '../types/types'

type Props = {
  sortType: SortType,
  answerCorrect: boolean,
  hidden: boolean,
}

const Critter = ({sortType, answerCorrect, hidden}: Props) => {

  let altText;
  let critter;
  /**
   * Method to change what critter displays on page for different sorts, and update it to smile when answer is correct
   * @returns object that contains both a reference to the image and the image-specific alt text
  */
  // const assignCritter = () => {
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
  // }
  
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