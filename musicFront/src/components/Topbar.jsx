import React from "react";
import { Link } from "react-router-dom";  

const Topbar = () => {   
  
  const user=JSON.parse(localStorage.getItem("user")).user;
  return (
    <div className="flex flex-wrap justify-between">
      <div className="flex align-center text-lg font-bold ">
        Welcome, {user.username}
      </div>
      <div>
        <Link to="/profile">
          <img
            className="rounded-full w-12"
            src={user.profile}
            alt="user-avatar"
          ></img>
        </Link>
      </div>
    </div>
  );
};

export default Topbar;
