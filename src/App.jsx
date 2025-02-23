import './App.css';
import { useState } from 'react';
import Keyboard from './components/Keyboard';
import WordPlacement from './components/WordPlacement';

const App = () => {
  const wordToGuess = "Paris In the Rain";  // Target word to guess
  const wordsToGuess = wordToGuess.split(" ");  // Split the sentence into words
  const [guessedWords, setGuessedWords] = useState(
    wordsToGuess.map(word => Array(word.length).fill("_")) // Initialize guessed words
  );

  const handleKeyPress = (key) => {
    setGuessedWords((prevGuessedWords) => 
      prevGuessedWords.map((guessedWord, wordIndex) => 
        guessedWord.map((char, index) => {
          if (wordsToGuess[wordIndex][index].toLowerCase() === key.toLowerCase() && char === "_") {
            return wordsToGuess[wordIndex][index]; // Replace with correct letter
          }
          return char; // Keep existing value
        })
      )
    );
  };

  return (
    <div className="container">
      <Keyboard onKeyPress={handleKeyPress} />
      <WordPlacement guessedWords={guessedWords} />
    </div>
  );
};

export default App;

