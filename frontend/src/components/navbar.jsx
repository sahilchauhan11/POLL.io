import { Button } from 'bootstrap';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { setQuestion,setOptions,setuserChoice } from '../redux/pollSlice.js';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { setuserChoiceId, setuserInfo } from '../redux/userSlice.js';
import { toast, Toaster } from 'sonner';
import { io } from 'socket.io-client';

const Navbar = () => {

  const polli=useSelector(state=>state.poll)
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [PollId, setPollId] = useState("");
  const pollredux=useSelector(state=>state.poll);
  const changeId=(e)=>{
    setPollId(e.target.value);
   
  }
  
  const submitPollId= async()=>{
    try {
      const response = await axios.get(`http://localhost:3000/poll/find/${PollId}`,{
        withCredentials:true
      });
      if(response.data.success){
        let {poll}=response.data;
        dispatch(setQuestion(poll.question));  
        dispatch(setOptions(poll.options));    
        dispatch(setuserChoice(poll.userChoice));
    // 6717b73e587b0c26005c2ed3
        toast.success(`poll found share this id ${poll?._id}`);
        navigate(`poll/${poll._id}`)


      }else{
        toast.warning(response.data.message)
      }

    } catch (error) {
      toast.error(error.message)
    }
    finally{
      setPollId("");
    }
  }
  const logOut= async()=>{
    
    try {
      const response = await axios.get(`http://localhost:3000/user/logout`,{
        withCredentials:true
      });
      console.log(response);
      if(response.data.success){
      
        dispatch(setQuestion(null));  
        dispatch(setOptions([]));    
        dispatch(setuserChoice([]));
        dispatch(setuserChoiceId(""))
        dispatch(setuserInfo(null))
        toast.success("logout succesfully")
        navigate(`/login`)


      }
      else{
        toast.warning(response.data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
    
  }
 
  return (
    <nav className='w-[100%] bg-slate-900 h-[100%] flex justify-between box-border px-2'>
      <div className='font-mono text-gray-500 font-extrabold text-3xl h-full w-[20%] flex items-center justify-center hover:text-white'>PollIo</div>
      <ul className='list-none flex justify-around gap-3  w-[70%]'>
        <li className='w-[40%]  font-thin text-sm h-full flex items-center text-white'>
          <input onChange={(e)=>{
            changeId(e);
          }}  type="text" value={PollId} className='bg-slate-600 w-[80%] h-[60%] rounded-lg px-1' placeholder='Find Poll' />
          <button
    onClick={submitPollId}
    className='bg-blue-500 text-white rounded-lg px-3 ml-2'
  >
    Submit
  </button>
          </li>
        
        <li className='font-mono text-gray-500 font-extrabold  h-full flex items-center hover:text-white justify-center'>Contact Us</li>
        
        <li className=' flex flex-col ' >
        <button className='font-mono text-gray-500 font-extrabold  h-full flex items-center hover:text-white justify-center text-xl' onClick={()=>navigate("/create/poll")}>create poll</button>
        <button className='font-mono text-gray-500 font-extrabold  h-full flex items-center hover:text-white justify-center text-xl rounded-lg hover:bg-red-600'onClick={()=>{
          logOut()
        }}>LogOut</button></li>
      </ul>
      
    </nav>
  )
}

export default Navbar
