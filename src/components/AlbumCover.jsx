import { useState, useEffect } from "react";
import { supabase } from "./components/supabaseClient"; // Ensure this path is correct
import './AlbumCover.css';

const AlbumCover = () => {
  const [coverUrl, setCoverUrl] = useState("");

  useEffect(() => {
    const fetchAlbumCover = async () => {
      console.log("Fetching album cover for 'History'..."); // Debugging log

      const { data, error } = await supabase
        .from("Song") // Ensure this matches your Supabase table name
        .select("album_cover") // Select only the album cover column
        .eq("name", "History") // Filter for the song "History"
        .limit(1) // Get only the first result
        .single(); // Expect only one row

      if (error) {
        console.error("Error fetching album cover:", error);
      } else {
        console.log("Album Cover URL:", data?.album_cover); // Debugging log
        setCoverUrl(data?.album_cover || "");
      }
    };

    fetchAlbumCover();
  }, []);

  return (
    <div>
      {coverUrl ? (
        <img
          src={coverUrl}
        />
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default AlbumCover;
