import { useEffect, useState, useRef } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import "./GetAdminGrievances.css";
import { Link } from "react-router-dom";
import Sidebar from "../../../components/Sidebar";
import Box from "@mui/material/Box";
import { Button, IconButton, TextField } from "@mui/material";
import { useReactToPrint } from "react-to-print";
import Modal from "../ToDoTask/getTasks/TaskModal";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function GetAdminGrievances() {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };
  const [tasks, setTasks] = useState([]);
  const [ModalData, setModalData] = useState({
    employeeid: "",
    title: "",
    desc: "",
    date: "",
    status:""
  });

  // const [RejectId, setRejectId] = useState("");

  const [searchedVal, setSearchedVal] = useState("");

  const Id = JSON.parse(localStorage.getItem("Id-data"));

  const componentToPdf = useRef();

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(`http://localhost:7000/api/getallGrievance`);
      setTasks(response.data);
    };

    fetchData();
  }, []);

  const deleteUser = async (leaveId) => {
    await axios
      .delete(`http://localhost:7000/api/admin-tasks/delete/${leaveId}`)
      .then((respones) => {
        setTasks((prevUser) =>
          prevUser.filter((leave) => leave._id !== leaveId)
        );
        toast.success("Task Deleted Successfully !", {
          position: "top-right",
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // const approveUser = async (leaveId) => {
  //   await axios
  //     .get(`${process.env.REACT_APP_BASE_URL}/leaves/update/${leaveId}`)
  //     .then((response) => {
  //       setTasks((prevUser) =>
  //         prevUser.filter((leave) => leave._id !== leaveId)
  //       );
  //       console.log(response);
  //       // setClicked(true);
  //       toast.success("Leave Approved Successfully !", {
  //         position: "top-right",
  //       });
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // };

  // 👇️ create copy and reverse
  const reversed = [...tasks].reverse();

  // const [open, setOpen] = useState(false);
  const [showModal, setshowModal] = useState(false);

  const handleClickOpenModal = async (id) => {
    await axios
      .get(`http://localhost:7000/api/grievances/getModalData/${id}`)
      .then((response) => {
        console.log(response, "modaldata");
        setModalData({
          employeeid: response.data[0].Employee_id,
          title: response.data[0].Category,
          desc: response.data[0].Query,
          date: response.data[0].Completion_Date,
          status:response.data[0].is_resolved
          // setClicked(true);
          // toast.success("Leave Approved Successfully !", {
          //   position: "top-right",
        });
      })
      // setRejectId(response.data[0]._id);
      .catch((error) => {
        console.log(error);
      });
    // setOpen(true);
    setshowModal(true);
  };

  // const handleCloseModal = () => {
  //   setOpen(false);
  // };

  // const [clicked, setClicked] = useState();

  const generatePDF = useReactToPrint({
    content: () => componentToPdf.current,
    documentTitle: "UserData",
    onAfterPrint: () => alert("Data saved in PDF"),
  });

  
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric"}
    return new Date(dateString).toLocaleDateString(undefined, options)
  }

  return (
    <Box container sx={{ display: "flex" }}>
      <Sidebar
        openSidebarToggle={openSidebarToggle}
        OpenSidebar={OpenSidebar}
      />
      <div className="userTable">
        <Box
          container
          sx={{ display: "flex", flexDirection: "row", alignItems: "stretch" }}
        >
          <Link to={"/admin-tasks"} className="addButton">
            Add Task
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
                <th>Category</th>
                <th>Date</th>
                <th>Status</th>
                <th>Details</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {reversed
                .filter(
                  (task) =>
                    // note that I've incorporated the searchedVal length check here
                    !searchedVal.length ||
                    task.Employee_id.toString()
                      .toLowerCase()
                      .includes(searchedVal.toString().toLowerCase())
                )
                .map((task, index) => {
                  return (
                    <tr key={task._id}>
                      <td>{index + 1}</td>
                      <td>{task.Employee_id}</td>
                      <td>{task.Category}</td>
                      
                      <td>{formatDate(task.createdAt)}</td>
                      <td>
                    <h5>
                      {task.is_resolved === 1
                        ? "Completed"
                        :  "Pending"}
                    </h5>
                  </td>
                  <td>
                        <Button
                          variant="contained"
                          onClick={
                            () => handleClickOpenModal(task._id)
                            // (e) =>
                          }
                        >
                          Get Details
                        </Button>
                        {showModal && (
                          <Modal
                            empId={ModalData.employeeid}
                            title={ModalData.title}
                            desc={ModalData.desc}
                            date={ModalData.last_date}
                            onClose={() => setshowModal(false)}
                          />
                        )}
                      </td>
                      <td className="actionButtons">
                        <Button onClick={(e) => deleteUser(task._id)}>
                          <i class="fa fa-trash" aria-hidden="true"></i>
                        </Button>
                        {/* <IconButton
                      onClick={() => {
                        approveUser(user._id);
                      }}
                    >
                      <CheckCircleOutlineIcon />
                    </IconButton> */}
                      </td>
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
