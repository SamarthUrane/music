import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaPlay, FaPause } from "react-icons/fa";
import { CiHeart } from "react-icons/ci";
import { FaHeart } from "react-icons/fa";
import { useContext } from 'react';
import { MyContext } from './myContext';


// https://jukehost.co.uk/library


const RecentCard = ({ song }) => {
  
  const [isPlaying, setIsPlaying] = useState(false);
  const {playingSong,setplayingSong}=useContext(MyContext);
  const navigate=useNavigate();

  // the useRef hook is used to create a reference to the Audio object. This approach is commonly used in React when you need to persist a mutable value across renders without triggering a re-render.
  const audioRef = useRef(new Audio(song.file));

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
  const handleClick=()=>{
    navigate("/artistSongs",{state:song.artist})
  }

  const openSong =()=>{
    navigate("/song", {state:song});
  }

  return (
    <div className='w-44 h-max bg-gray-800 rounded-lg overflow-hidden shadow-lg'>
 
      <img src={song.thumbnail} alt={song.title} className='h-32 w-full object-cover cursor-pointer hover:opacity-80' onClick={openSong} />
     
      <div className='p-4'>
    
   

        <h3 className='text-lg font-semibold text-gray-300 truncate cursor-pointer' onClick={openSong} title={song.title}>{song.title} </h3> 
         
       
        <p className='text-sm text-gray-400 mb-2 truncate hover:underline cursor-pointer' onClick={handleClick} title={song.artist}>By: {song.artist} </p>
        
        <div className='flex items-center'>
 
          <p className='text-sm font-bold text-gray-400 cursor-default'>Genre: {song.genre}</p>
        </div> 

        <div className='flex'>
        <button onClick={handlePlay} className='flex items-center mt-2 text-gray-400'>
          {playingSong.src== song.file ? <FaPause className='mr-1' /> : <FaPlay className='mr-1' />}
          <p className='text-xs'>{playingSong.src==song.file? 'Pause' : 'Play'}</p>
        </button>
        {/* <CiHeart className='mt-2 ml-20 w-10'></CiHeart> */}
        {/* <FaHeart className='mt-2 ml-20 w-10'/> */}
        </div>
       
      </div>
    </div>
  );
};

export default RecentCard;
