// WinLosePage.jsx
import React from 'react';
import './WinLosePage.css';

const WinLosePage = ({ result, onPlayAgain }) => {
  return (
    <div className="winlose-container">
      <h1 className="winlose-message">{result === 'win' ? 'You Win!' : 'You Lose!'}</h1>
      <button className="play-again-button" onClick={onPlayAgain}>
        Play Again
      </button>
    </div>
  );
};

export default WinLosePage;