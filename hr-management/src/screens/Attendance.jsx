import React from "react";
import UserSideBar from "../components/UserSideBar";
import { useState , useRef } from "react";
import Box from "@mui/material/Box";
import Modal from "../components/Modal";
import {Switch} from "antd";
export default function ()
 {
    const [openSidebarToggle, setOpenSidebarToggle] = useState(false);
 const[toggle,setToggle]=useState(false);
  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };
  const Toggler=()=>{
     toggle?setToggle(false):setToggle(true);
  }
  const[showModal,setshowModal]= useState(false);
    return(
         <Box container sx={{ display: "flex" }}>
      {window.localStorage.getItem("user-type")=='user' ? <UserSideBar openSidebarToggle={openSidebarToggle}
           OpenSidebar={OpenSidebar}/> : <UserSideBar
           openSidebarToggle={openSidebarToggle}
          OpenSidebar={OpenSidebar}
        />}
        <Box  container
        sx={{
          p: 5,
          m: 7,
          width: "90%",
          borderRadius: 1,
        }}>
        <div className="h-screen flex flex-col items-center gap-6"> 
            <h1 className="text-5xl font-bold mt-4"> ATTENDANCE</h1>
             <Switch onClick={()=> setshowModal(true)} className="bg-gray-500 px-4 py-2 rounded-lg text-lg"/>
            {showModal && <Modal onClose={()=> setshowModal(false)}/>} 
            {/* <Switch onClick={Toggler}/>
            {toggle?setshowModal(true):setshowModal(false)}; */}
        </div>
        </Box>
         </Box>
    );
 }

