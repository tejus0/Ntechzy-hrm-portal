import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import "./leaves.css";
import { Link } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import Box from "@mui/material/Box";
import { Button, IconButton } from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Leave = () => {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/getallleave`);
      setUsers(response.data);
    };

    fetchData();
  }, []);

  const deleteUser = async (leaveId) => {
    await axios
      .delete(`${process.env.REACT_APP_BASE_URL}/leaves/reject/${leaveId}`)
      .then((respones) => {
        setUsers((prevUser) =>
          prevUser.filter((leave) => leave._id !== leaveId)
        );
        toast.success("Leave Request Deleted Successfully !", { position: "top-right" });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const approveUser = async (leaveId) => {
    await axios
      .get(`${process.env.REACT_APP_BASE_URL}/leaves/update/${leaveId}`)
      .then((response) => {
        setUsers((prevUser) =>
        prevUser.filter((leave) => leave._id !== leaveId)
      );
        console.log(response);
        // setClicked(true);
        toast.success("Leave Approved Successfully !", { position: "top-right" });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // 👇️ create copy and reverse
  const reversed = [...users].reverse();

  // const [clicked, setClicked] = useState();

  return (
    <Box container sx={{ display: "flex" }}>
      <Sidebar
        openSidebarToggle={openSidebarToggle}
        OpenSidebar={OpenSidebar}
      />
      <div className="userTable">
        <Link to={"/leave-management"} className="addButton">
          Add Leave
        </Link>
        <table>
          <thead>
            <tr>
              <th>S.No.</th>
              <th>User name</th>
              <th>Employee No.</th>
              <th>Leave Type</th>
              <th> Day</th>
              <th>From</th>
              <th>To</th>
              <th>Days</th>
              <th>Description</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {reversed.map((user, index) => {
              return (
                <tr key={user._id}>
                  <td>{index + 1}</td>
                  <td>{user.name}</td>
                  <td>{user.employeeNo}</td>
                  <td>{user.leaveType}</td>
                  <td>{user.Day}</td>
                  <td>{user.From}</td>
                  <td>{user.To}</td>
                  <td>{user.Days}</td>
                  <td>
                    <Box
                      container
                      sx={{
                        overflow: "auto",
                        // my: 2,
                        // p: 1,
                        height: "80px",
                        width: "100px",
                      }}
                    >
                      {user.Description}
                    </Box>
                  </td>
                  <td>{user.is_approved}</td>
                  <td className="actionButtons">
                    <Button onClick={() => deleteUser(user._id)}>
                      <i class="fa fa-trash" aria-hidden="true"></i>
                    </Button>
                    <IconButton onClick={() =>{approveUser(user._id) }}>
                      
                        <CheckCircleOutlineIcon />
                     
                    
                    </IconButton>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </Box>
  );
};

export default Leave;
