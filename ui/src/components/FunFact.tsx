import { useEffect, useState } from 'react';
import magnifying_glass from '@/assets/png/magnifying_glass.png';
import lightbulb from '@/assets/png/lightbulb.png';
import { facts } from '../data/data';


const FunFact = () => {

  const [factNum, setFactNum] = useState<number>(0)

  useEffect(() => {
    setFactNum(pickRandomFact());
  }, [])

  // TODO - replace with ref
  const flipAnimation = () => {
    document.getElementById('funFact')?.classList.toggle('is-flipped');
  }

  const pickRandomFact = () => {
    let m = Math.floor(Math.random()*100);
    while(m > facts.length-1) {
      m = Math.floor(Math.random()*100);
    }
    return m;
  }

  // TODO - remove dangerouslySetInnerHTML --> fix
  return (
    <div className="scene scene--card">
        <div aria-label='Fact about algorithms and ocean science' className="card" id='funFact' onClick={flipAnimation}>
          <div className="card__face card__face--front">
            <img alt='' id='factMagnifyingGlass' src={magnifying_glass} />
            <h2 className='card_text'>Did you know...</h2>
            <br />
            <p>
              <span className='card_text' dangerouslySetInnerHTML={{ __html: facts[factNum][0]}}></span>
              <br /><br />
              <span className='smallText card_text'>(Click to find out)</span>
            </p>
          </div>
          <div className="card__face card__face--back"> 
            <img alt='' id='factMagnifyingGlass' src={lightbulb} />
            <h2 className='card_text'>The more you learn!</h2>
            <br />
            <p className='card_text' dangerouslySetInnerHTML={{ __html: facts[factNum][1]}}></p>
          </div>
        </div>
      </div>
  )
}
export default FunFact
