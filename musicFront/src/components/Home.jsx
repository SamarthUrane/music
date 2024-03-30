import Sidebar from './Sidebar';
import RightHome from './RightHome'; 
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
const Home = () => {
  const navigate = useNavigate();
  const loggedInUser = localStorage.getItem("user")

  useEffect(() => {
    if (!loggedInUser) {
      navigate("/")
    }
  })

  return loggedInUser && (
    <div className='flex bg-black min-h-screen'>
      <Sidebar />
      <RightHome />
    </div>
  );
};

export default Home;
