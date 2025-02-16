
import "./WordPlacement.css";

const WordPlacement = () => {
    const wordToGuess = "JAVASCRIPT"; // The word to guess
    
    const renderWord = () => {
      return wordToGuess.split("").map((letter, index) => (
        <span className="letter" key={index}>
          _
        </span>
      ));
    };
  
    return (
      <div className="word-placement" style={{ width: `${wordToGuess.length * 50}px` }}>
        <h1>Word Placement Game</h1>
        <div className="word">{renderWord()}</div>
      </div>
    );
  };

export default WordPlacement;

