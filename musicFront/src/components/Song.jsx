import Sidebar from "./Sidebar";
import { useLocation } from "react-router-dom";
import SongContent from "./SongContent";

const Song=()=>{
    const location=useLocation();
    const song=location.state; 
    return(
        <div >
            <Sidebar></Sidebar>
            <SongContent song={song}></SongContent>
        </div>
    )
}
export default Song;