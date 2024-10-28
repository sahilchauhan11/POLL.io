import axios from 'axios'
import React, { useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { setQuestion,setOptions,setuserChoice } from '../redux/pollSlice';
import { toast } from 'sonner';
const CreatePoll = () => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false)
    const [input, setinput] = useState({
       
        question: "",
        choice1: "",
        choice2: "",
        choice3: "",
        choice4: ""
    })
    const changeQuestion = (e) => {
        setinput({ ...input, question: e.target.value })
        
        
    }
    const changeChoice1 = (e) => {
        setinput({ ...input, choice1: e.target.value })
        
    }
    const changeChoice2 = (e) => {
        setinput({ ...input, choice2: e.target.value })
        
    }
    const changeChoice3 = (e) => {
        setinput({ ...input, choice3: e.target.value })
        
    }
    const changeChoice4= (e) => {
        setinput({ ...input, choice4: e.target.value })
        
    }
    const submitForm = async (e) => {
        e.preventDefault();
        setLoading(true);
        // Add your form submission logic here
        try {

            const response = await axios.post("http://localhost:3000/poll/create", {question:input.question,
                options:[input.choice1,input.choice2,input.choice3,input.choice4]
            }, {
                headers: {
                    "Content-Type": "application/json"
                }, withCredentials: true
            })
            console.log(response)
            if (response.data.success) {
                dispatch(setQuestion(response.data.question))
                dispatch(setOptions(response.data.options));
                dispatch(setOptions(response.data.userChoice));
                toast.success(response.data.message)
               
            }else{
                toast.success(response.data.message)
            }


        } catch (error) {
            toast.error(error.message)


        } finally {
            setLoading(false);
            setinput({
                question: "",
                choice1: "",
                choice2: "",
                choice3: "",
                choice4: ""
            });
        }
    }
  return (
    <div className='  w-[100vw] flex items-center justify-center h-[90%]'>
    <form onSubmit={submitForm} className='flex flex-col items-center py-9 gap-10 bg-slate-600 w-[60%] px-2 h-full shadow-2xl shadow-black rounded-lg '>
        <div className='w-full flex justify-center items-center text-2xl font-bold'>Enter Poll Data</div>
        <div className='flex justify-between px-3  w-full '>
            <span className='text-2xl font-bold text-gray-800'>Question:</span>
            <input type="text" onChange={(e) => { changeQuestion(e) }} value={input.question} name="question" className='bg-slate-400 rounded-md w-[70%] ' placeholder='Enter Your Username' />
        </div>
       
        <div className='flex justify-between  w-full px-3'>
            <span className='text-2xl font-bold text-gray-800'>choice1:</span>
            <input type="text" onChange={changeChoice1} value={input.choice1} name="choice1" className='bg-slate-400 rounded-md w-[70%]' placeholder='Enter choice' />
        </div>
        <div className='flex justify-between  w-full px-3'>
            <span className='text-2xl font-bold text-gray-800'>choice2:</span>
            <input type="text" onChange={changeChoice2} value={input.choice2} name="choice2" className='bg-slate-400 rounded-md w-[70%]' placeholder='Enter choice' />
        </div>
        <div className='flex justify-between  w-full px-3'>
            <span className='text-2xl font-bold text-gray-800'>choice3:</span>
            <input type="text" onChange={changeChoice3} value={input.choice3} name="choice3" className='bg-slate-400 rounded-md w-[70%]' placeholder='Enter choice' />
        </div>
        <div className='flex justify-between  w-full px-3'>
            <span className='text-2xl font-bold text-gray-800'>choice4:</span>
            <input type="text" onChange={changeChoice4} value={input.choice4} name="choice4" className='bg-slate-400 rounded-md w-[70%]' placeholder='Enter choice' />
        </div>
        <button className='hover:bg-blue-500 py-1 text-2xl rounded-lg w-[50%]' type="submit"> Submit</button>
    </form>

</div>
  )
}

export default CreatePoll
