import React from 'react'
import { useState } from 'react'
import Header from '../components/Header'
import Sidebar from '../components/Sidebar'
import Home from './Home'

function LandingLayout() {
    const [openSidebarToggle, setOpenSidebarToggle] = useState(false)

    const OpenSidebar = () => {
      setOpenSidebarToggle(!openSidebarToggle)
    }
  return (
           <div className='grid-container'>
       <Header OpenSidebar={OpenSidebar}/>
       <Sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar}/>
       <Home />
     </div>
  )
}

export default LandingLayout