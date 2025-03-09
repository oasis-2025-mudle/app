import { useState } from 'react';
import './HintButtons.css';

const HintButtons = ({ genre, artist, year }) => {
  const [revealedHints, setRevealedHints] = useState([false, false, false]);

  const hints = [
    { label: "Artist", value: artist },
    { label: "Genre", value: genre },
    { label: "Released", value: year }
  ];

  const revealHint = (index) => {
    const newRevealed = [...revealedHints];
    newRevealed[index] = true;
    setRevealedHints(newRevealed);
  };

  return (
    <div className="hint-buttons-container">
      {hints.map((hint, index) => (
        <button
          key={index}
          className={`hint-button ${revealedHints[index] ? 'revealed' : ''}`}
          onClick={() => revealHint(index)}
          disabled={revealedHints[index]}
        >
          {revealedHints[index] ? (
            <>
              <span className="hint-label">{hint.label}:</span>
              <span className="hint-value">{hint.value}</span>
            </>
          ) : (
            `Hint ${index + 1}`
          )}
        </button>
      ))}
    </div>
  );
};

export default HintButtons;