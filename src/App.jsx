/*import './App.css';
import { useState } from 'react';
import Keyboard from './components/Keyboard';
import WordPlacement from './components/WordPlacement';
// import AlbumCover from './components/AlbumCover';

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

export default App;*/
import './App.css';
import { useState, useEffect } from 'react';
import Keyboard from './components/Keyboard';
import WordPlacement from './components/WordPlacement';

const App = () => {
  const [wordToGuess, setWordToGuess] = useState("");
  const [guessedWords, setGuessedWords] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSong = async () => {
      const SHEET_ID = '1vxVGzTkjGr0rzm0rr70HnOIE6BsThAiCooCPzYFbQvw';
      const SHEET_NAME = 'Oasis Song Data';
      const RANGE = 'A2:A55';
      
      try {
        const response = await fetch(
          `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:csv&sheet=${encodeURIComponent(SHEET_NAME)}&range=${encodeURIComponent(RANGE)}`
        );
        
        const rawData = await response.text();
        const songs = rawData
          .split('\n')
          .map(row => row.split(',')[0].replace(/"/g, '').trim())
          .filter(Boolean);

        const randomSong = songs[Math.floor(Math.random() * songs.length)] || "Wonderwall";
        const words = randomSong.split(" ").filter(word => word.length > 0);
        
        setWordToGuess(randomSong);
        setGuessedWords(words.map(word => Array(word.length).fill('_')));
      } finally {
        setLoading(false);
      }
    };

    fetchSong();
  }, []);

  const handleKeyPress = (key) => {
    setGuessedWords(prev => prev.map((wordArr, i) => 
      wordArr.map((char, j) => 
        wordToGuess.split(" ")[i][j].toLowerCase() === key.toLowerCase() ? 
        wordToGuess.split(" ")[i][j] : char
      )
    ));
  };

  return (
    <div className="container">
      
      {loading ? (
        <div className="loading">Loading songs...</div>
      ) : (
        <>
          <WordPlacement guessedWords={guessedWords} />
          <Keyboard onKeyPress={handleKeyPress} />
        </>
      )}
    </div>
  );
};

export default App;