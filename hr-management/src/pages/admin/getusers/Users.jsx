import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import "./user.css";
import { Link } from "react-router-dom";
import Sidebar from "../../../components/Sidebar";
import Box from "@mui/material/Box";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const User = () => {
    const [openSidebarToggle, setOpenSidebarToggle] = useState(false);

    const OpenSidebar = () => {
      setOpenSidebarToggle(!openSidebarToggle);
    };
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/getall`);
      setUsers(response.data);
    };

    fetchData();
  }, []);

  const deleteUser = async (userId) => {
    await axios
      .delete(`${process.env.REACT_APP_BASE_URL}/delete/${userId}`)
      .then((respones) => {
        setUsers((prevUser) => prevUser.filter((user) => user._id !== userId));
        toast.success(respones.data.msg, { position: "top-right" });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Box container sx={{display:"flex"}}>
    
      <Sidebar
        openSidebarToggle={openSidebarToggle}
        OpenSidebar={OpenSidebar}
      />
    <div className="userTable">
      <Link to={"/employee-details"} className="addButton">
        Add User
      </Link>
      <table border={1} cellPadding={10} cellSpacing={0}>
        <thead>
          <tr>
            <th>S.No.</th>
            <th>User name</th>
            <th>User Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => {
            return (
              <tr key={user._id}>
                <td>{index + 1}</td>
                <td>
                  {user.name}
                </td>
                <td>{user.email}</td>
                <td className="actionButtons">
                  <button onClick={() => deleteUser(user._id)}>
                    <i class="fa fa-trash" aria-hidden="true"></i>
                  </button>
                  <Link to={`/update-employee/` + user._id}>
                    <i className="fa-solid fa-pen-to-square"></i>
                  </Link>
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

export default User;
