import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {ShowPosts} from '../components/ShowPosts.js'


function Dashboard() {
    const {user}=useSelector(state=>state.auth)
    const navigate=useNavigate()
    useEffect(()=>{

        if(!user){
            navigate('/login')
        }
    }
    ,[user])
  return (
    <div>
      <ShowPosts/>
    </div>
  )
}

export default Dashboard
