import React from "react";
import { useState, useEffect } from "react";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import Home from "./Home";
import Box from "@mui/material/Box";
import axios from "axios";

function LandingLayout() {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };

  useEffect(() => {
    const fetchData = async () => {
      await axios
        .post(`http://localhost:7000/api/admin-page`, {
          token: window.localStorage.getItem("token"),
          data: window.localStorage.getItem("Id-data"),
        })
        .then((response) => {
          // response.json();
          console.log(response, "token is sent");
          if (response.data.data == "token expired") {
            alert("Token expired . Login Again !");
            window.localStorage.clear();
            window.location.href = "./";
          }
          // console.log(window.localStorage.getItem("token"));
          // toast.success(response.data.msg, { position: "top-right" });
          // navigate("/");
        })
        .catch((error) => console.log(error.message));
    };

    fetchData();
  }, []);
  return (
    <Box container sx={{ display: "flex" }}>
      <Sidebar
        openSidebarToggle={openSidebarToggle}
        OpenSidebar={OpenSidebar}
      />

      {/* <div className='grid-container'> */}

      {/* <Sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar}/> */}
      <Box
        // onSubmit={handleSubmit}
        sx={{
          display: "flex",
          flexGrow: 1,
          flexWrap: "wrap",
          p: 5,
          m: 3,
          width: "80%",
          borderRadius: 1,
        }}
      >
        <Home />
      </Box>
    </Box>
  );
}

export default LandingLayout;
