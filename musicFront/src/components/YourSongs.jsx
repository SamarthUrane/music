import { useEffect, useState } from "react";
import RecentCard from "./RecentCard";
import Sidebar from "./Sidebar";
import { useNavigate } from "react-router-dom";
import { deleteUrl } from "./s3Op";

const YourSong = () => {
    const navigate = useNavigate()
    const [songs, setSongs] = useState("");
    const loggedInUser = localStorage.getItem("user")
    const [refreshSongs, setRefreshSongs] = useState(false);

    useEffect(() => {
        if (!loggedInUser) {
            navigate("/")
        }
    }, [])

    const userName = loggedInUser ? JSON.parse(localStorage.getItem("user")).user.username : ''

    useEffect(() => {
        if (!loggedInUser) {
            return;
        }
        const getSongs = async () => {
            const response = await fetch("http://localhost:3000/yourSongs", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ userName })
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
    }, [refreshSongs])


    const handleDelete = async (e) => {

        if (window.confirm("Do you really want to delete the song?")) {
            const id = e.target.name;
            const response = await fetch("http://localhost:3000/deleteSong", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ id: id })
            })
            const data = await response.json(); 
            console.log(data.songs);
            if (response.ok) { 
                console.log(data.song+"data")
                const deleteSong = await deleteUrl(data.song.file) 
                const deleteThumbnail = await deleteUrl(data.song.thumbnail) 
                console.log(deleteSong+"deleteSOng")
                console.log("DELETED")

                setRefreshSongs(prevState => !prevState);
            }
            else {
                console.log("FAILED TO DELETE")
            }
        }
    }

    return loggedInUser && (
        <div className="flex">
            <Sidebar />
            <div className=" bg-black text-white p-4 w-full ml-40 min-h-screen">
                <h2 className="m-3 text-2xl font-bold">Your Songs</h2>
                <div className="flex justify-around flex-wrap space-y-4">
                    {songs && songs.map((song) => (
                        <div className="border-2 p-3 rounded border-gray-800">
                            <RecentCard song={song} />
                            <button type="button" className="focus:outline-none text-white bg-red-700 hover:bg-red-800  font-medium rounded-lg text-sm px-3 py-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900 mt-2 ml-24" name={song._id} onClick={handleDelete}>Delete</button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
export default YourSong;