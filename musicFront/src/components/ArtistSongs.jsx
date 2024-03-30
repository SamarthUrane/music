import { useEffect, useState } from "react";
import RecentCard from "./RecentCard";
import Sidebar from "./Sidebar"; 
import { useLocation } from "react-router-dom";

const ArtistSongs = () => { 
    const [songs, setSongs] = useState("");
    const location=useLocation();
    const artist=location.state; 

    useEffect(() => {
        const getSongs = async () => {
            const response = await fetch("http://localhost:3000/yourSongs", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ userName:artist })
            });

            const data = await response.json();
            console.log(data.songs);
            if (response.ok) {
                setSongs(data.songs);
            }
            else {
                console.log("Response failed")
            }
        }
        getSongs()
    },[])

    return  (
        <div className="flex">
            <Sidebar />
            <div className=" bg-black text-white p-4 w-full ml-40 min-h-screen">
                <h2 className="m-3 text-2xl font-bold">{artist} Songs</h2>
                <div className="flex justify-around">
                    {songs && songs.map((song) => (
                        <div className="  p-3 rounded border-gray-600">
                            <RecentCard song={song} /> 
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
export default ArtistSongs;