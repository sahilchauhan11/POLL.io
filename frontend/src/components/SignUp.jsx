import React, { useEffect, useState } from 'react'
import { Link,useNavigate } from 'react-router-dom'
import axios from"axios"
import { toast } from 'sonner';
import { useDispatch, useSelector } from 'react-redux';
import { setuserInfo } from '../redux/userSlice';
const SignUp = () => {
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const [loading, setLoading] = useState(false)
    const [input, setinput] = useState({
        username: "",
        email: "",
        password: ""
    })
    const {userInfo}=useSelector(state=>state.user)
  useEffect(() => {
    if(userInfo){
        navigate("/")
    }
  
    
  }, [])
  

    const changeUsernameHandler = (e) => {
        setinput({ ...input, username: e.target.value })
       
    }

    const changeEmailHandler = (e) => {
        setinput({ ...input, email: e.target.value })
       
    }

    const changePasswordHandler = (e) => {
        setinput({ ...input, password: e.target.value })
       
    }
    const submitForm = async (e) => {
        e.preventDefault();
        setLoading(true);
        // Add your form submission logic here
        try {

            const response = await axios.post("http://localhost:3000/user/register", input, {
                headers: {
                    "Content-Type": "application/json"
                }, withCredentials: true
            })
            if (response.data.success) {
                let {user}=response.data;
                dispatch(setuserInfo(user));
                toast.success("Account Created")
                navigate("/")
               
            }else{
                toast.warning(response.data.message)
            }


        } catch (error) {
            toast.error(error.message)
           


        } finally {
            setLoading(false);
            setinput({
                username: "",
                email: "",
                password: ""
            });
        }
    }
    // className='h-[50%] flex flex-col gap-10'
    return (
        <div className='  w-[100vw] bg-gray-700 h-[100vh] gap-2 flex flex-col  items-center justify-center '>
        <div className='w-[80%] text-center text-4xl  text-white font-bold font-serif'>SignUp</div>
      <form onSubmit={submitForm} className='flex justify-between flex-col items-center py-9 gap-10 bg-slate-600 w-[60vh] px-2 h-[70%] shadow-2xl shadow-black rounded-lg '>
               
               <div className='h-[70%] flex flex-col gap-10'>
               <div className='flex justify-between px-3 gap-2  w-full '>
                    <span className='text-2xl font-bold text-gray-800'>Username:</span>
                    <input type="text" onChange={(e) => { changeUsernameHandler(e) }} value={input.username} name="username" className='bg-slate-400 rounded-md w-fit ' placeholder='Enter Your Username' />
                </div>
                <div className='flex justify-between gap-2 w-full px-3'>
                    <span className='text-2xl font-bold text-gray-800'>Email:</span>
                    <input type="email" onChange={changeEmailHandler} value={input.email} name="Email" className='bg-slate-400 rounded-md w-fit' placeholder='Enter Your Email' />
                </div>
                <div className='flex justify-between gap-2  w-full px-3'>
                    <span className='text-2xl font-bold text-gray-800'>password:</span>
                    <input type="text" onChange={changePasswordHandler} value={input.password} name="password" className='bg-slate-400 rounded-md w-fit' placeholder='Enter Your password' />
                </div>
               </div>
                <button className='hover:bg-blue-500 py-1 text-2xl rounded-lg w-[50%]' type="submit"> Submit</button>
                
            </form>
<div className='text-white font-thin'>already have an account,<Link className='text-blue-600' to={"/login"}>login</Link></div>
        </div>
    )
}

export default SignUp
