/*
import './App.css';
import { useState, useEffect } from 'react';
import Keyboard from './components/Keyboard';
import WordPlacement from './components/WordPlacement';

const App = () => {
  const [wordToGuess, setWordToGuess] = useState("");
  const [guessedWords, setGuessedWords] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSong = async () => {
      const SHEET_ID = '1vxVGzTkjGr0rzm0rr70HnOIE6BsThAiCooCPzYFbQvw';
      const SHEET_NAME = 'Oasis Song Data';
      const RANGE = 'A2:A55';
      
      try {
        const response = await fetch(
          `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:csv&sheet=${encodeURIComponent(SHEET_NAME)}&range=${encodeURIComponent(RANGE)}`
        );
        
        const rawData = await response.text();
        const songs = rawData
          .split('\n')
          .map(row => row.split(',')[0].replace(/"/g, '').trim())
          .filter(Boolean);

        const randomSong = songs[Math.floor(Math.random() * songs.length)] || "Wonderwall";
        const words = randomSong.split(" ").filter(word => word.length > 0);
        
        setWordToGuess(randomSong);
        setGuessedWords(words.map(word => Array(word.length).fill('_')));
      } finally {
        setLoading(false);
      }
    };

    fetchSong();
  }, []);

  const handleKeyPress = (key) => {
    setGuessedWords(prev => prev.map((wordArr, i) => 
      wordArr.map((char, j) => 
        wordToGuess.split(" ")[i][j].toLowerCase() === key.toLowerCase() ? 
        wordToGuess.split(" ")[i][j] : char
      )
    ));
  };

  return (
    <div className="container">
      
      {loading ? (
        <div className="loading">Loading songs...</div>
      ) : (
        <>
          <WordPlacement guessedWords={guessedWords} />
          <Keyboard onKeyPress={handleKeyPress} />
        </>
      )}
    </div>
  );
};

export default App;*/
import './App.css';
import { useState, useEffect, useRef } from 'react';
import Keyboard from './components/Keyboard';
import WordPlacement from './components/WordPlacement';
import AlbumCover from './components/AlbumCover';

const CLIENT_ID = "YOUR_SPOTIFY_CLIENT_ID";
const CLIENT_SECRET = "YOUR_SPOTIFY_CLIENT_SECRET";

const App = () => {
  const [wordToGuess, setWordToGuess] = useState("");
  const [guessedWords, setGuessedWords] = useState([]);
  const [albumCover, setAlbumCover] = useState("");
  const [previewUrl, setPreviewUrl] = useState("");
  const [loading, setLoading] = useState(true);
  const [hasPreview, setHasPreview] = useState(true);
  const audioRef = useRef(null);

  // ... keep existing fetchSpotifyToken and fetchPreviewUrlFromSpotify functions ...

  useEffect(() => {
    const fetchSong = async () => {
      const SHEET_ID = "1vxVGzTkjGr0rzm0rr70HnOIE6BsThAiCooCPzYFbQvw";
      const SHEET_NAME = "Oasis Song Data";
      const RANGE = "A2:E55";

      try {
        const response = await fetch(
          `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:csv&sheet=${encodeURIComponent(SHEET_NAME)}&range=${encodeURIComponent(RANGE)}`
        );

        const rawData = await response.text();
        const rows = rawData.split("\n").map(row => row.split(","));

        const randomRow = rows[Math.floor(Math.random() * rows.length)];
        const songName = randomRow[0]?.replace(/"/g, "").trim() || "Wonderwall";
        const albumCoverUrl = randomRow[2]?.replace(/"/g, "").trim() || "";
        const spotifyUrl = randomRow[4]?.replace(/"/g, "").trim() || "";

        const trackIdMatch = spotifyUrl.match(/track\/([a-zA-Z0-9]+)/);
        const trackId = trackIdMatch ? trackIdMatch[1] : null;

        let previewAudioUrl = null;
        if (trackId) {
          previewAudioUrl = await fetchPreviewUrlFromSpotify(trackId);
        }

        console.log("Preview URL:", previewAudioUrl);
        setHasPreview(!!previewAudioUrl);
        setPreviewUrl(previewAudioUrl || "");
        setWordToGuess(songName);
        setAlbumCover(albumCoverUrl);
        setGuessedWords(songName.split(" ").map(word => Array(word.length).fill("_")));
      } finally {
        setLoading(false);
      }
    };

    fetchSong();
  }, []);

  return (
    <div className="container">
      {loading ? (
        <div className="loading">Loading songs...</div>
      ) : (
        <>
          <AlbumCover 
            albumCover={albumCover} 
            onClick={() => {
              if (!hasPreview) {
                alert("No preview available for this song");
                return;
              }
              
              if (audioRef.current) {
                audioRef.current.volume = 0.5;
                audioRef.current.play().catch(error => {
                  console.error("Play error:", error);
                  setHasPreview(false);
                });
              }
            }} 
          />
          <audio
            ref={audioRef}
            src={previewUrl || ""}
            crossOrigin="anonymous"
            onError={(e) => {
              console.error("Audio error:", e.target.error);
              setHasPreview(false);
            }}
          />
          <WordPlacement guessedWords={guessedWords} />
          <Keyboard onKeyPress={(key) => {
            setGuessedWords(prev => prev.map((wordArr, i) => 
              wordArr.map((char, j) => 
                wordToGuess.split(" ")[i][j].toLowerCase() === key.toLowerCase() ? 
                wordToGuess.split(" ")[i][j] : char
              )
            ));
          }} />
        </>
      )}
    </div>
  );
};

export default App;