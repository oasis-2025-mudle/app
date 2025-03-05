import React from "react";
import "./AlbumCover.css";

const AlbumCover = ({ albumCover, onClick, isPlaying, hasPreview, isLoading }) => {
  return (
    <div className="album-container">
      <img
        src={albumCover}
        alt="Album Cover"
        className={`album-cover ${!hasPreview ? "no-preview" : ""}`}
        onClick={hasPreview ? onClick : undefined}
      />

      {/* Loading overlay */}
      {isLoading && (
        <div className="overlay">
          <div className="loading-spinner"></div>
        </div>
      )}

      {/* Preview status indicators */}
      {!isLoading && (
        <>
          {hasPreview ? (
            <button 
              className="play-button"
              onClick={onClick}
              aria-label={isPlaying ? "Pause preview" : "Play preview"}
            >
              <span className="control-icon">
                {isPlaying ? "⏸" : "▶"}
              </span>
            </button>
          ) : (
            <div className="overlay">
              <span className="status-message">Preview unavailable</span>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default AlbumCover;