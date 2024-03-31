import React from 'react';
// import Sidebar from './Sidebar';
// import ArtistCard from './ArtistCard';
// import { useEffect } from 'react'; 
// import { useNavigate } from 'react-router-dom'; 

const Profile = () => {
    // const navigate=useNavigate() 
    // const loggedInUser=localStorage.getItem("user")
    // useEffect(()=>{
    //     console.log(localStorage.getItem("user"))
    //     if(!loggedInUser){
    //         console.log(localStorage.getItem("user"))
    //         navigate("/")
    //     }
    // },[])

    // const userName =  loggedInUser?JSON.parse(localStorage.getItem("user")).user.username:''
    // const usermail = loggedInUser?JSON.parse(localStorage.getItem("user")).user.email :""
    // const profile = loggedInUser?JSON.parse(localStorage.getItem("user")).user.profile :"" 
    

    // const src1 = "https://imgs.search.brave.com/mR-qTglzpGl8uw83n_ErbMNuZKXcqnfulrRGN17nsn0/rs:fit:860:0:0/g:ce/aHR0cHM6Ly93YWxs/cGFwZXJzLmNvbS9p/bWFnZXMvZmVhdHVy/ZWQvY29vbC1wcm9m/aWxlLXBpY3R1cmUt/ODdoNDZnY29iamw1/ZTR4dS5qcGc"
    // const artistName1 = "Chopper"
    // const src2 = "https://imgs.search.brave.com/zFEto9Q99_Qeyub5eiZ3Cr_Ef9A5t09wlNDgQV__9XQ/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9jZG4u/cGl4YWJheS5jb20v/cGhvdG8vMjAxNS8w/My8wMy8wOC81NS9w/b3J0cmFpdC02NTcx/MTZfNjQwLmpwZw"
    // const artistName2 = "Robin"

    // return usermail && (
    //     <div className='flex flex-wrap'>
    //         <Sidebar></Sidebar>
    //         <div className="flex flex-col items-center  p-8 bg-black text-white flex-1 ml-40 min-h-screen"> 
    //             <div className="mb-4 flex flex-col items-center">
    //                  <img
    //                         src={profile}
    //                         alt="User Profile"
    //                         className="rounded-full w-1/3 object-cover mb-2 border-4 border-white"
    //                     />
    //                 <p className="text-lg font-semibold">{userName}</p>
    //                 <p className="text-gray-500">{usermail}</p>
    //             </div>
    //             <div className="w-full">
    //                 <h2 className="text-2xl font-semibold mb-4">Favorite Artists</h2>
    //                 <div className="flex flex-wrap space-x-4">
    //                     <ArtistCard src={src1} artistName={artistName1}></ArtistCard>
    //                     <ArtistCard src={src2} artistName={artistName2}></ArtistCard>
    //                 </div>
    //             </div>
    //         </div>
    //     </div>
    // );
    return (
        <div>newprofile</div>
    );
};

export default Profile;
