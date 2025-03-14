import './SpotifyPlayer.css';

function SpotifyPlayer({ spotifyUrl }) {
  if (!spotifyUrl) return null;

  return (
    <div className="spotify-player">
      <iframe
        src={`https://open.spotify.com/embed/track/${spotifyUrl.split("/track/")[1]?.split("?")[0]}`}
        width="300"
        height="80"
        allow="encrypted-media"
        title="Spotify Player"
      ></iframe>
      <div className="solid-block"></div>
      <div className="solid-cover"></div>
    </div>
  );
}

export default SpotifyPlayer;
