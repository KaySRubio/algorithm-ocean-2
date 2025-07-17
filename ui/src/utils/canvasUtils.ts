import { Shape, Container, Text, Ticker } from '@createjs/easeljs'
import { Tween, Ease } from "@createjs/tweenjs"
import type { Operation } from '../types/types';
import { darkblue, lightblue, transparent } from '../data/data';


// const textSquare = makeTextSquare(x, y, num, operation, handleCanvasSquareClick, handleCanvasTriangleClick);
  // Method to make a CreateJS text square which consists of a container, square, and text
export const makeTextSquare = (
  x: number,
  y: number,
  num: number,
  operation: Operation,
  squareClickHandler: (event: createjs.MouseEvent) => void,
  triangleClickHandler: (event: createjs.MouseEvent) => void
): createjs.Container => {

    // Update triangles to slightly larger based on screen size
    let triangleSize = 15;
    console.log('window.innerWidth', window.innerWidth);
    if(window.innerWidth < 500) {
      triangleSize = 20;
    }

    const textSquare = new Container(); // create container
    const square = new Shape(); // create square
    const squareFill = square.graphics.beginFill(darkblue).command; // create a command to change square color
    // square.graphics.setStrokeStyle(3).beginStroke(lightblue).drawRect(x, y, 40, 35); // x,y,width,height
    square.graphics.setStrokeStyle(3).beginStroke(lightblue).drawRect(x, y, 46, 35); // x,y,width,height
    square.addEventListener('click', squareClickHandler); // click event on square
    square.squareFill = squareFill; // store the command to change color in the square object for easy access



    const triangle = new Shape();

    if (operation === 'Insert') {
      const fillCommand = triangle.graphics.beginFill(darkblue).command; // command that allows you to change color in future
      triangle.graphics.setStrokeStyle(1);
      const borderCommand = triangle.graphics.beginStroke(lightblue).command; // command that allows you to change color in future
      triangle.graphics.drawPolyStar(x, y+50, triangleSize, 3, 0, 270);
      triangle.addEventListener('click', triangleClickHandler) // click event on triangle
      triangle.fillCommand = fillCommand; // store the commands to change color in the triangle object for easy access
      triangle.borderCommand = borderCommand;
    }

    const text = new Text(num, '30px Arial', lightblue); // create text
    text.textBaseline = "alphabetic";
    text.x = x+6; // positioning text so it's in the center of the square
    text.y = y+28;

    // put the square and the text in the container
    if (operation === 'Insert') { textSquare.addChild(square, text, triangle); }
    else textSquare.addChild(square, text);

    return textSquare;
  }

export const visualSwap = (containerA: createjs.Container, containerB: createjs.Container, stage: createjs.Stage) => {
  // Get the distance between them on the screen for visual swapping
  const distance = containerA.getTransformedBounds().x - containerB.getTransformedBounds().x;
  // Tween the createJS containers for a visual swap
  Tween.get(containerA)
    .to({ y: 40, x: containerA.x+distance/2*-1 }, 500, Ease.getPowIn(4))
    .to({ y: 0, x: containerA.x+distance*-1 }, 500, Ease.getPowOut(4)); 
  Tween.get(containerB)
    .to({ y: 80, x: containerB.x+distance/2 }, 500, Ease.getPowIn(4))
    .to({ y: 0, x: containerB.x+distance }, 500, Ease.getPowOut(4));
  
  Ticker.addEventListener("tick", stage);
  // todo - remove event listener at some point after animations are done?
}

export const visualInsert = (containerA: createjs.Container, shiftToRight: createjs.Container[], stage: createjs.Stage, textSquares: createjs.Container[]) => {
  // @ts-expect-error ignore canvas errors
  textSquares.forEach(e => e.children[2].fillCommand.style = transparent); // hide all triangles during visual insert
  // @ts-expect-error ignore canvas errors
  textSquares.forEach(e => e.children[2].borderCommand.style = transparent);

  // get the distance between containerA and the last element in shiftToRight, which is the place that containerA is going
  const distance = containerA.getTransformedBounds().x - shiftToRight[shiftToRight.length-1].getTransformedBounds().x;

  // tween all containers in shiftToRight to the right
  for(let i = 0; i < shiftToRight.length; i++) {
    const container = shiftToRight[i];
    Tween.get(container)
    .to({ x: container.x+50 }, 250, Ease.getPowIn(4));
  }
    
  // tween containerA into it's new location
  Tween.get(containerA)
  .to({ y: 60, x: containerA.x+distance/2*-1 }, 250, Ease.getPowIn(4))
  .to({ y: 0, x: containerA.x+distance*-1 }, 250, Ease.getPowOut(4)); 
  
  Ticker.addEventListener("tick", stage);
  // @ts-expect-error ignore canvas errors
  setTimeout(() => {textSquares.forEach(e => e.children[2].fillCommand.style = darkblue)}, 501); // show triangles again
  // @ts-expect-error ignore canvas errors
  setTimeout(() => {textSquares.forEach(e => e.children[2].borderCommand.style = lightblue)}, 501);
}

export const visualUndoInsert = (
  containerA: createjs.Container,
  shiftToRight: createjs.Container[],
  stage: createjs.Stage | null,
  textSquares: createjs.Container[]
) => {
  // @ts-expect-error ignore canvas errors
  textSquares.forEach(e => e.children[2].fillCommand.style = transparent); // hide all triangles during visual animation
  // @ts-expect-error ignore canvas errors
  textSquares.forEach(e => e.children[2].borderCommand.style = transparent);

  // get the distance between containerA and the first element in shiftToRight, which is the place that containerA is going
  const distance = containerA.getTransformedBounds().x - shiftToRight[0].getTransformedBounds().x;

  // tween all containers in shiftToRight to the left
  for(let i = 0; i < shiftToRight.length; i++) {
    const container = shiftToRight[i];
    Tween.get(container)
    .to({ x: container.x-50 }, 250, Ease.getPowIn(4));
  }
  
  // tween containerA into it's new location
  Tween.get(containerA)
  .to({ y: 60, x: containerA.x+distance/2*-1 }, 250, Ease.getPowIn(4))
  .to({ y: 0, x: containerA.x+distance*-1 }, 250, Ease.getPowOut(4)); 
  
  Ticker.addEventListener("tick", stage);
  // @ts-expect-error ignore canvas errors
  setTimeout(() => {textSquares.forEach(e => e.children[2].fillCommand.style = darkblue)}, 501); // show triangles again
  // @ts-expect-error ignore canvas errors
  setTimeout(() => {textSquares.forEach(e => e.children[2].borderCommand.style = lightblue)}, 501);
}