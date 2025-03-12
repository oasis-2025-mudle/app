import './WinLosePage.css';
import React from 'react';

const WinLosePage = ({ result, spotifyUrl, onPlayAgain }) => {
  return (
    <div className="win-lose-page">
      <h1>{result === 'win' ? 'You Win!' : 'You Lose!'}</h1>
      <div className="result-message">
        {result === 'lose' && <p>Better luck next time!</p>}
        <p>Here's the song you were guessing:</p>
        <a href={spotifyUrl} target="_blank" rel="noopener noreferrer">
          <button className="listen-button">Listen to the song on Spotify</button>
        </a>
      </div>
      <button className="play-again-button" onClick={onPlayAgain}>Play Again</button>
    </div>
  );
};

export default WinLosePage;