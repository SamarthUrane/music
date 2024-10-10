import { FaPlay, FaPause } from "react-icons/fa";
import { useRef, useState,useEffect } from "react";
import { useContext } from 'react';
import { MyContext } from './myContext';
import { getUrl } from "./s3Op";
// import 

const SongContent = ({ song }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [awsSong, setAwsSong] = useState(null);
  const [awsThumbnail, setAwsThumbnail] = useState(null);
  const { playingSong, setplayingSong } = useContext(MyContext);
  const audioRef = useRef(null);

  useEffect(() => {
    getAwsData();
  }, [])

  useEffect(() => {
    if (awsSong) {
      audioRef.current = new Audio(awsSong); // Initialize audioRef when awsSong is available
    }
  }, [awsSong]);

  const getAwsData = async () => {
    const getSong = await getUrl(song.file)
    const getThumbnail = await getUrl(song.thumbnail);
    setAwsSong(getSong);
    setAwsThumbnail(getThumbnail);
  }


  const handlePlay = () => {
    const audio = audioRef.current; // Get the current audio object from the ref

    if (isPlaying) {
      audio.pause();
      setplayingSong("null")
    } else {
      if (playingSong != "null") {
        playingSong.pause();
      }
      audio.play();
      setplayingSong(audio);
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="bg-gradient-to-b from-black via-gray-900 to-gray-800 text-white p-10 min-h-screen ml-36">
      <div className="mb-8 flex relative">
        <img
          src={awsThumbnail}
          alt="Song Pic"
          className="object-cover w-48 h-48 rounded-lg shadow-lg ml-10 mt-6"
        />
        <div className="absolute top-1/2 left-1/3 transform -translate-y-1/2">
          <h2 className="font-bold text-2xl text-gray-200 mb-2">Song</h2>
          <h1 className="font-extrabold text-7xl text-white leading-tight">{song.title}</h1>
          <p className="font-semibold text-2xl text-gray-400 mt-3 cursor-pointer hover:text-white transition-colors">
            {song.artist}
          </p>
        </div>
      </div>

      <div className="mt-10">
        <button
          onClick={handlePlay}
          className="flex items-center bg-gray-700 text-gray-400 rounded-full py-2 px-4 hover:bg-gray-600 transition-colors"
        >
          {playingSong.src === awsSong ? (
            <FaPause className="mr-2 text-lg" />
          ) : (
            <FaPlay className="mr-2 text-lg" />
          )}
          <p className="text-sm">{playingSong.src === awsSong ? 'Pause' : 'Play'}</p>
        </button>

        <div className="mt-6">
          <h3 className="font-semibold text-lg text-gray-200 mb-3">Lyrics</h3>
          <p className="text-gray-300 leading-relaxed whitespace-pre-wrap">
            {song.lyrics}
          </p>
        </div>
      </div>
    </div>

  )
}

export default SongContent