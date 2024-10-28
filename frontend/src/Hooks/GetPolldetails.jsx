import React, { useEffect } from 'react'
import { toast } from 'sonner';
import { setOptions, setQuestion, setuserChoice } from '../redux/pollSlice';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';

const GetPolldetails = () => {
    const dispatch=useDispatch();
    const {user}=useSelector(state=>state);
    const {id}=useParams();
    console.log(id);
    useEffect(() => {
      const getdetails=async()=>{
        try {
            const response = await axios.get(`http://localhost:3000/poll/find/${id}`,{
                withCredentials:true
              });
              if(response.data.success){
                let {poll}=response.data;
                dispatch(setQuestion(poll.question));  
                dispatch(setOptions(poll.options));    
                dispatch(setuserChoice(poll.userChoice));
            // 6717b73e587b0c26005c2ed3
              }
        } catch (error) {
            toast.error(error.response?.data?.message || error.message);
        }
      }
      getdetails();
    
    }, [user?.choicesId,dispatch,id])
    
  return  null;
  
}

export default GetPolldetails
