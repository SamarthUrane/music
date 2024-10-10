import { useNavigate } from "react-router-dom"
import { getUrl } from "./s3Op"
import { useState,useEffect } from "react"; 

const ArtistCard = ({src,artistName}) => {
    const navigate=useNavigate()
    const [profilePhoto,setProfilePhoto]=useState(null)
    useEffect(() => {
        getAwsData();
      }, [])
    
      const getAwsData = async () => { 
        const getProfile = await getUrl(src); 
        setProfilePhoto(getProfile);
      }

    const handleClick=()=>{
        navigate("/artistSongs",{state:artistName})
    }

    return (
        <div className="flex flex-col items-center border-gray-800 border-2 rounded-lg p-4 bg-gray-900 cursor-pointer select-none" onClick={handleClick}>
        <img
            src={profilePhoto}
            alt="Artist"
            className="rounded-lg h-32 w-32 object-cover mb-4 hover:opacity-80"
        />
        <p className="text-lg font-semibold text-white">{artistName}</p>
    </div>

    )
}
export default ArtistCard   