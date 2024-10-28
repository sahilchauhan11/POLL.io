import React, { useEffect } from 'react'
import Navbar from './navbar'
import { Outlet, useNavigate } from 'react-router-dom'
import Footer from './Footer'

import { getSocket } from '../socket.js'
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
  
  
   
     
      socket.on("connect", () => {
        console.log("Socket connected with id:", socket.id);
   
      });
  
      socket.on("disconnect", () => {
        console.log("Socket disconnected");
      
      });
  
      // Handle cleanup
      return () => {
        socket.off("connect");  // Clean up the event listener
        socket.off("disconnect"); // Clean up the event listener
      };
    }
  , [userInfo, navigate, socket]);
  

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

