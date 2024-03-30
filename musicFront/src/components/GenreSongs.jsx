import { useEffect, useState } from "react";
import RecentCard from "./RecentCard";
import Sidebar from "./Sidebar"; 
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const GenreSongs = () => {
    const location=useLocation(); 
    const navigate=useNavigate();

    const loggedInUser=localStorage.getItem("user")
    
    useEffect(()=>{
        if(!loggedInUser){
            navigate("/")
        }
    })

    const genre=loggedInUser?location.state.genre:"";
    const [songs, setSongs] = useState(""); 

    useEffect(() => {
        const getSongs = async () => {
            const response = await fetch("http://localhost:3000/genreSongs", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ genre })
            });
            const data = await response.json(); 
            if (response.ok) {
                setSongs(data.songs);
            }
            else {
                console.log("Response failed")
            }
        }
        getSongs()
    }, [])

    return loggedInUser && (
        <div className="flex">
            <Sidebar />
            <div className=" bg-black text-white w-full p-7 ml-40 min-h-screen">
                <h2 className="m-7 text-2xl font-bold">{genre} Songs</h2>
                <div className="flex justify-around">
                    {songs && songs.map((song) => (
                        <RecentCard song={song} />
                    ))}
                </div>
            </div>
        </div>
    )
}
export default GenreSongs;