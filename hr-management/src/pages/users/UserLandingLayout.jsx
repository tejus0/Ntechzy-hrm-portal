import React from "react";
import { useState, useEffect } from "react";
import Home from "../admin/Home";
import Box from "@mui/material/Box";
import axios from "axios";
import UserSideBar from "../../components/UserSideBar";

function LandingLayout() {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };

  useEffect(() => {
    const fetchData = async () => {
      await axios
        .post(`${process.env.REACT_APP_BASE_URL}/admin-page`, {
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
        })
        .catch((error) => console.log(error.message));
    };

    fetchData();
  }, []);
  return (
    <Box container sx={{ display: "flex" }}>
      <UserSideBar
        openSidebarToggle={openSidebarToggle}
        OpenSidebar={OpenSidebar}
      />
      <Box
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
