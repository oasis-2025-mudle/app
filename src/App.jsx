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
import { useState, useEffect, useRef } from 'react';
import Keyboard from './components/Keyboard';
import WordPlacement from './components/WordPlacement';
import AlbumCover from './components/AlbumCover';

const CLIENT_ID = "4e95d7b4a2664e34ac4825dd2df8e500"; // Replace with actual credentials
const CLIENT_SECRET = "bd4c5c8893a44948854e193af728ca66"; // Replace with actual credentials

const App = () => {
  const [wordToGuess, setWordToGuess] = useState("");
  const [guessedWords, setGuessedWords] = useState([]);
  const [albumCover, setAlbumCover] = useState("");
  const [previewUrl, setPreviewUrl] = useState("");
  const [loading, setLoading] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasPreview, setHasPreview] = useState(true);
  const audioRef = useRef(null);

  // Spotify API Authentication
  const getSpotifyToken = async () => {
    try {
      const response = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `grant_type=client_credentials&client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}`
      });
      
      const data = await response.json();
      return data.access_token;
    } catch (error) {
      console.error('Spotify Auth Error:', error);
      return null;
    }
  };

  // Fetch Song Data
  useEffect(() => {
    const fetchSongData = async () => {
      try {
        // Fetch from Google Sheet
        const sheetResponse = await fetch(
          'https://docs.google.com/spreadsheets/d/1vxVGzTkjGr0rzm0rr70HnOIE6BsThAiCooCPzYFbQvw/gviz/tq?tqx=out:csv&sheet=Oasis%20Song%20Data&range=A2:E55'
        );
        const rawData = await sheetResponse.text();
        const rows = rawData.split('\n').map(row => row.split(','));

        // Get random song
        const randomRow = rows[Math.floor(Math.random() * rows.length)];
        const spotifyUrl = randomRow[4]?.replace(/"/g, "").trim() || "";
        
        // Extract Track ID
        const trackId = spotifyUrl.match(/track\/([a-zA-Z0-9]+)/)?.[1] || null;
        
        // Get Preview URL
        let preview = '';
        if (trackId) {
          const token = await getSpotifyToken();
          if (token) {
            const trackResponse = await fetch(`https://api.spotify.com/v1/tracks/${trackId}`, {
              headers: { Authorization: `Bearer ${token}` }
            });
            const trackData = await trackResponse.json();
            preview = trackData.preview_url || '';
          }
        }

        // Update State
        setWordToGuess(randomRow[0]?.replace(/"/g, "").trim() || "Wonderwall");
        setAlbumCover(randomRow[2]?.replace(/"/g, "").trim() || "");
        setPreviewUrl(preview);
        setHasPreview(!!preview);
        setGuessedWords(
          randomRow[0]?.replace(/"/g, "").trim().split(" ").map(word => 
            Array(word.length).fill("_")
          ) || []
        );

      } catch (error) {
        console.error('Error fetching data:', error);
        setHasPreview(false);
      } finally {
        setLoading(false);
      }
    };

    fetchSongData();
  }, []);

  // Audio Control
  const handlePlayPause = () => {
    if (!hasPreview) return;

    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play()
          .then(() => setIsPlaying(true))
          .catch(error => {
            console.error('Playback error:', error);
            setHasPreview(false);
          });
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="container">
      {loading ? (
        <div className="loading">Loading songs...</div>
      ) : (
        <>
          <AlbumCover
            albumCover={albumCover}
            onClick={handlePlayPause}
            isPlaying={isPlaying}
            hasPreview={hasPreview}
          />
          
          {/* Add this play/pause button */}
          {hasPreview && (
            <button 
              className="play-control"
              onClick={handlePlayPause}
              disabled={!hasPreview}
            >
              {isPlaying ? '⏸ Pause' : '▶ Play'}
            </button>
          )}

          <audio 
            ref={audioRef} 
            src={previewUrl}
            onEnded={() => setIsPlaying(false)}
            crossOrigin="anonymous"
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