import React from "react";
import "./AlbumCover.css";

const AlbumCover = ({ albumCover, onClick, isPlaying, hasPreview }) => {
  return (
    <div className="album-container">
      <img 
        src={albumCover} 
        alt="Album Cover" 
        className="album-cover" 
        onClick={hasPreview ? onClick : undefined} // Only clickable if preview exists
      />
      {hasPreview && (
        <button className="play-button" onClick={onClick}>
          {isPlaying ? "⏸ Pause" : "▶ Play"}
        </button>
      )}
    </div>
  );
};

export default AlbumCover;
