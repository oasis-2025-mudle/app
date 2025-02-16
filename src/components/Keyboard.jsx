import './Keyboard.css';

function Keyboard() {
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

