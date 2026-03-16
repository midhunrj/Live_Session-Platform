import React,{useState,useEffect, type ReactNode} from 'react'

import {  useNavigate } from 'react-router'
import { useAuthContext } from '../context/authContext'

const UserProtected: React.FC<{ children: ReactNode }>= ({children}) => {
    const navigate=useNavigate()
       const{userAuthenticated}=useAuthContext()    
    useEffect(()=>{
     if(!userAuthenticated)
     {console.log("ss");
     
        navigate('/',{replace:true})
     }
    //  else if(user?.is_blocked)
    //  {
    //     navigate('/',{replace:true})
    //  }
    },[])

    if(userAuthenticated)
    {
        return children
    }
}

export default UserProtected