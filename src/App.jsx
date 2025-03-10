import './App.css';
import { useState, useEffect } from 'react';
import Keyboard from './components/Keyboard';
import AlbumCover from './components/AlbumCover';
import HintButtons from './components/HintButtons';
import Hangman from './components/Hangman';

const App = () => {
  const [wordToGuess, setWordToGuess] = useState("");
  const [guessedWords, setGuessedWords] = useState([]);
  const [albumCover, setAlbumCover] = useState("");
  const [genre, setGenre] = useState("");
  const [artist, setArtist] = useState("");
  const [year, setYear] = useState("");
  const [spotifyUrl, setSpotifyUrl] = useState("");
  const [chances, setChances] = useState(7);
  const [gameOver, setGameOver] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSongData = async () => {
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
        setSpotifyUrl(spotifyUrl);
        setGuessedWords(songName.split(" ").map(word => Array(word.length).fill("_")));
      } catch {
        console.error("Error fetching song data");
      } finally {
        setLoading(false);
      }
    };

    fetchSongData();
  }, []);

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
            <AlbumCover albumCover={albumCover} />
            <HintButtons genre={genre} artist={artist} year={year} />
            <Hangman chances={chances} />

            {/* Solid Black Block */}
            <div className="solid-block"></div>

            {/* Spotify Player */}
            {spotifyUrl && (
              <div className="spotify-container">
                <iframe
                  src={`https://open.spotify.com/embed/track/${spotifyUrl.split("/track/")[1]?.split("?")[0]}`}
                  width="300"
                  height="80"
                  frameBorder="0"
                  allow="encrypted-media"
                  title="Spotify Player"
                ></iframe>
              </div>
            )}
          </div>
          <Keyboard onKeyPress={handleKeyPress} guessedWords={guessedWords} />
        </>
      )}
    </div>
  );
};

export default App;
