/*import './App.css';
import { useState, useEffect, useRef } from 'react';
import Keyboard from './components/Keyboard';
import AlbumCover from './components/AlbumCover';
import HintButtons from './components/HintButtons';
import Hangman from './components/Hangman'; // Import Hangman component

const CLIENT_ID = "85f7a8c6e2494a04a21a7de48f56e87e";
const CLIENT_SECRET = "bd047934edbc4a06aeb77b9db6766296";

const App = () => {
  const [wordToGuess, setWordToGuess] = useState("");
  const [guessedWords, setGuessedWords] = useState([]);
  const [albumCover, setAlbumCover] = useState("");
  const [previewUrl, setPreviewUrl] = useState("");
  const [loading, setLoading] = useState(true);
  const [hasPreview, setHasPreview] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(new Audio());
  const [artist, setArtist] = useState("");
  const [genre, setGenre] = useState("");
  const [year, setYear] = useState("");
  const [chances, setChances] = useState(7);  
  const [gameOver, setGameOver] = useState(false); 

  const getSpotifyToken = async () => {
    try {
      const response = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          grant_type: "client_credentials",
          client_id: CLIENT_ID,
          client_secret: CLIENT_SECRET
        })
      });

      const data = await response.json();
      return data.access_token || null;
    } catch {
      return null;
    }
  };

  const fetchPreviewUrlFromSpotify = async (trackId) => {
    try {
      const token = await getSpotifyToken();
      if (!token) return null;

      const response = await fetch(`https://api.spotify.com/v1/tracks/${trackId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      const data = await response.json();
      return data.preview_url || null;
    } catch {
      return null;
    }
  };

  useEffect(() => {
    const fetchSong = async () => {
      const SHEET_ID = "1vxVGzTkjGr0rzm0rr70HnOIE6BsThAiCooCPzYFbQvw";
      const SHEET_NAME = "Oasis Song Data";
      const RANGE = "A2:F55";

      try {
        const response = await fetch(
          `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:csv&sheet=${encodeURIComponent(SHEET_NAME)}&range=${encodeURIComponent(RANGE)}`
        );

        const rawData = await response.text();
        const rows = rawData.split("\n").map(row => row.split(","));

        const randomRow = rows[Math.floor(Math.random() * rows.length)];
        const songName = randomRow[0]?.replace(/"/g, "").trim() || "Wonderwall";
        const albumCoverUrl = randomRow[2]?.replace(/"/g, "").trim() || "";
        const spotifyUrl = randomRow[3]?.replace(/"/g, "").trim() || "";
        const genre = randomRow[1]?.replace(/"/g, "").trim() || "Unknown genre";
        const artist = randomRow[4]?.replace(/"/g, "").trim() || "Unknown artist";
        const year = randomRow[5]?.replace(/"/g, "").trim() || "Unknown year";

        setGenre(genre);
        setArtist(artist);
        setYear(year);

        const trackIdMatch = spotifyUrl.match(/track\/([a-zA-Z0-9]+)/);
        const trackId = trackIdMatch ? trackIdMatch[1] : null;
        
        let previewAudioUrl = null;
        if (trackId) {
          previewAudioUrl = await fetchPreviewUrlFromSpotify(trackId);
        }

        setPreviewUrl(previewAudioUrl || ""); 
        setHasPreview(!!previewAudioUrl);

        setWordToGuess(songName);
        setAlbumCover(albumCoverUrl);
        setGuessedWords(songName.split(" ").map(word => Array(word.length).fill("_")));
      } catch {
        setLoading(false);
      } finally {
        setLoading(false);
      }
    };

    fetchSong();
  }, []);

  const playAudio = () => {
    if (!previewUrl) return;
    
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch((error) => {
        console.log("Autoplay blocked. User must interact first.", error);
      });
    }

    setIsPlaying(!isPlaying);
  };

  useEffect(() => {
  
    if (previewUrl) {
      audioRef.current.pause();
      audioRef.current.src = previewUrl;
      audioRef.current.load();
      
      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          console.log("Autoplay blocked. Waiting for user interaction.");
          setHasPreview(false);
        });
      } else {
        setIsPlaying(true);
      }
    } else {
      setIsPlaying(false);
    }
  }, [previewUrl]);
  

  const handleKeyPress = (key) => {
    const isCorrectGuess = wordToGuess.toLowerCase().includes(key.toLowerCase());
  
    if (!isCorrectGuess) {
      setChances((prevChances) => {
        const newChances = prevChances - 1;
        if (newChances <= 0) {
          setGameOver(true); 
        }
        return newChances;
      });
    }
  
    setGuessedWords((prev) =>
      prev.map((wordArr, i) =>
        wordArr.map((char, j) =>
          wordToGuess.split(" ")[i][j].toLowerCase() === key.toLowerCase()
            ? wordToGuess.split(" ")[i][j]
            : char
        )
      )
    );
  };

  return (
    <div className="container">
      {loading ? (
        <div className="loading">Loading songs...</div>
      ) : (
        <>
          <div className="right-side-panel">
            <AlbumCover
              albumCover={albumCover}
              isPlaying={isPlaying}
              hasPreview={hasPreview}
            />
            <HintButtons
              genre={genre}
              artist={artist}
              year={year}
            />
            <Hangman chances={chances} /> 
          </div>

          <button onClick={() => playAudio()}>
            {isPlaying ? "Pause" : "Play"} Preview
          </button>



          <audio
            ref={audioRef}
            src={previewUrl || ""}
            crossOrigin="anonymous"
            onError={() => setHasPreview(false)}
          />
          <Keyboard onKeyPress={handleKeyPress} guessedWords={guessedWords} />
        </>
      )}
    </div>
  );
};

export default App;*/

