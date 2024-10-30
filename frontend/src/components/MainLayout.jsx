import React, { useEffect } from 'react'
import Navbar from './navbar'
import { Outlet, useNavigate } from 'react-router-dom'
import Footer from './Footer'

import { useDispatch, useSelector } from 'react-redux'
import { useSocket } from '../Hooks/SocketContext.jsx'
const MainLayout = () => {
  const navigate = useNavigate();
  const socket = useSocket();
  const { userInfo } = useSelector((state) => state.user);
  useEffect(() => {
    // Redirect to login if not authenticated
    if (!userInfo) {
      navigate("/login");
      return;
    }
  
    if (socket && !socket.connected) {
      socket.connect();
    }
   
     
      socket.on("connect", () => {
        
   
      });
  
      socket.on("disconnect", () => {
     
      
      });
  
      // Handle cleanup
      return () => {
        socket.off("connect");  // Clean up the event listener
        socket.off("disconnect"); // Clean up the event listener
      };
    }
  ,  [userInfo, socket, navigate]);

  return (
    <div>
      <div className='h-[10vh]'><Navbar></Navbar></div>
      <div className='h-[80vh] bg-slate-700 flex justify-center items-center'>
      <Outlet/>
      </div>
      <div className='h-[10vh] '><Footer/></div>
      
    </div>
  )
}

export default MainLayout

