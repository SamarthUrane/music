
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; 
const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();

      if (response.ok == true) {  
        localStorage.setItem("user",JSON.stringify(data))  
        navigate('/home')
      }
      else {
        console.error('Login failed');
        document.getElementById('wrongalert').style.visibility="visible";
        setEmail("");
        setPassword("");
        return;
      }

    } catch (error) {
      console.error('Registration failed', error);
    }
  }; 


  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div  className="bg-gray-800 p-5 rounded shadow-md w-full max-w-md"><div id='wrongalert' className="border-red-600 border-2 p-2 bg-red-300 text-red-800 rounded-md shadow-md invisible">
    Wrong Credentials! Enter Valid Details
</div>
        <h2 className="text-4xl font-extrabold text-center text-white mb-6">Audio X</h2>
        <form>
          <div className="mb-6">
            <label className="block text-white text-sm font-semibold mb-2" htmlFor="email">
              email
            </label>
            <input
              className="w-full border-b-2 border-gray-600 focus:border-purple-500 bg-gray-700 rounded py-2 px-3 leading-tight focus:outline-none text-white"
              type="text"
              id="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-6">
            <label className="block text-white text-sm font-semibold mb-2" htmlFor="password">
              Password
            </label>
            <input
              className="w-full border-b-2 border-gray-600 focus:border-purple-500 bg-gray-700 rounded py-2 px-3 leading-tight focus:outline-none text-white"
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
            onClick={handleLogin}
          >
            Login
          </button>
        </form>
        <p className="mt-4 text-gray-400 text-center text-sm">
          Don't have an account? \
          <Link className="text-purple-500 hover:underline" to="/">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
