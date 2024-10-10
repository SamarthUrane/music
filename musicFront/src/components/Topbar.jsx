import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { getUrl } from "./s3Op";

const Topbar = () => {

  const user = JSON.parse(localStorage.getItem("user")).user;
  const [profileImage, setProfileImage] = useState(null);

  useEffect(() => {
    getAwsData();
  }, [])
  const getAwsData = async () => {
    const profileI = await getUrl(user.profile)
    setProfileImage(profileI);
  }

  return (

    <div className="flex flex-wrap justify-between">
      <div className="flex align-center text-lg font-bold ">
        Welcome, {user.username}
      </div>
      <div>
        <Link to="/profile">
          <img
            className="rounded-full w-12"
            src={profileImage}
            alt="user-avatar"
          ></img>
        </Link>
      </div>
    </div>
  );
};

export default Topbar;
