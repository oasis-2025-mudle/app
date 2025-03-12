import React from 'react';
import './hangman.css';

const Hangman = ({ chances }) => {
  // Map the chances to corresponding image steps, including step0.PNG for no wrong guesses
  const hangmanImages = [
    'step0.PNG', // 7 chances left (no wrong guesses yet)
    'step1.PNG', // 6 chances left
    'step2.PNG', // 5 chances left
    'step3.PNG', // 4 chances left
    'step4.PNG', // 3 chances left
    'step5.PNG', // 2 chances left
    'step6.PNG', // 1 chance left
    'step7.PNG', // 0 chances left (game over)
  ];

  // Determine the image to display based on remaining chances
  const currentImage = hangmanImages[7 - chances]; // Reverse the order by subtracting from 7

  return (
    <div className="hangman-container">
      <div className="hangman-stand">
        <div className="hangman-beam"></div>
        <div className="hangman-mid">
          <div className="hangman-post"></div>
          <div className="hangman-main">
            <div className="hangman-rope"></div>
            {/* Display hangman image based on chances */}
            <img src={currentImage} alt={`step${7 - chances}.PNG`} />
          </div>
        </div>
        <div className="hangman-base"></div>
      </div>
    </div>
  );
};

export default Hangman;