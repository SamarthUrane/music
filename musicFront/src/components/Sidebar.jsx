import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaHome } from 'react-icons/fa';
import { CiSearch } from 'react-icons/ci';
import { MdPlaylistAdd } from 'react-icons/md';
import { VscLibrary } from 'react-icons/vsc';
import { IoIosLogOut } from "react-icons/io";
import { CgProfile } from "react-icons/cg";
import { PiMusicNoteSimpleFill } from "react-icons/pi";
import { FaCloudUploadAlt } from "react-icons/fa";

const Sidebar = () => {
  const navigate = useNavigate();
  const onLogOut = () => {
    localStorage.clear('user');
    navigate("/")
  }

  return (
    <div className="min-h-screen min-w-max bg-slate-950 p-4 flex flex-col justify-between fixed">
      <div>
        <div className="text-white font-bold text-2xl mb-9 mt-3 select-none">Audio X</div>
        <Link to="/home" className="text-white block mb-3 p-1 hover:bg-gray-800 rounded">
          <FaHome className="mr-2 inline-block active" /> Home
        </Link>
        <Link to="/search" className="text-white block mb-3 p-1 hover:bg-gray-800 rounded">
          <CiSearch className="mr-2 inline-block" /> Search
        </Link>
        <Link to="/allSongs" className="text-white block mb-8 p-1 hover:bg-gray-800 rounded">
          <VscLibrary className="mr-2 inline-block" /> All Songs
        </Link>
        {/* <Link to="/new-playlist" className="text-white block mb-3 p-1 hover:bg-gray-800 rounded">
          <MdPlaylistAdd className="mr-2 inline-block" /> New Playlist
        </Link> */}
        <Link to="/yourSongs" className="text-white block mb-3 p-1 hover:bg-gray-800 rounded">
          <PiMusicNoteSimpleFill className="mr-2 inline-block" /> Your Songs
        </Link>
        <Link to="/uploadSong" className="text-white block mb-3 p-1 hover:bg-gray-800 rounded">
          <FaCloudUploadAlt className="mr-2 inline-block" /> Upload a Song
        </Link>
      </div>
      <div>
        <Link to="/profile" className="text-white block mb-3 p-1 hover:bg-gray-800 rounded">
          <CgProfile className='mr-2 inline-block' />Profile
        </Link>
        <div className="text-white block mb-3 p-1 hover:bg-gray-800 rounded cursor-pointer" onClick={onLogOut}>
          <IoIosLogOut className='mr-2 inline-block' />Logout
        </div>

      </div>
    </div>
  );
};

export default Sidebar;
