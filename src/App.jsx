import './App.css';
import { useState, useEffect, useRef } from 'react';
import Keyboard from './components/Keyboard';
import AlbumCover from './components/AlbumCover';
import HintButtons from './components/HintButtons';
import Hangman from './components/Hangman'; // Import Hangman component

const CLIENT_ID = "4e95d7b4a2664e34ac4825dd2df8e500";
const CLIENT_SECRET = "bd4c5c8893a44948854e193af728ca66";

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

  // 🔹 Function to Fetch Spotify Access Token
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

  // 🔹 Fetch Track Preview URL from Spotify
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

  // 🔹 Fetch Random Song from Google Sheets
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

        const trackIdMatch = spotifyUrl.match(/track\/([a-zA-Z0-9]+)(\?|$)/);
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

  // 🔹 Automatically Play Preview When `previewUrl` Updates
  useEffect(() => {
    if (previewUrl) {
      audioRef.current.pause();
      audioRef.current.src = previewUrl;
      audioRef.current.load();
      audioRef.current.play().catch(() => setHasPreview(false));
      setIsPlaying(true);
    } else {
      setIsPlaying(false);
    }
  }, [previewUrl]);

  // 🔹 Handle Key Presses for the Game
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
