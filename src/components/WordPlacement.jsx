import React from 'react';
import './WordPlacement.css';

const WordPlacement = ({ guessedWords }) => {
  return (
    <div className="word-placement">
      <h1 className="mudle-title">Mudle</h1>
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
/*import React from 'react';
import './WordPlacement.css';

const WordPlacement = ({ guessedWords }) => {
  const wordToGuess = "Paris In The Rain"; // The word to guess
  const words = wordToGuess.split(" ");  // Split the sentence into words
  
  const renderWord = (word, guessedWord) => {
    return word.split("").map((letter, index) => {
      if (letter === " ") {
        return (
          <span className="letter space" key={index}>
            &nbsp; {}
          </span>
        );
      }

      // Display guessed letter or placeholder based on the guessedWord
      return (
        <span className="letter" key={index}>
          {guessedWord[index] === "_" ? "_" : guessedWord[index]}
        </span>
      );
    });
  };

  return (
    <div className="word-placement">
      <h1>GUESS THE SONG !</h1>
      <div className="word">
        {words.map((word, wordIndex) => (
          <div key={wordIndex} className="line">
            {renderWord(word, guessedWords[wordIndex])}
          </div>
        ))}
      </div>
    </div>
  );
};

export default WordPlacement;*/
