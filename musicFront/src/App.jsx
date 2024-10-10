// App.jsx
import React from 'react'; 
import { Routes, Route, Navigate } from 'react-router-dom'; 
import Register from './components/Register';
import Home from './components/Home';
import Login from './components/Login'; 
import YourSong from './components/YourSongs';
import Search from './components/Search';
import SongForm from './components/SongForm';
import GenreSongs from './components/GenreSongs';
import Song from './components/Song';
import { useEffect, useState } from "react";
import { MyContext } from './components/myContext';
import ArtistSongs from './components/ArtistSongs';
import AllSong from './components/AllSongs';
import Profile from './components/Profile';

const App = () => {  
  const [playingSong,setplayingSong]=useState("null");

  return (
    <>
      {/* Common layout or components that appear on all pages */} 
      <MyContext.Provider value={{ playingSong, setplayingSong }}>
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/uploadSong" element={<SongForm />} />
        <Route path="/yourSongs" element={<YourSong />} />
        <Route path="/genreSongs" element={<GenreSongs />} />
        <Route path="/search" element={<Search />} />
        <Route path="/song" element={<Song />} />
        <Route path="/artistSongs" element={<ArtistSongs />} />
        <Route path="/allSongs" element={<AllSong />} />
      </Routes> 
      </MyContext.Provider>
    </>
  );
};

export default App;
