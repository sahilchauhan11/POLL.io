import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setuserChoiceId, setuserInfo } from '../redux/userSlice'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'sonner'

const Login = () => {
    const navigate=useNavigate();
    const dispatch=useDispatch()
    
  const [loading, setLoading] = useState(false)
    const [input, setinput] = useState({
        email: "",
        password: ""
    })
  

    const {userInfo}=useSelector(state=>state.user)
  useEffect(() => {
    if(userInfo){
        navigate("/")
    }
  
    
  }, [userInfo, navigate])

    const changeEmailHandler = (e) => {
        setinput({ ...input, email: e.target.value })
        
    }

    const changePasswordHandler = (e) => {
        setinput({ ...input, password: e.target.value })
        
    }
    const submitForm = async (e) => {
        e.preventDefault();
        
        setLoading(true);
       
        try {
         const response = await axios.post("http://localhost:3000/user/login", input, {
                headers: {
                    "Content-Type": "application/json"
                }, withCredentials: true
            })
                        if (response.data.success) {
               
               let {user}=response.data;

               dispatch(setuserChoiceId(user.choicesId))
               dispatch(setuserInfo(user))
               toast.success("login successful")
               navigate(`/`)
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
  return (
    <div className='  w-[100vw] bg-gray-700 h-[100vh] gap-2 flex flex-col  items-center justify-center '>
      <div className='w-[80%] text-center text-4xl text-white font-bold font-serif'>Login</div>
    <form onSubmit={submitForm} className='flex justify-between flex-col items-center py-9 gap-10 bg-slate-600 w-[60vh] px-2 h-[70%] shadow-2xl shadow-black rounded-lg '>

     <div className='h-[50%] flex flex-col gap-10 '><div className='flex justify-between  w-full px-3'>
                    <span className='text-2xl font-bold text-gray-800'>Email:</span>
                    <input type="email" onChange={changeEmailHandler} value={input.email} name="Email" className='bg-slate-400 rounded-md w-fit' placeholder='Enter Your Email' />
                </div>
                <div className='flex justify-between  w-full px-3'>
                    <span className='text-2xl font-bold text-gray-800'>password:</span>
                    <input type="password" onChange={changePasswordHandler} value={input.password} name="password" className='bg-slate-400 rounded-md w-fit' placeholder='Enter Your password' />
                </div></div>
        <button className='hover:bg-blue-500 py-1 text-2xl rounded-lg w-[50%]' type="submit"> Submit</button>
    </form>
    
<div className='text-white font-thin'>Dont't have an account,<Link className='text-blue-600' to={"/signup"}>signUp</Link></div>

</div>
  )
}

export default Login
