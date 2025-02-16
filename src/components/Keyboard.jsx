/* Original one
import './Keyboard.css';

function Keyboard({ onKeyPress }) {
    const rows = [
        ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
        ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
        ['Z', 'X', 'C', 'V', 'B', 'N', 'M']
    ];

    return (
        <div className="keyboard">
            {rows.map((row, rowIndex) => (
                <div className="keyboard-row" key={rowIndex}>
                    {row.map((key, keyIndex) => (
                        <button
                            key={keyIndex}
                            className="keyboard-key"
                            onClick={() => onKeyPress(key)} // Trigger onKeyPress on button click
                        >
                            {key}
                        </button>
                    ))}
                </div>
            ))}
        </div>
    );
}

export default Keyboard;
*/

// has a slash through when button is clicked
import './Keyboard.css';
import { useState } from 'react';

function Keyboard({ onKeyPress }) {
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

    return (
        <div className="keyboard">
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
    );
}

export default Keyboard;
