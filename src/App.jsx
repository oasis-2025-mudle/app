import './App.css'
import Keyboard from './components/Keyboard';
import WordPlacement from "./components/WordPlacement";


function Keyboard({ onKeyClick }) {
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
                            onClick={() => onKeyClick(key)} // Pass clicked key to the parent
                        >
                            {key}
                        </button>
                    ))}
                </div>
            ))}
        </div>
    );
}

export default Keyboard
