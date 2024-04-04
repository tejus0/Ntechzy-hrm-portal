import { useEffect, useState, useRef } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import "./GetTasks.css";
import { Link } from "react-router-dom";
import Sidebar from "../../../components/Sidebar";
import Box from "@mui/material/Box";
import { Button, IconButton, TextField } from "@mui/material";
import UserSideBar from "../../../components/UserSideBar";
import { useReactToPrint } from "react-to-print";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function GetUserTasks() {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };
  const [users, setUsers] = useState([]);

  const [searchedVal, setSearchedVal] = useState("");

  const Id = JSON.parse(localStorage.getItem("Id-data"));

  const componentToPdf = useRef();

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        `http://localhost:7000/api/getUserTasks/${Id}`
      );
      setUsers(response.data);
    };

    fetchData();
  }, []);



  // 👇️ create copy and reverse
  const reversed = [...users].reverse();

  const generatePDF = useReactToPrint({
    content: () => componentToPdf.current,
    documentTitle: "UserData",
    onAfterPrint: () => alert("Data saved in PDF"),
  });

  return (
    <Box container sx={{ display: "flex" }}>
      {window.localStorage.getItem("user-type") == "user" ? (
        <UserSideBar
          openSidebarToggle={openSidebarToggle}
          OpenSidebar={OpenSidebar}
        />
      ) : (
        <Sidebar
          openSidebarToggle={openSidebarToggle}
          OpenSidebar={OpenSidebar}
        />
      )}
      <div className="userTable">
        <div ref={componentToPdf} style={{ width: "100%" }}>
          <table>
            <thead>
              <tr>
                <th>S.No.</th>
                <th>Employee Id</th>
                <th>Title </th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              {reversed
                .map((user, index) => {
                  return (
                    <tr key={user._id}>
                      <td>{index + 1}</td>
                      <td>{user.Employee_id}</td>
                      <td>{user.Title}</td>
                      <td>{user.Description}</td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
        <Button variant="contained" onClick={generatePDF}>
          PDF
        </Button>
      </div>
    </Box>
  );
}
