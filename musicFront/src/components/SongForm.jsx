// SongForm.js
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Sidebar from './Sidebar';

const SongForm = () => {

    const navigate = useNavigate();

    const loggedInUser = localStorage.getItem("user")

    useEffect(() => {
        if (!loggedInUser) {
            navigate("/")
        }
    })

    const [formData, setFormData] = useState({
        title: '',
        lyrics: '',
        genre: '',
        artist:JSON.parse(localStorage.getItem("user")).user.username,
        file: '',
        thumbnail: '',
    });
    const genres = ["Rap", "Pop", "WorkOut", "Classical", "Folk", "Poetic", "Rock", "Lofi", "Traveling", "Sad", "Romantic", "Dance"];

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(formData)
        
        const response = await fetch("http://localhost:3000/uploadSong", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ formData: formData, uploadedBy:JSON.parse(localStorage.getItem("user")).user.username})
        })

        const data = await response.json();
        if (response.ok) {
            console.log("SUCCESS")
        }
        else {
            console.log("FAILED")
        }
        
        setFormData({
            title: '',
            lyrics: '',
            genre: '',
            artist:JSON.parse(localStorage.getItem("user")).user.username,
            file: '',
            thumbnail: ''
        });
    };
    const handleFileChange = (e) => {
        const { id, files } = e.target;
        const file = files[0];

        setFormData({
            ...formData,
            [id]: file
        });
    };

    return loggedInUser && (
        <div className='flex'>
            <Sidebar />
            <div className="bg-black min-h-screen flex flex-col flex-1 items-center justify-center ">
                <form onSubmit={handleSubmit} className="max-w-md w-full bg-gray-900 p-8 rounded shadow-lg">
                    <h2 className="text-2xl font-semibold text-gray-300 mb-8">Add a New Song</h2>
                    <div className="mb-4">
                        <label htmlFor="title" className="block text-gray-300">Title</label>
                        <input type="text" id="title" name="title" value={formData.title} onChange={handleChange} className="w-full mt-1 px-4 py-2 rounded bg-gray-800 text-gray-300 focus:outline-none focus:border-blue-500" required />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="lyrics" className="block text-gray-300">Lyrics</label>
                        <input type="text" id="lyrics" name="lyrics" value={formData.lyrics} onChange={handleChange} className="w-full mt-1 px-4 py-2 rounded bg-gray-800 text-gray-300 focus:outline-none focus:border-blue-500" required />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="genre" className="block text-gray-300">Genre</label>
                        <select id="genre" name="genre" value={formData.genre} onChange={handleChange} className="w-full mt-1 px-4 py-2 rounded bg-gray-800 text-gray-300 focus:outline-none focus:border-blue-500" required>
                            <option value="">Select a genre</option>
                            {genres.map((genre) => (
                                <option key={genre} value={genre}>{genre}</option>
                            ))}
                        </select>
                    </div>

                    <div className="mb-4">
                        <label htmlFor="artist" className="block text-gray-300">Artist</label>
                        <input id="artist" type="text" name="artist" value={formData.artist} onChange={handleChange} className="w-full mt-1 px-4 py-2 rounded bg-gray-800 text-gray-300 focus:outline-none focus:border-blue-500" required />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="file" className="block text-gray-300">File</label>
                        <input type="text" id="file" name="file" value={formData.file} onChange={handleChange} className="w-full mt-1 px-4 py-2 rounded bg-gray-800 text-gray-300 focus:outline-none focus:border-blue-500" required />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="thumbnail" className="block text-gray-300">Thumbnail</label>
                        <input type="text" id="thumbnail" name="thumbnail" value={formData.thumbnail} onChange={handleChange} className="w-full mt-1 px-4 py-2 rounded bg-gray-800 text-gray-300 focus:outline-none focus:border-blue-500" required />
                    </div>
                    <div className="mb-6">
                        <button type="submit" className="w-full px-4 py-2 rounded bg-blue-500 text-white font-semibold hover:bg-blue-600 focus:outline-none focus:bg-blue-600">Submit</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SongForm;
