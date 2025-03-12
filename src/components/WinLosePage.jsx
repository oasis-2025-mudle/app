import React, { useEffect } from 'react';
import { Fireworks } from 'fireworks-js'; // Import Fireworks
import './WinLosePage.css'; // Import CSS for styling

const WinLosePage = ({ result, spotifyUrl, onPlayAgain }) => {
  useEffect(() => {
    if (result === 'win') {
      const container = document.querySelector('.fireworks'); // Get the fireworks container
      const fireworks = new Fireworks(container); // Initialize fireworks
      fireworks.start(); // Start fireworks when user wins
    }
  }, [result]);

  return (
    <div className="win-lose-page">
      <div className="fireworks"></div> {/* This will be the fireworks container */}
      
      <div className="content">
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
    </div>
  );
};

export default WinLosePage;