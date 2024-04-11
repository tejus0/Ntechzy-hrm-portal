import { useEffect, useState, useRef } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import "./UserGrievances.css";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import { Button, IconButton, TextField } from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import UserSideBar from "../../../components/UserSideBar";
import { useReactToPrint } from "react-to-print";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function UserGrievancesList() {
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
        `http://localhost:7000/api/getUserGrievances/${Id}`
      );
      setUsers(response.data);
    };

    fetchData();
  }, []);

  // useEffect(() => {
  //       fetch("http://localhost:7000/api/getallSales")
  //         .then((resp) => {
  //           return resp.json();
  //         })
  //         .then((resp) => {
  //           console.log(resp, "sales list");
  //           setUsers(resp);
  //         })
  //         .catch((e) => {
  //           console.log(e.message);
  //         });
  //     }, []);

  const deleteUser = async (leaveId) => {
    await axios
      .delete(`${process.env.REACT_APP_BASE_URL}/leaves/reject/${leaveId}`)
      .then((respones) => {
        setUsers((prevUser) =>
          prevUser.filter((leave) => leave._id !== leaveId)
        );
        toast.success("Leave Request Deleted Successfully !", {
          position: "top-right",
        });
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
        toast.success("Leave Approved Successfully !", {
          position: "top-right",
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // 👇️ create copy and reverse
  const reversed = [...users].reverse();

  // const [clicked, setClicked] = useState();

  const generatePDF = useReactToPrint({
    content: () => componentToPdf.current,
    documentTitle: "UserData",
    onAfterPrint: ()=>alert("Data saved in PDF")
  });

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric"}
    return new Date(dateString).toLocaleDateString(undefined, options)
  }

  return (
    <Box container sx={{ display: "flex" }}>
        <UserSideBar
          openSidebarToggle={openSidebarToggle}
          OpenSidebar={OpenSidebar}
        />
      <div className="userTable">
        <Box
          container
          sx={{ display: "flex", flexDirection: "row", alignItems: "stretch" }}
        >
          <Link to={"/grievance-form"} className="addButton">
            Add Grievance
          </Link>
          <TextField
            placeholder="Search Employee "
            sx={{ marginLeft: "auto" }}
            onChange={(e) => setSearchedVal(e.target.value)}
          />
        </Box>
        <div ref={componentToPdf} style={{ width: "100%" }}>
          <table>
            <thead>
              <tr>
                <th>S.No.</th>
                <th>Employee Id</th>
                <th>Date</th>
                <th>Category</th>
                <th>Query</th>
                <th> Status</th>
              </tr>
            </thead>
            <tbody>
              {reversed
                .filter(
                  (user) =>
                    // note that I've incorporated the searchedVal length check here
                    !searchedVal.length ||
                    user.Employee_id
                      .toString()
                      .toLowerCase()
                      .includes(searchedVal.toString().toLowerCase())
                )
                .map((user, index) => {
                  return (
                    <tr key={user._id}>
                      <td>{index + 1}</td>
                      <td>{user.Employee_id}</td>
                      <td>{formatDate(user.createdAt)}</td>
                      <td>{user.Category}</td>
                      <td>{user.Query}</td>
                      <td>{user.is_resolved===1 ?"Completed":"Pending"}</td>
                      {/* <td>{user.From}</td>
                  <td>{user.To}</td>
                  <td>{user.Days}</td> */}
                      {/* <td>
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
                  </td> */}
                      {/* <td>{user.is_approved}</td> */}
                      {/* <td className="actionButtons">
                    <Button onClick={() => deleteUser(user._id)}>
                      <i class="fa fa-trash" aria-hidden="true"></i>
                    </Button>
                    <IconButton
                      onClick={() => {
                        approveUser(user._id);
                      }}
                    >
                      <CheckCircleOutlineIcon />
                    </IconButton>
                  </td> */}
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
