import './Keyboard.css';
import { useState, useEffect } from 'react';
import WordPlacement from './WordPlacement'; // Import WordPlacement

function Keyboard({ onKeyPress, guessedWords }) {
  const [clickedKeys, setClickedKeys] = useState(new Set());
  const [chances, setChances] = useState(7); // Initialize chances to 7
  const [gameOver, setGameOver] = useState(false); // Track if game is over

  const rows = [
    ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
    ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
    ['Z', 'X', 'C', 'V', 'B', 'N', 'M']
  ];

  // Handle the key press and mark the key as clicked
  const handleKeyPress = (key) => {
    if (gameOver) return; // Prevent further key presses if game is over
    
    setClickedKeys((prevClickedKeys) => new Set(prevClickedKeys).add(key));
    onKeyPress(key); // Call the onKeyPress callback passed in as a prop
    
    // If the pressed key is wrong, decrement chances
    if (!checkIfKeyInWord(key)) {
      setChances((prevChances) => {
        const newChances = prevChances - 1;
        if (newChances === 0) {
          setGameOver(true); // Game over when chances run out
        }
        return newChances;
      });
    }
  };

  // Example function to check if the key is in the word, replace with your actual logic
  const checkIfKeyInWord = (key) => {
    // Your word checking logic goes here. For example:
    return guessedWords.some((word) => word.includes(key));
  };

  // Listen for keydown events to simulate a button press
  useEffect(() => {
    const handleKeyDown = (event) => {
      const key = event.key.toUpperCase(); // Get the key and convert to uppercase
      if (rows.flat().includes(key)) {  // Ensure that the key is part of our keyboard
        handleKeyPress(key);
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [rows, handleKeyPress]);

  return (
    <div className="keyboard">
      {/* WordPlacement component at the top of the keyboard */}
      <div className="word-placement-wrapper">
        <WordPlacement guessedWords={guessedWords} />
      </div>

      {/* Display remaining chances */}
      <div className="chances-display">
        <h3>Chances left: {chances}</h3>
      </div>

      {/* The keyboard layout */}
      <div className="keyboard-body">
        {rows.map((row, rowIndex) => (
          <div className="keyboard-row" key={rowIndex}>
            {row.map((key, keyIndex) => (
              <button
                key={keyIndex}
                className={`keyboard-key ${clickedKeys.has(key) ? 'clicked' : ''}`}
                onClick={() => handleKeyPress(key)}
                disabled={clickedKeys.has(key) || gameOver} // Disable keys after clicked or game over
              >
                {key}
              </button>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Keyboard;
