import { useState } from 'react'

import {Toaster} from 'sonner'

import './App.css'
import { Route, Routes } from 'react-router-dom'
import UserProtected from './protected/userProtected'
import Signup from './pages/signup'
import Login from './pages/login'
import Home from './pages/Home'
import SessionDashboard from './pages/sessionDashboard'
import HostPage from './pages/hostPage'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Toaster/>
      <Routes>
        <Route path='/' element={<Login/>}></Route>
        <Route path='/register' element={<Signup/>}></Route>
        <Route path='/home' element={<UserProtected><Home/></UserProtected>}></Route>
        <Route path='/session' element={<UserProtected><SessionDashboard/></UserProtected>}></Route>
                <Route path='/host' element={<UserProtected><HostPage/></UserProtected>}></Route>
      </Routes>
    </>
  )
}

export default App