import './App.css';
import { useState, useEffect, useRef } from 'react';
import Keyboard from './components/Keyboard';
import AlbumCover from './components/AlbumCover';
import HintButtons from './components/HintButtons';
import Hangman from './components/Hangman';

const CLIENT_ID = "85f7a8c6e2494a04a21a7de48f56e87e";
const CLIENT_SECRET = "bd047934edbc4a06aeb77b9db6766296";

const App = () => {
  const [wordToGuess, setWordToGuess] = useState("");
  const [guessedWords, setGuessedWords] = useState([]);
  const [albumCover, setAlbumCover] = useState("");
  const [previewUrl, setPreviewUrl] = useState("");
  const [loading, setLoading] = useState(true);
  const [hasPreview, setHasPreview] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(new Audio());
  const [artist, setArtist] = useState("");
  const [genre, setGenre] = useState("");
  const [year, setYear] = useState("");
  const [chances, setChances] = useState(7);  
  const [gameOver, setGameOver] = useState(false); 

  const getSpotifyToken = async () => {
    try {
      const response = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          grant_type: "client_credentials",
          client_id: CLIENT_ID,
          client_secret: CLIENT_SECRET
        })
      });

      const data = await response.json();
      return data.access_token || null;
    } catch {
      return null;
    }
  };

  useEffect(() => {
    const fetchSong = async () => {
      const SHEET_ID = "1vxVGzTkjGr0rzm0rr70HnOIE6BsThAiCooCPzYFbQvw";
      const SHEET_NAME = "Oasis Song Data";
      const RANGE = "A2:F55";

      try {
        const response = await fetch(
          `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:csv&sheet=${encodeURIComponent(SHEET_NAME)}&range=${encodeURIComponent(RANGE)}`
        );

        const rawData = await response.text();
        const rows = rawData.split("\n").map(row => row.split(","));

        const randomRow = rows[Math.floor(Math.random() * rows.length)];
        const songName = randomRow[0]?.replace(/"/g, "").trim() || "Wonderwall";
        const albumCoverUrl = randomRow[2]?.replace(/"/g, "").trim() || "";
        const genre = randomRow[1]?.replace(/"/g, "").trim() || "Unknown genre";
        const artist = randomRow[4]?.replace(/"/g, "").trim() || "Unknown artist";
        const year = randomRow[5]?.replace(/"/g, "").trim() || "Unknown year";
        const spotifyUrl = randomRow[3]?.replace(/"/g, "").trim() || "";

        setGenre(genre);
        setArtist(artist);
        setYear(year);
        setWordToGuess(songName);
        setAlbumCover(albumCoverUrl);
        setGuessedWords(songName.split(" ").map(word => Array(word.length).fill("_")));

        // Extract Track ID from the Spotify URL
        const trackIdMatch = spotifyUrl.match(/track\/([a-zA-Z0-9]+)/);
        const trackId = trackIdMatch ? trackIdMatch[1] : null;

        if (trackId) {
          const token = await getSpotifyToken();
          if (!token) {
            setHasPreview(false);
            return;
          }

          const trackResponse = await fetch(`https://api.spotify.com/v1/tracks/${trackId}`, {
            headers: { Authorization: `Bearer ${token}` }
          });

          const trackData = await trackResponse.json();
          const previewAudioUrl = trackData.preview_url || "";

          setPreviewUrl(previewAudioUrl);
          setHasPreview(!!previewAudioUrl);
        } else {
          setHasPreview(false);
        }
      } catch {
        setHasPreview(false);
      } finally {
        setLoading(false);
      }
    };

    fetchSong();
  }, []);

  const playAudio = () => {
    if (!previewUrl) return;
    
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch((error) => {
          console.error("Error playing audio:", error);
          setIsPlaying(false);
        });
    }
  };

  useEffect(() => {
    if (previewUrl) {
      audioRef.current.src = previewUrl;
      audioRef.current.load();
      setIsPlaying(false);
    } else {
      setIsPlaying(false);
    }
  }, [previewUrl]);

  const handleKeyPress = (key) => {
    const isCorrectGuess = wordToGuess.toLowerCase().includes(key.toLowerCase());
  
    if (!isCorrectGuess) {
      setChances((prevChances) => {
        const newChances = prevChances - 1;
        if (newChances <= 0) {
          setGameOver(true); 
        }
        return newChances;
      });
    }
  
    setGuessedWords((prev) =>
      prev.map((wordArr, i) =>
        wordArr.map((char, j) =>
          wordToGuess.split(" ")[i][j].toLowerCase() === key.toLowerCase()
            ? wordToGuess.split(" ")[i][j]
            : char
        )
      )
    );
  };

  return (
    <div className="container">
      {loading ? (
        <div className="loading">Loading songs...</div>
      ) : (
        <>
          <div className="right-side-panel">
            <AlbumCover
              albumCover={albumCover}
              isPlaying={isPlaying}
              hasPreview={hasPreview}
            />
            {/* Add Play Button Here */}
            <button 
              onClick={playAudio} 
              disabled={!previewUrl}
              className="play-button"
            >
              {isPlaying ? "⏸ Pause" : "▶ Play Preview"}
            </button>
            <HintButtons
              genre={genre}
              artist={artist}
              year={year}
            />
            <Hangman chances={chances} /> 
          </div>
  
          <audio
            ref={audioRef}
            src={previewUrl || ""}
            crossOrigin="anonymous"
            onError={() => setHasPreview(false)}
          />
          <Keyboard onKeyPress={handleKeyPress} guessedWords={guessedWords} />
        </>
      )}
    </div>
  );
};

export default App;