import React from 'react';
import './hangman.css';

const Hangman = ({ chances }) => {
  // We start with 7 chances. As chances drop,
  // we calculate how many parts of the man to show.
  // For example, if chances === 6, then 1 part (head) is shown.
  const maxChances = 7;
  const partsToShow = maxChances - chances;

  return (
    <div className="hangman-container">
      {/* Optional: Hangman stand */}
      <div className="hangman-stand">
        <div className="hangman-base"></div>
        <div className="hangman-post"></div>
        <div className="hangman-beam"></div>
        <div className="hangman-rope"></div>
      </div>
      {/* Hangman figure */}
      <div className="hangman-man">
        {partsToShow > 0 && (
          // Replace this div with an <img> tag later to show a custom head image
          <div className="hangman-head"></div>
        )}
        {partsToShow > 1 && <div className="hangman-body"></div>}
        {partsToShow > 2 && <div className="hangman-left-arm"></div>}
        {partsToShow > 3 && <div className="hangman-right-arm"></div>}
        {partsToShow > 4 && <div className="hangman-left-leg"></div>}
        {partsToShow > 5 && <div className="hangman-right-leg"></div>}
        {partsToShow > 6 && <div className="hangman-face"></div>}
      </div>
    </div>
  );
};

export default Hangman;
