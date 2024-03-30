import { FaPlay, FaPause } from "react-icons/fa";
import { useRef, useState } from "react"; 
import { useContext } from 'react';
import { MyContext } from './myContext';

const SongContent = ({ song }) => {
    const [isPlaying, setIsPlaying] = useState(false);

    const {playingSong,setplayingSong}=useContext(MyContext);
    // the useRef hook is used to create a reference to the Audio object. This approach is commonly used in React when you need to persist a mutable value across renders without triggering a re-render.
    const audioRef = useRef(new Audio("/songs/" + song.file + ".mp3"));

    const handlePlay = () => {
        const audio = audioRef.current; // Get the current audio object from the ref
        
        if (isPlaying) {
          audio.pause();
          setplayingSong("null")
        } else {
          if (playingSong!="null") {
            playingSong.pause(); 
          }
          audio.play(); 
          setplayingSong(audio); 
        }
        setIsPlaying(!isPlaying);
      };

    return (
        <div className="bg-black text-white p-7 ml-36 min-h-screen">
            <div className="mb-4   flex relative">
                <img
                    src={song.thumbnail}
                    alt="Song Pic"
                    className="object-cover w-1/5 h-48 ml-10 mt-8"
                />
                <div className="absolute mt-3 top-1/3 left-1/4 font-bold text-xl">Song<br /><div className="font-bold text-7xl">{song.title}</div><div className="font-medium cursor-pointer">{song.artist}</div></div>
            </div>
            <div className="">

                <button onClick={handlePlay} className='flex items-center mt-2 text-gray-400'>
                    {playingSong.src=="http://localhost:5173/songs/"+song.file+".mp3" ? <FaPause className='mr-1' /> : <FaPlay className='mr-1' />}
                    <p className='text-xs'>{playingSong.src=="http://localhost:5173/songs/"+song.file+".mp3" ? 'Pause' : 'Play'}</p>
                </button>
                Lyrics<br />
                {song.lyrics}
            </div>
        </div>
    )
}

export default SongContent