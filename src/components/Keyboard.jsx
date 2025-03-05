import './Keyboard.css';
import { useState, useEffect } from 'react';
import WordPlacement from './WordPlacement'; // Import WordPlacement

function Keyboard({ onKeyPress, guessedWords }) {
  const [clickedKeys, setClickedKeys] = useState(new Set());

  const rows = [
    ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
    ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
    ['Z', 'X', 'C', 'V', 'B', 'N', 'M']
  ];

  // Handle the key press and mark the key as clicked
  const handleKeyPress = (key) => {
    setClickedKeys((prevClickedKeys) => new Set(prevClickedKeys).add(key));
    onKeyPress(key); // Call the onKeyPress callback passed in as a prop
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

      {/* The keyboard layout */}
      <div className="keyboard-body">
        {rows.map((row, rowIndex) => (
          <div className="keyboard-row" key={rowIndex}>
            {row.map((key, keyIndex) => (
              <button
                key={keyIndex}
                className={`keyboard-key ${clickedKeys.has(key) ? 'clicked' : ''}`}
                onClick={() => handleKeyPress(key)}
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