import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Model from './model/Model.js';
import App from './App';

// default puzzle to use
import { puzzleInformation } from './model/Puzzle.js'; 
var actualPuzzle = JSON.parse(JSON.stringify(puzzleInformation));   // parses string into JSON object, used below.

var model = new Model(actualPuzzle);

test('No moves when model created', () => {
  expect(model.numMoves).toBe(0)
});

test('Properly renders 0 moves', () => {
  const { getByText } = render(<App />);
  const movesElement = getByText(/number moves: 0/i);
  expect(movesElement).toBeInTheDocument();
});
