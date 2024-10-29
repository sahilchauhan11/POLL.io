import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { RouterProvider,createBrowserRouter } from 'react-router-dom'
import './App.css'
import Navbar from './components/navbar'
import SignUp from './components/SignUp'
import Login from './components/Login'
import MainLayout from './components/MainLayout'
import Poll from './components/Poll'
import CreatePoll from './components/CreatePoll'
import FoundPoll from './components/FoundPoll'
import { Toaster } from 'sonner'
import IsAuthenticate from './components/IsAuthenticate'
import Homeanim from './components/Homeanim'
import io from 'socket.io-client';
import { getSocket } from './socket'
import { SocketProvider } from './Hooks/SocketContext'

function App() {
  const [count, setCount] = useState(0) 
  


  

  const router=createBrowserRouter([
    {
      path:'/',
      element:<IsAuthenticate><SocketProvider><MainLayout /></SocketProvider></IsAuthenticate>,
      children:[
        {path:'/poll/:id',
          element:<Poll />
        },
        {path:'/',
          element:<Homeanim/>
        },
        {path:'/create/poll',
          element:<CreatePoll />
        },
        {path:'/poll/:id',
          element:<FoundPoll />
        }
      ]
    },
    {
      path:'/login',
      element:<Login /> // Ensure socket is not passed to Login component
    },
    {
      path:'/SignUp',
      element:<SignUp/>
    }
  ])
  return (
    <>
     <RouterProvider router={router} />
     <Toaster />
    </>
  )
}

export default App
