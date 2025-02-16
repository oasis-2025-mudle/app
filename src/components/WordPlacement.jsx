import React from "react";
import "./WordPlacement.css";

const WordPlacement = () => {
  const wordToGuess = "Alice you well okay"; // The word to guess

  // Split the input into separate words and map them
  const renderWord = (word) => {
    return word.split("").map((letter, index) => {
      if (letter === " ") {
        return (
          <span className="letter space" key={index}>
            &nbsp; {/* Non-breaking space */}
          </span>
        );
      }
      return (
        <span className="letter" key={index}>
          _
        </span>
      );
    });
  };

  // Split the word to guess into individual words and map them into lines
  const words = wordToGuess.split(" "); // Split input into words
  
  return (
    <div className="word-placement">
      <h1>Word Placement Game</h1>
      <div className="word">
        {/* Map through each word and render them in individual lines */}
        {words.map((word, index) => (
          <div key={index} className="line">
            {renderWord(word)}
          </div>
        ))}
      </div>
    </div>
  );
};

export default WordPlacement;
