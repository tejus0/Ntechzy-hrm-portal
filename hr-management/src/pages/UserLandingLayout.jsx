import React from 'react'
import { useState } from 'react'
import Header from '../components/Header'
import Usersidebar from '../components/Usersidebar'
import Home from './Home'
import  Box  from '@mui/material/Box'
function LandingLayout() {
    const [openSidebarToggle, setOpenSidebarToggle] = useState(false)

    const OpenSidebar = () => {
      setOpenSidebarToggle(!openSidebarToggle)
    }
  return (
   
           <div className='grid-container'>

       <Usersidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar}/>
       <Home />
     </div>
   
  )
}

export default LandingLayout