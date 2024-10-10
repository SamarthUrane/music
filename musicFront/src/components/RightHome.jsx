
import Topbar from "./Topbar";
import Recent from "./Recent";
import GenreCard from "./genreCard";
import ArtistCard from './ArtistCard';
import { useState,useEffect } from "react";

const RightHome= ()=>{ 
    const [artists,setArtist]=useState([]);
    const genres=[{
        name:"Rap",
        thumbnail:"https://imgs.search.brave.com/KizdcDE9Wzs1OzyUOV4cQPpns0APtiPOQF13qCv4lGc/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMudW5zcGxhc2gu/Y29tL3Bob3RvLTE1/MDU5NjQxMzUwNDUt/Y2RhZGEyZjZiZjQz/P3E9ODAmdz0xMDAw/JmF1dG89Zm9ybWF0/JmZpdD1jcm9wJml4/bGliPXJiLTQuMC4z/Jml4aWQ9TTN3eE1q/QTNmREI4TUh4elpX/RnlZMmg4Tkh4OGNt/RndKVEl3WTI5dVky/VnlkSHhsYm53d2ZI/d3dmSHg4TUE9PQ"
    },{
        name:"Pop",
        thumbnail:"https://imgs.search.brave.com/0Sq9a6Q4d30Xk2MCX69nl2ODFRammziXIfPC3ICqDps/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvODg3/MjgwODk2L3Bob3Rv/L3JldHJvLW11c2lj/LWJhY2tncm91bmQu/anBnP3M9NjEyeDYx/MiZ3PTAmaz0yMCZj/PTA3Yk5qVnIxT3g3/a2RhQ0Roc2wxVjhT/UGdwZVdhRzQ1ZURf/NHF0VHp3VEE9"
    },{
        name:"WorkOut",
        thumbnail:"https://imgs.search.brave.com/_Z3MX8YPaIQmvS7H_vMrUmrjlxHNvHeb8V3vk7-CMIA/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/ZnJlZS1waG90by93/ZWlnaHRzLWV4ZXJj/aXNlLXdlaWdodGxp/ZnRlci1zdHJvbmct/YXRobGV0aWNfMTEz/OS03MDkuanBnP3Np/emU9NjI2JmV4dD1q/cGc"
    },{
        name:"Classical",
        thumbnail:"https://imgs.search.brave.com/cBDN4Y1eYYP_C-_OAqvlRaV8qmz2YW7CbxR_xc_DONo/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9sZWFy/bi5wb2RpdW0uc2No/b29sL3dwLWNvbnRl/bnQvdXBsb2Fkcy8y/MDIzLzExL2luZGlh/bi1tdXNpY2FsLWlu/c3RydW1lbnQtc2l0/YXItMTUzNngxMDI1/LTEtMTAyNHg2ODMu/anBn"
    },{
        name:"Folk",
        thumbnail:"https://imgs.search.brave.com/QOAQnE8YMovgDrWRxLDVc-EZIGA7U8Jchudms1keEEw/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9kMnJk/aHhmb2Y0cW1iYi5j/bG91ZGZyb250Lm5l/dC93cC1jb250ZW50/L3VwbG9hZHMvMjAy/MDA5MDMxNDAyMTMv/aVN0b2NrLTUwNzU3/NzYzMC1zY2FsZWQu/anBn"
    },
    {
        name:"Poetic",
        thumbnail:"https://imgs.search.brave.com/yRuuTUQCIZCziCymdnQk3-dVdLBQNJBV22EN1TtmAec/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvMTQz/OTIwMjQxL3Bob3Rv/L3RoZS1wb2V0Lmpw/Zz9zPTYxMng2MTIm/dz0wJms9MjAmYz0y/cXhKMjRmM0dTYmho/WUZhZHZSRE91YWM3/dThTc09VVElPaWFa/WjNSbV80PQ"
    },{
        name:"Rock",
        thumbnail:"https://imgs.search.brave.com/rTEbtsz6WYplFpZOMm2LhYhwxNu7BNlrpcDLzzzEGZo/rs:fit:860:0:0/g:ce/aHR0cHM6Ly90b3du/c3F1YXJlLm1lZGlh/L3NpdGUvMjk1L2Zp/bGVzLzIwMTIvMDQv/MTAwMi5qcGc_dz05/ODAmcT03NQ"
    },
    {
        name:"Lofi",
        thumbnail:"https://imgs.search.brave.com/UgXi5_9kgcIPgUqg9UI_xgOxtni6ifcs_rNvbIULx7Y/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9jbXMt/YXNzZXRzLnR1dHNw/bHVzLmNvbS9jZG4t/Y2dpL2ltYWdlL3dp/ZHRoPTg1MC91cGxv/YWRzL3VzZXJzLzI2/NTkvcG9zdHMvMzU2/MDgvaW1hZ2UtdXBs/b2FkL2NoaWxsJTIw/bXVzaWMteW91Zy13/b21hbi1pbnRyby5q/cGc"
    },
    {
        name:"Traveling",
        thumbnail:"https://imgs.search.brave.com/ACYrd-e_NtIcElHBmFIHYmZFqnnuHCbVGTOSC8_r0nY/rs:fit:860:0:0/g:ce/aHR0cHM6Ly93d3cu/bXVzaWNncm90dG8u/Y29tL3dwLWNvbnRl/bnQvdXBsb2Fkcy8y/MDIyLzA3L3RyYXZl/bGluZy1vbi1hbi1h/ZHZlbnR1cmUtd2l0/aC1tdXNpYy5qcGc"
    },
    {
        name:"Sad",
        thumbnail:"https://imgs.search.brave.com/QE9FqJN9gnWbzHSofpugzZ4RsmqcpHYmgNh78tyLdXM/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvMTE5/NDYwMTY0Ny9waG90/by90aGF0LXNvbmct/dGhhdC1oYXMtc28t/bXVjaC1mZWVsaW5n/LmpwZz9zPTYxMng2/MTImdz0wJms9MjAm/Yz1QUnhLSVhPTldR/eGtETGdoa2RLLXdY/LXlSNFBFbGdXNGtt/RkdYa1dJbGpJPQ"
    },
    {
        name:"Romantic",
        thumbnail:"https://imgs.search.brave.com/_w1uqvSTOGQh5V8VLMviUaLceIrGs8IKEeNOgpG2HIE/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9seXJp/Y3NtYW1hLmNvbS93/cC1jb250ZW50L3Vw/bG9hZHMvMjAxOS8w/OC9Uby0xMC1Sb21h/bnRpYy1Tb25ncy5q/cGc"
    },
    {
        name:"Dance",
        thumbnail:"https://imgs.search.brave.com/BZy2gEvM1LGI1xpK51cZiU8r8ot9eJNp_PkdIqCJWmQ/rs:fit:860:0:0/g:ce/aHR0cHM6Ly93d3cu/YnJpZGVzLmNvbS90/aG1iL1ZlZEhZSjdZ/cWhRd3dHdDczU2Vx/elRXOFVkVT0vOTAw/eDkwMC9maWx0ZXJz/Om5vX3Vwc2NhbGUo/KTptYXhfYnl0ZXMo/MTUwMDAwKTpzdHJp/cF9pY2MoKS9ncm91/cC1kYW5jaW5nLWF0/LXdlZGRpbmctZ2V0/dHktcmVjaXJjLTA5/MjMtMDk0YzBhYmFk/ODc0NGRmYmI2YzJl/OWEwYjU4N2MwYTIu/anBn"
    }]

    useEffect(()=>{ 
        const getArtist = async () => {
            try {
              const response = await fetch("http://localhost:3000/getArtists", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json"
                }
              });
              const data = await response.json();
              setArtist(data.artistsUsers)
              console.log(data)
            } catch (error) {
              console.error("Error fetching songs:", error);
            }
          };
          getArtist();
    },[])
    
    return artists &&  (
        <div className="bg-black text-white p-7 ml-40">
            <Topbar></Topbar>
            <Recent></Recent>
            <h3 className="text-2xl font-bold  mt-12 ml-5 mb-2">Catogories</h3>
            <div className="flex flex-wrap justify-between p-1 mb-2 sm:gap-x-5 sm:gap-y-10"> 
            {genres.map((genre)=>(
                <GenreCard genre={genre.name} thumbnailName={genre.name+"Thumbnail"}/> 
            ))} 
            </div>

            <h3 className="text-2xl font-bold  mt-14 ml-5 mb-2">Artists</h3>
            <div className="flex flex-wrap justify-between p-1 mb-2 sm:gap-x-5 sm:gap-y-10"> 
            {artists.map((artist)=>(
                <ArtistCard src={artist.profile} artistName={artist.username}/> 
                ))} 
                </div>
            
        </div>
    )
}
export default RightHome;