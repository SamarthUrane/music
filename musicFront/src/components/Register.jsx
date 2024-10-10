// Register.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getPresignedUrl } from './s3Op';
import { uploadFileToS3 } from './s3Op';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [profile, setProfile] = useState(null);
  const [profileData,setProfileData]=useState('')
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = async () => {
    if (!profile) {
        console.error('No profile picture selected');
        return;
    }

    try {
        // Accessing file name and type directly from the profile state object
        const fileName = profileData.name;  // Get the file name
        const fileType = profileData.type;  // Get the file type

        // Get the pre-signed URL using the file name and type
        const url = await getPresignedUrl(profile, fileType);
        await uploadFileToS3(profile, url);  // Upload the file

        console.log("File uploaded successfully:", fileName +profile + " "+fileType);
        
        // Pass the file name to the server as part of the user registration
        const profilePhotoName = fileName;
        console.log(url + "url "+ "profilePhotoName" + profilePhotoName);

        const response = await fetch('http://localhost:3000/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, email, password, profilePhotoName }),
        });

        const data = await response.json();

        if (!response.ok) {
            console.error('Registration failed');
            setUsername("");
            setPassword("");
            setEmail("");
            setProfile(null);
            return;
        }

        localStorage.setItem("user", JSON.stringify(data));
        navigate('/home');
    } catch (error) {
        console.error('Error during registration:', error);
    }
};



const handleFileChange = (e) => {
  const { id, files } = e.target;
        const file = files[0]; 
  if (file) {
      setProfile(file);  // Set the selected file to the profile state
      setProfileData({
        name:file.name,
        type:file.type
      })
      console.log("Selected file:", file.name, file.type); // For debugging purposes
  }
};


  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="bg-gray-800 p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-6 text-center text-white">Register</h2>
        <form>
          <div className="mb-4">
            <label className="block text-white text-sm font-semibold mb-2" htmlFor="username">
              Username
            </label>
            <input
              className="w-full border-b-2 border-purple-600 focus:border-purple-700 bg-gray-700 rounded py-2 px-3 leading-tight focus:outline-none"
              type="text"
              id="username"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-white text-sm font-semibold mb-2" htmlFor="email">
              Email
            </label>
            <input
              className="w-full border-b-2 border-purple-600 focus:border-purple-700 bg-gray-700 rounded py-2 px-3 leading-tight focus:outline-none"
              type="email"
              id="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-4">
                        <label htmlFor="file" className="block text-gray-300">Profile</label>
                        <input
                            type="file"
                            id="profile"
                            name="profile"
                            onChange={handleFileChange}  // Call handleFileChange when the user selects a file
                            className="w-full mt-1 px-4 py-2 rounded bg-gray-800 text-gray-300 focus:outline-none focus:border-blue-500"
                            required
                        />
                    </div> 
          <div className="mb-6">
            <label className="block text-white text-sm font-semibold mb-2" htmlFor="password">
              Password
            </label>
            <input
              className="w-full border-b-2 border-purple-600 focus:border-purple-700 bg-gray-700 rounded py-2 px-3 leading-tight focus:outline-none"
              type="password"
              id="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline"
            type="button"
            onClick={handleRegister}
          >
            Register
          </button>
        </form>
        <p className="mt-4 text-gray-400 text-center text-sm">
          Already have an account? \
          <Link className="text-purple-500 hover:underline" to="/login">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
