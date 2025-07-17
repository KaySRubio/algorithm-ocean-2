import { useState, useEffect, useRef } from 'react'
import { useAppContext } from '../context/useAppContext'
import { Stage, Ticker } from '@createjs/easeljs'
import { Tween, Ease } from "@createjs/tweenjs"
import Toolbox from './Toolbox'
import HelpModal from './HelpModal'
import VideoModal from './VideoModal'
import Critter from './Critter'
import SubmissionFeedback from './SubmissionFeedback'
import { isArraySorted, initializeArray, isAnswerCorrect, cursor } from '../utils/generalUtils';
import { makeTextSquare, visualSwap, visualInsert, visualUndoInsert } from '../utils/canvasUtils'
import { sort } from '../utils/sorting';
import type { SortType, Operation, UserStackItem, ProgramStackItem } from '../types/types'
import { darkblue, lightblue, medblue, transparent } from '../data/data';

type Props = {
  sortType: SortType;
}

const Lesson = ({ sortType }: Props) => {
  const { setLiveMessage } = useAppContext();
  const defaultOperation: Operation = sortType === 'Insertion' ? 'Insert' : 'Swap';
  const length = useRef(sortType === 'Insertion' ? 7 : 6);
  const canvasWidth = length.current * 52.5;

  /* --- variables for arrays --- */
  const [unsortedArray, setUnsortedArray] = useState<number[]>([])
  const array = useRef<number[]>([]);
  const userArrayRef = useRef<number[]>([]);
  
  /* -- other helper variables -- */
  const [operation, setOperation] = useState<Operation>(defaultOperation)
  // keeps track of how many clicks user has made with the swap operation
  const swapClicks = useRef<number>(0);
  const maxNumberOfOperations = 18;
  // temporary holding place for the first and second number being used in the operation
  const operandContainers = useRef<createjs.Container[] | null[]>([])
  // CreateJS stage
  const stage = useRef<createjs.Stage | null>(null);
  // Array to hold CreateJS text squares which will be accessed in various places
  const textSquares = useRef<createjs.Container[]>([])
  const shiftToRight = useRef<createjs.Container[]>([]);
  const activityRef = useRef<HTMLDivElement>(null);

  const [userStack, setUserStack] = useState<UserStackItem[]>([])
  const [programStack, setProgramStack] = useState<ProgramStackItem[]>([]); // Stack will hold all moves of program, including operation and both numbers swapped
  const [submitEnabled, setSubmitEnabled] = useState<boolean>(false)
  const [answerSubmitted, setAnswerSubmitted] = useState<boolean>(false)
  const [hint, setHint] = useState<string>('')
  const [answerCorrect, setAnswerCorrect] = useState<boolean>(false)
  const [showVideoModal, setShowVideoModal] = useState<boolean>(false)
  const [showHelpModal, setShowHelpModal] = useState<boolean>(false)
  
  // Parallel refs to help canvasJs which doesn't access updated state
  const userStackRef = useRef<UserStackItem[]>([]);
  const operationRef = useRef<Operation>(defaultOperation);

  useEffect(() => {
    if(userArrayRef.current.length === 0) {
      let initialUnsortedArray1 = initializeArray(length.current);
      let copyOfInitialUnsortedArray = [...initialUnsortedArray1]
      let programStack1: ProgramStackItem[] = [];

      const programStack = sort(sortType, copyOfInitialUnsortedArray);
      programStack1 = programStack;

      while(programStack1.length < 4) {
        initialUnsortedArray1 = initializeArray(length.current);
        copyOfInitialUnsortedArray = [...initialUnsortedArray1];
        const programStack = sort(sortType, copyOfInitialUnsortedArray);
        programStack1 = programStack;

      }
      // copy final array into userCopy and programCopy that will be modified with operations
      setUnsortedArray([...initialUnsortedArray1]);
      userArrayRef.current = [...initialUnsortedArray1];
      array.current = [...initialUnsortedArray1];

      setProgramStack(programStack1);
    }
  }, [])

  // Initialize the createJS canvas
  const initializeCreateJsCanvas = (array1: number[]) => {
    let x = 10;
    const y = 10;
    stage.current = new Stage('demoCanvas');

    for (let i = 0; i < array1.length; i++ ) {
      textSquares.current[i] = makeTextSquare(x, y, array1[i], operation, handleCanvasSquareClick, handleCanvasTriangleClick);
        // textSquares[i] = makeTextSquare(x, y, array1[i]);
        if(stage.current) stage.current.addChild(textSquares.current[i]);
        x += 50;
    }

    if(stage.current) stage.current.update(); 
  }

  useEffect(() => {
    if(unsortedArray.length > 0) {
      initializeCreateJsCanvas(unsortedArray);
    }
  }, [unsortedArray])

  useEffect(() => {
  }, [programStack])

  useEffect(() => {
    userStackRef.current = userStack;
    shiftToRight.current = []
  }, [userStack])

  useEffect(() => {
    operationRef.current = operation;
  }, [operation])
  
  const handleCanvasSquareClick = (event: createjs.MouseEvent) => {
    // don't allow more moves if they've hit 20
    if(userStackRef.current.length >= maxNumberOfOperations ) {
      setHint('You should not need more than 18 operations. Please submit answer or undo some moves to continue.')
      setLiveMessage('You should not need more than 18 operations. Please submit answer or undo some moves to continue.')
      if (operandContainers.current[0]) operandContainers.current[0].y=0;
      if (operandContainers.current[1]) operandContainers.current[1].y=0;
      if(stage.current) stage.current.update();
    } else if (operationRef.current === 'Swap') {
      // increment swapClicks since the user clicked on a canvas element
      swapClicks.current++;

      // Store the clicked number and the element location
      operandContainers.current[swapClicks.current-1] = event.target.parent;
      
      // first canvasClick just move the element down a little
      const container = operandContainers.current[swapClicks.current - 1];
      if (container) {
        container.y += 10;
      }
      if(stage.current) stage.current.update();

      if (swapClicks.current===2) { // second canvasClick run operation if clicked on 2 different elements
        swapClicks.current = 0; // reset swapClicks to 0
        // if the clicked on the same element twice move it back to where it was
        if (operandContainers.current[0] === operandContainers.current[1]) {

          if(operandContainers.current[0]) operandContainers.current[0].y=0;
          if(stage.current) stage.current.update();

        } else if (
          userStackRef.current.length > 0
          && ((
            operandContainers.current[0] === userStackRef.current[userStackRef.current.length-1][4]
            && operandContainers.current[1] === userStackRef.current[userStackRef.current.length-1][5]
          ) || (
            operandContainers.current[1] === userStackRef.current[userStackRef.current.length-1][4]
            && operandContainers.current[0] === userStackRef.current[userStackRef.current.length-1][5]
          )) 
        ) {
        undoLastMove()
        // process two unique clicks 
        } else {
            if(operandContainers.current[1]) operandContainers.current[1].y+=10;
            if(stage.current) stage.current.update();
            runOperation();
        }
      }
    } else if (operationRef.current === 'Insert') {

      // if the user already clicked on another square, move the previous square back to it's original place
      if (operandContainers.current[0]) {
        operandContainers.current[0].y=0;
        // @ts-expect-error ignore canvas errors
        operandContainers.current[0].children[2].fillCommand.style = darkblue; // make triangle appear again
        // @ts-expect-error ignore canvas errors
        operandContainers.current[0].children[2].borderCommand.style = lightblue;
        if(stage.current)stage.current.update();
      }
      // if user clicked on same square twice move it back to it's original place then clear it out 
      if (operandContainers.current[0] === event.target.parent) {
        if(operandContainers.current[0]) operandContainers.current[0].y=0;
        // @ts-expect-error ignore canvas errors
        operandContainers.current[0].children[2].fillCommand.style = darkblue; // make triangle appear again
        // @ts-expect-error ignore canvas errors
        operandContainers.current[0].children[2].borderCommand.style = lightblue;
        operandContainers.current[0] = null;
        if(stage.current)stage.current.update();
      }
      else {
        // Store the currently clicked square as the first operand. Second operand must be an insert triangle symbol
        operandContainers.current[0] = event.target.parent;
        if(stage.current) stage.current.update();
        // hide the triangle and tween the box down
        // @ts-expect-error ignore canvas errors
        operandContainers.current[0].children[2].fillCommand.style = transparent; // hide triangle when element moves down
        // @ts-expect-error ignore canvas errors
        operandContainers.current[0].children[2].borderCommand.style = transparent;
        Tween.get(operandContainers.current[0])
        .to({ y: 60}, 250, Ease.getPowIn(4));
        Ticker.addEventListener("tick", stage.current); // doto - need to remove ticker at some point?
      }
    } else if (operationRef.current === 'markSorted') {
      if(event.target.squareFill.style === darkblue) {
        event.target.squareFill.style = medblue;
      } else {
        event.target.squareFill.style=darkblue;
      }
      if(stage.current) stage.current.update();

    } else {
      setHint('Please select a tool from the toolbox')
      setLiveMessage('Please select a tool from the toolbox')
    }
  }

  const handleCanvasTriangleClick = (event: createjs.MouseEvent) => {
    // if user has clicked on a square already, store the second operand (the triangle's parent) and run operation
    if (operandContainers.current[0]) {
      
      // Find the indices of these operands in the users's working copy of the array
      // @ts-expect-error ignore canvas errors
      const opAIndex = userArrayRef.current.findIndex(e => e === operandContainers.current[0]?.children[1].text)
      const opBIndex = userArrayRef.current.findIndex(e => e === event.target.parent.children[1].text)

      // if user tried to move square in the wrong direction (to the right) don't run operation  
      if (opAIndex < opBIndex ) { 
        setHint('Hint: You can only move squares to the left')
        setLiveMessage('Hint: You can only move squares to the left.')
      } else {
        operandContainers.current[1] = event.target.parent;
        runOperation();
      }
    } else { 
      setHint('Please first click on a square with a number to insert into this location')
      setLiveMessage('Please first click on a square with a number to insert into this location.')
    }
  }

  const runOperation = () => {
    switch (operationRef.current) {
      case 'Swap':
        swap();
        break;
      case 'Insert':
        insert();
        break;
      default:
        break;
    }
    // show submit button when the userArray is sorted 
    if ( isArraySorted(userArrayRef.current) ) {
      showSubmitButton();
    }
  }

  const swap = () => {
    // Store the larger number in containerA and smaller number in containerB
    let containerA, containerB; 
    // @ts-expect-error ignore canvas errors
    if(operandContainers.current[0]?.children[1].text > operandContainers.current[1]?.children[1].text) {
      containerA = operandContainers.current[0];
      containerB = operandContainers.current[1];
    } else {
      containerA = operandContainers.current[1];
      containerB = operandContainers.current[0];
    }

    // get the actual numbers inside
    // @ts-expect-error ignore canvas errors
    const numA = containerA?.children[1].text;
    // @ts-expect-error ignore canvas errors
    const numB = containerB?.children[1].text;

    // Swap the operands in the users copy of the array; get numeric operand's indices
    const indexA = userArrayRef.current.indexOf(numA);
    const indexB = userArrayRef.current.indexOf(numB);
    // swap
    [userArrayRef.current[indexA], userArrayRef.current[indexB]] = [userArrayRef.current[indexB], userArrayRef.current[indexA]]
    
    // Copy userArray into a static temporary version to write to stack
    const auditTrail = [...userArrayRef.current];

    // Add 5 objects to the stack of user moves including 1) operation, 2-3) numeric operands in order from larger to smaller, 4) resulting array, 5-6) operand containers for visual swap
    setUserStack(prevStack => [
      ...prevStack,
      [operationRef.current, numA, numB, auditTrail, containerA, containerB] as UserStackItem
    ])
    visualSwap(containerA as createjs.Container, containerB as createjs.Container, stage.current as createjs.Stage);
  }

  const insert = () => {
    // retrieve the containers holding the number to be inserted, and the number where it will be inserted
    const containerA = operandContainers.current[0];
    const containerB = operandContainers.current[1];

    // get the numbers for these operands
    // @ts-expect-error ignore canvas errors
    const numA = containerA?.children[1].text;
    // @ts-expect-error ignore canvas errors
    const numB = containerB?.children[1].text;

    // get the indices of both operands for calculations below
    const indexA = userArrayRef.current.indexOf(numA);
    const indexB = userArrayRef.current.indexOf(numB);
    // let shiftToRight = []; // keep track of all numbers pushed to the right

    let j = indexA-1;

    // Update the user's array
    // Push all numbers in between the operands to the right
    while (j >= indexB) {
      // find the corresonding container for this element that will be shifted to the right
      // @ts-expect-error ignore canvas errors
      const container = textSquares.current.find(ele => ele.children[1].text === userArrayRef.current[j]);
      // Put it an array that will be used in the visual insert operation
      //shiftToRight.push(container);
      if(container) shiftToRight.current.push(container);
      userArrayRef.current[j+1] = userArrayRef.current[j]; // move this item to the right
      j--; // check the item next
    }
    userArrayRef.current[j+1] = numA; // store operand1 in the new spot

    // Copy userArray into a static temporary version to write to stack
    const auditTrail = [...userArrayRef.current];

    // Add 5 objects to the stack of user moves including 1) operation, 2-3) numeric operands in order from larger to smaller, 4) resulting array, 5-6) operand containers for visual swap
    setUserStack(prevStack => [
      ...prevStack,
      // [operation, numA, numB, auditTrail, containerA, shiftToRight]
      [operationRef.current, numA, numB, auditTrail, containerA, shiftToRight.current] as UserStackItem
    ])
    // Clear out the this.operandContainers array so that the user will need to start over clicking on a square then a triangle
    operandContainers.current = [];

    // visualInsert(containerA, shiftToRight, stage.current, textSquares.current);
  visualInsert(containerA as createjs.Container, shiftToRight.current, stage.current as createjs.Stage, textSquares.current); 
    // after the visualInsert, clear the shiftToRight array
    // shiftToRight = [];
  }

  const showSubmitButton = () => {
    setSubmitEnabled(true)
    setLiveMessage('Submit button is now active in the Toolbox region. When you are done with the algorithm, please navigate to the Toolbox region and click on the submit button.')
  }

  // Click event on the button in the help Modal that normally goes to next, but when directions are over can close modal
  const closeModal = () => {
    setShowHelpModal(false)
    activityRef.current?.focus();
  }

  // Submit event
  const handleSubmit = () => {
    // set state of answerSubmitted to true to re-render DOM and show submissionFeedback
    setOperation('None')
    setAnswerSubmitted(true)
    setAnswerCorrect(isAnswerCorrect(userStack, programStack))

    if(answerCorrect) {
      setLiveMessage('Great job! Your answer was correct.')
    } else {
      setLiveMessage('Your answer was not correct. Please try again.')
    }
  }

  const undoLastMove = () => {
    setUserStack(prevStack => {
      if (prevStack.length === 0) {
        userArrayRef.current = [...unsortedArray];
        setLiveMessage('You have no moves to undo.')
        return prevStack;
      }
      const recentOperation = prevStack[prevStack.length-1][0];
      const lastMove = prevStack[prevStack.length - 1];
      switch (recentOperation) {
        case 'Swap':
          // swap the elements back visually using the containers stored on the top of the stack
          visualSwap(lastMove[4], lastMove[5] as createjs.Container, stage.current as createjs.Stage);
          break;
        case 'Insert':
          // swap elements back visually using the containers stored on the top of the stack
          visualUndoInsert(lastMove[4], lastMove[5] as createjs.Container[], stage.current, textSquares.current)
          break;
        default:
          break;
        }
      if(prevStack.length > 1) {
        const moveTwoBehind = prevStack[prevStack.length - 2];
        userArrayRef.current = moveTwoBehind[3];
      } else {
        userArrayRef.current = [...unsortedArray];
      }
      setLiveMessage('Your last move was undone.')
      
      return prevStack.slice(0, -1);
    });
  };

  // Click event on toolbox button will call setOperation which will 
  // set the operation state variable to the id of the button that was clicked 
  const toolboxClickHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
    const target = event.target as HTMLElement;
    if (!target || !target.id) return;
    const id = target.id;

    if (id === 'submit') {
      handleSubmit();
    } else if (id === 'undo') {
      undoLastMove();
    } else if (id === 'markSorted' || id === 'Swap' || id === 'Insert') {
      setOperation(id as Operation)
    } else if (id === 'video') {
      setShowVideoModal(true)
    } else if (id === 'help') {
      setShowHelpModal(true)
    } else if (id === 'closeVideo') {
      setShowVideoModal(false)
      activityRef.current?.focus();
    } else if (id === 'close-help') {
      setShowHelpModal(false)
      activityRef.current?.focus();
    } else {
      console.warn('Error! Invalid tool selected from the toolbox.');
    }
  }

  return (
    <div className={`lesson`} >
      <div
        aria-hidden={showVideoModal || showHelpModal}
        style={{cursor: `url(${cursor(operation)}), default`}}
        id="activity"
        tabIndex={-1}
        ref={activityRef}
      >
      { !answerSubmitted && <main 
        aria-label='activity' 
        className={`${operation} ${showVideoModal && 'offscreen'}`}
        id="sort-section" 
        role='region' 
      >
        <h1>{sortType} Sort</h1>
        <p className='center'>Sort from left to right, smallest to biggest</p>
        <canvas 
          id="demoCanvas"
          className='demo-canvas'
          width={canvasWidth} 
          height="115px">
        </canvas>
        { hint !== '' && <p id='activityHint'>{hint}</p> }
      </main> }
      { !answerSubmitted && !showVideoModal && !showHelpModal && <aside 
        aria-label='Your moves' 
        className={operation} 
        id="your-moves"
        role='region'
      >
        <h2>Your moves</h2>
        <p className='center'>Original Array: {unsortedArray.join(', ')}</p>
        <br/>
        {userStack.length>0} <ol>
          {userStack.map((item, index) => (
            <li key={index}
              className="movesListItem"
            >
              {item[0]} {item[1]} 
              {item[0]==='Insert' ? ' before ' : ' and '}
              {item[2]}:&nbsp;
              <span className='sr-only'> resulting array is&nbsp;</span>
              [{item[3].join(', ')}] 
            </li>
          ))}
        </ol>
      </aside> }
      {showHelpModal && !showVideoModal && <HelpModal 
        closeModal={closeModal}
        isQuiz = {false}
        onClick={toolboxClickHandler} 
        sortType={sortType}
      />}

      { answerSubmitted && <SubmissionFeedback 
        array={unsortedArray}
        userMoves={userStack}
        programMoves={programStack}
        sortType={sortType} 
        correct={answerCorrect}
        onClick={toolboxClickHandler} 
      /> }
        
    </div>
      {!answerSubmitted && !showVideoModal && <Toolbox
        activeTool={operation}
        hidden={showVideoModal || showHelpModal}
        enableSubmit={submitEnabled}
        isQuiz = {false} 
        onClick={toolboxClickHandler} 
        sortType={sortType} 
      />}
      { showVideoModal && <VideoModal
        onClick={() => setShowVideoModal(prev => !prev)} 
        sortType={sortType}
        /> }

      { !showVideoModal && 
        <Critter 
          hidden={showVideoModal || showHelpModal} 
          sortType={sortType}
          answerCorrect={answerCorrect}
      /> }
    </div>
  )
}
export default Lesson
