import { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import RecentCard from "./RecentCard";
import { useNavigate } from "react-router-dom";

const Search = () => {
    const navigate=useNavigate()
    const [search, setSearch] = useState(null);
    const [songs, setSongs] = useState();
    const loggedInUser=localStorage.getItem("user")
    
    useEffect(()=>{
        if(!loggedInUser){
            navigate("/")
        }
    })

    const handleChange = (e) => {
        setSearch(e.target.value)
    }

    useEffect(() => {
        const getSongs = async () => {
            const response = await fetch("http://localhost:3000/searchResult", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ search: search })
            })
            const data = await response.json();
            console.log(data)
            if (response.ok) {
                setSongs(data.songs)
            }
        }
        getSongs();
    }, [search])

    return loggedInUser &&  (
        <div className="bg-black text-white flex ">
            <Sidebar />
            <div className="p-7 w-full ml-40 min-h-screen">
                <input
                    type="text"
                    onChange={handleChange}
                    value={search}
                    className="text-white m-2 p-3 h-10 w-full rounded focus:outline-none bg-gray-800 placeholder-gray-500 text-m"
                    placeholder="Search By title, artist, genre, lyrics etc...."
                />
                <h3 className="m-3 text-2xl font-bold">Search Results</h3>
                
                <div className="flex  justify-evenly flex-wrap space-y-4">
                    {songs && songs.map((song) => (
                        <RecentCard song={song} />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Search;