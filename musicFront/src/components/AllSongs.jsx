import { useEffect, useState } from "react";
import RecentCard from "./RecentCard";
import Sidebar from "./Sidebar";
import { useNavigate } from "react-router-dom";

const AllSong = () => {
    const navigate = useNavigate()
    const [songs, setSongs] = useState("");
    const loggedInUser = localStorage.getItem("user") 

    useEffect(() => {
        if (!loggedInUser) {
            navigate("/")
        }
    }, [])


    useEffect(() => {
        if (!loggedInUser) {
            return;
        }
        const getSongs = async () => {
            const response = await fetch("http://localhost:3000/allSongs", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify()
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
    })

    return   (
        <div className="flex">
            <Sidebar />
            <div className=" bg-black text-white p-4  ml-40 min-h-screen w-screen">
                <h2 className="m-3 text-2xl font-bold">All Songs</h2>
                <div className="flex flex-wrap justify-evenly">
                    {songs && songs.map((song) => (
                        <div className="p-4">
                            <RecentCard song={song} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
export default AllSong;