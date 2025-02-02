const WordleGrid = () => {
    const rows = 5; 
    const cols = 5; 
  
    return (
      <div className="wordle-grid">
        {Array.from({ length: rows }).map((_, rowIndex) => (
          <div key={rowIndex} className="wordle-row">
            {Array.from({ length: cols }).map((_, colIndex) => (
              <div key={colIndex} className="wordle-cell">
                {}
              </div>
            ))}
          </div>
        ))}
      </div>
    );
  };
  
  export default WordleGrid;