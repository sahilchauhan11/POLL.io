import React, { useEffect } from 'react'
import { useNavigate, useParams} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setuserChoiceId } from '../redux/userSlice.js'
import axios from 'axios'
import { setOptions, setQuestion, setuserChoice } from '../redux/pollSlice.js'
import io from 'socket.io-client';
import { useSocket } from '../Hooks/SocketContext.jsx'
import GetPolldetails from '../Hooks/GetPolldetails.jsx'


const Poll = () => {
  const dispatch=useDispatch();
  const navigate=useNavigate();
  const { poll } = useSelector(state => state); 
  const socket = useSocket();
  const { choicesId } = useSelector(state => state.user); 
    // 6717b73e587b0c26005c2ed3
    useEffect(() => {
      console.log("working")
      socket.on("pollUpdated",(data)=>{ 
        dispatch(setQuestion(data.question))
        dispatch(setOptions(data.options));
        dispatch(setuserChoice(data.userChoice));
        console.log(poll.options)
      })
      return () => {
        dispatch(setOptions([]));
        dispatch(setQuestion(""));
        dispatch(setuserChoice([]));
        dispatch(setuserChoiceId(""));
        console.log("Poll state has been reset.");
      };
    }, [dispatch,socket]);
  const handleChoiceClick = async (choiceId) => {
    try {
      if(choiceId==choicesId){
        return ;
      }
      
      const response = await axios.get(`http://localhost:3000/choice/${choiceId}`,{
        withCredentials:true
      });
      let {poll}=response.data;
      console.log(poll)
      if (response.data.success) {
        console.log(choicesId)
        dispatch(setuserChoiceId(choiceId)); 
        dispatch(setQuestion(poll.question))
        dispatch(setOptions(poll.options));
        dispatch(setuserChoice(poll.userChoice));
        // Emitting the choice to the server
        
      }
    } catch (error) {
      console.error("Error updating choice:", error);
    }
  };
  if (!poll.question) {
    return <div className='text-4xl font-bold text-gray-400'>No poll data available.</div>; 
  }
  
  return (
    <><GetPolldetails/>
    <div className='w-1/2 h-[90%] rounded-xl flex flex-col justify-between items-center p-5 bg-gray-950 text-white '>
     <h1 className='w-full h-[20%] text-3xl font-semibold text-white'>{poll?.question}</h1>
     
     <div className='w-full  font-semibold h-[80%] flex flex-col justify-start py-4 gap-4'>{
      poll?.options?.map((item)=>{
      
        return <div  key={item._id}  onClick={() => handleChoiceClick(item._id)} className={`w-full flex justify-between text-xl px-3 py-5 ${choicesId&&choicesId==item?._id?"bg-green-500":"bg-gray-600"} font-light rounded-md`}>{}{item?.choice} <span>{item?.votes?.length}</span></div>
     
      })}
      </div>
     
    </div></>
  )
}

export default Poll
