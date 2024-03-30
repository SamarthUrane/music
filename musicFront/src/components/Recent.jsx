import RecentCard from "./RecentCard";
import { useEffect, useState } from "react";
import { MyContext } from './myContext';

const Recent = () => {
  const [songs, setSongs] = useState([]);

  useEffect(() => {
    const getSongs = async () => {
      try {
        const response = await fetch("http://localhost:3000/allSongs", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          }
        });
        const data = await response.json();
        setSongs(data.songs)
      } catch (error) {
        console.error("Error fetching songs:", error);
      }
    };
    getSongs();
  }, []);

  return (
    <div className="mt-1">
      <div className="text-2xl pl-4 mb-2 font-semibold antialiased">Recent</div>
      <div className="flex flex-wrap justify-around sm:gap-x-5 sm:gap-y-10">
        {songs.slice(0, 5).map((song) => (
          <RecentCard key={song._id} song={song} />
        ))}
      </div>

    </div>
  );
};

export default Recent;
