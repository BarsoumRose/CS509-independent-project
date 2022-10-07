import './App.css';
import React from 'react';
import { layout } from './Layout.js';

import Model from './model/Model.js';
import { redrawCanvas } from './boundary/Boundary.js'
import { puzzleInformation } from './model/Puzzle.js'; 
import { selectPiece, movePiece} from './controller/Controller.js';
import { Up, Down, Left, Right } from './model/Model.js';

var actualPuzzle = JSON.parse(JSON.stringify(puzzleInformation));   // parses string into JSON object, used below.

function App() {
  const [model, setModel] = React.useState(new Model(actualPuzzle));


  const appRef = React.useRef(null);      // Later need to be able to refer to App 
  const canvasRef = React.useRef(null);   // Later need to be able to refer to Canvas

  React.useEffect (() => {
    
    /** Happens once. */
  redrawCanvas(model, canvasRef.current, appRef.current);
  }, [model])   // this second argument is CRITICAL, since it declares when to refresh (whenever Model changes)

  const handleClick = (e) => {
    // console.log(e.screenX, e.screenY, e.clientX, e.clientY)
    // ^^^^^ useful for logging specific events for testing purposes
    let newModel = selectPiece(model, canvasRef.current, e);
    setModel(newModel);   // react to changes, if model has changed.
  }

  const movePieceHandler = (direction) => {
    let newModel = movePiece(model, direction);
    setModel(newModel);   // react to changes, if model has changed.
  }

  return (
    <main style={layout.Appmain} ref={appRef}>
      <canvas tabIndex="1"  
        className="App-canvas"
        ref={canvasRef}
        width={layout.canvas.width}
        height={layout.canvas.height}
        onClick={handleClick} 
        />
        <label style={layout.text}>{"number moves: " + model.numMoves}</label>
        <div style={layout.buttons}>
           <button style={layout.upbutton}  onClick={(e) => movePieceHandler(Up)} disabled={!model.available(Up)} >^</button>
           <button style={layout.leftbutton} onClick={(e) => movePieceHandler(Left)} disabled={!model.available(Left)} >&lt;</button>
           <button style={layout.rightbutton} onClick={(e) => movePieceHandler(Right)} disabled={!model.available(Right)}>&gt;</button>
           <button style={layout.downbutton} onClick={(e) => movePieceHandler(Down)} disabled={!model.available(Down)} >v</button>
        </div>

      </main>
  );
}

export default App;
