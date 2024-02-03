import { useState } from "react";
import React from "react";
import Header from '../components/Header'
import Sidebar from '../components/Sidebar'
import { Box } from "@mui/material";

function Login() {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false)

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle)
  }
  return (
 <Box container sx={{display:"flex"}}>
    <Header OpenSidebar={OpenSidebar}/>
    <Sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar}/>
    <div>
  <form action="/login" method="post">
  <input type="email" name="email" placeholder="Enter email" />
  <br /><br />
  <input type="password" name="password" placeholder="Enter password" />
  <br /><br />
  <input type="submit" value="Login" />
</form>

<a href="/forget">Forgot Password</a>
</div>
 </Box>
  );
  
}

export default Login;
