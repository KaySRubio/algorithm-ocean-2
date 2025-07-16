// Sample component simplifying the problem where canvasjs click handlers don't see updated state
/*
import { useState, useEffect, useRef } from 'react'
import { Stage } from '@createjs/easeljs'
import { makeTextSquare } from '../utils/canvasUtils'

const Lesson2 = () => {
  const [userSP, setUserSP] = useState<number>(0);
  const stage = useRef<any>({});
  const textSquares = useRef<any>([])

  // NEW WORKAROUND
  const userSPRef = useRef(userSP);

  useEffect(() => {
    const array = [1,2,3,4,5];
    initializeCreateJsCanvas(array);
  }, [])

  useEffect(()=> {
    // shows userSP being updated as expected
    console.log('userSP updated: ', userSP);

    // NEW WORKAROUND
    userSPRef.current = userSP;
  }, [userSP])



  const handleCanvasSquareClick = (event) => {
    // ERROR: shows userSP as 0, even after it's been updated
    console.log('a square was clicked and theres this userSP: ', userSP);
    
    // WORKS
    console.log('a square was clicked and theres this userSPRef.current: ', userSPRef.current);
  }

  // Initialize the createJS canvas
  const initializeCreateJsCanvas = (array: number[]) => {
    let x = 10;
    const y = 10;
    stage.current = new Stage('demoCanvas');
  
    for (let i = 0; i < array.length; i++ ) {
      textSquares.current[i] = makeTextSquare(x, y, array[i], 'Swap', handleCanvasSquareClick, () => {});
        stage.current.addChild(textSquares.current[i]);
        x += 50;
    }
  
    stage.current.update(); 
  }

  return (
    <div className="lesson">
      <canvas 
        id="demoCanvas" 
        width={52.5*7} 
        height="135px">
      </canvas>
      <button onClick={() => setUserSP(prev => prev + 1)}>Update state</button>
    </div>
  )

}
export default Lesson2
*/