import React from 'react'
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const IsAuthenticate = ({children}) => {
  const {userInfo}=useSelector(state=>state.user)
  const navigate=useNavigate();
  useEffect(() => {
    if(!userInfo){
navigate("/login")
    }
  
    return () => {
      
    }
  }, [])
  
return (
 <>{children}</>
)
}

export default IsAuthenticate

