import React from "react";
import "./AlbumCover.css";

const AlbumCover = ({ albumCover, onClick, isPlaying, hasPreview }) => {
  return (
    <div className="album-container">
      <img 
        src={albumCover} 
        alt="Album Cover" 
        className="album-cover" 
        onClick={onClick} // ✅ Clicking the album cover also plays music
      />

      {hasPreview ? (
        <button className="play-button" onClick={onClick}>
          {isPlaying ? "⏸ Pause" : "▶ Play"}
        </button>
      ) : (
        <p className="no-preview">No preview available</p>
      )}
    </div>
  );
};

export default AlbumCover;
