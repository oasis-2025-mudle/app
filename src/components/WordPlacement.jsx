import React from 'react';
import './WordPlacement.css';

const WordPlacement = ({ guessedWords }) => {
  return (
    <div className="word-placement">
      <h1>GUESS THE SONG!</h1>
      <div className="word-container">
        {guessedWords.map((wordLetters, wordIndex) => (
          <div key={wordIndex} className="word-line">
            {wordLetters.map((letter, letterIndex) => (
              <span
                className={`letter ${letter === '_' ? 'empty' : 'filled'}`}
                key={letterIndex}
              >
                {letter}
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default WordPlacement;