import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import "./leaves.css";
import { Link } from "react-router-dom";
import Sidebar from "../../../components/Sidebar";
import Box from "@mui/material/Box";
import { Button, IconButton, Modal, TextField } from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import UserSideBar from "../../../components/UserSideBar";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Leave = () => {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };
  const [users, setUsers] = useState([]);
  const [ModalData, setModalData] = useState({
    valId: "",
    employeeid: "",
    desc: "",
    reason: "",
  });

  const [RejectId, setRejectId] = useState("")

  const Id = JSON.parse(localStorage.getItem("Id-data"));

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/getallleave`
      );
      setUsers(response.data);
    };

    fetchData();
  }, []);

  const rejectUser = async (id) => {
    await axios
      .get(
        `http://localhost:7000/api/leaves/reject/${id}/${ModalData.reason}`
      )
      .then((respones) => {
        console.log(respones, "respones");
        setUsers((prevUser) => prevUser.filter((leave) => leave._id !== ModalData.valId));
        toast.success("Leave Request Rejected Successfully !", {
          position: "top-right",
        });
        handleCloseModal();
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
  // const RejectUser = async (leaveId) => {
  //   await axios
  //     .update(`${process.env.REACT_APP_BASE_URL}/leaves/update/${leaveId}`)
  //     .then((response) => {
  //       setUsers((prevUser) =>
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
  const reversed = [...users].reverse();

  const [open, setOpen] = useState(false);

  const handleClickOpenModal = async (id) => {
    await axios
      .get(`http://localhost:7000/api/leaves/getModalLeave/${id}`)
      .then((response) => {
        setModalData({
          valId: response.data[0]._id,
          employeeid: response.data[0].employeeNo,
          desc: response.data[0].Description,
        });
        setRejectId(response.data[0]._id);
        console.log(response, "modaldata");
        // setClicked(true);
        // toast.success("Leave Approved Successfully !", {
        //   position: "top-right",
      })
      .catch((error) => {
        console.log(error);
      });
    setOpen(true);
  };

  const handleCloseModal = () => {
    setOpen(false);
  };

  // const [clicked, setClicked] = useState();

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
                  <td>{user._id}</td>
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
                  <td>
                    <h5>
                      {user.is_approved === 1
                        ? "Approved"
                        : user.is_approved === 0
                        ? "New Leave"
                        : "Rejected"}
                    </h5>
                  </td>
                  <td className="actionButtons">
                    <Button
                      onClick={
                        (e) => handleClickOpenModal(user._id)
                        // deleteUser(user._id)
                      }
                    >
                      <i class="fa fa-trash" aria-hidden="true"></i>
                    </Button>
                    <Dialog
                      open={open}
                      onClose={handleCloseModal}
                      PaperProps={{
                        component: "form",
                        onSubmit: (event) => {
                          event.preventDefault();
                          const formData = new FormData(event.currentTarget);
                          const formJson = Object.fromEntries(
                            formData.entries()
                          );
                          const email = formJson.email;
                          console.log(email);
                          handleCloseModal();
                        },
                      }}
                    >
                      <DialogTitle>Subscribe</DialogTitle>
                      <DialogContent>
                        <DialogContentText>
                          To subscribe to this website, please enter your email
                          address here. We will send updates occasionally.
                        </DialogContentText>
                        <div>Employee No.</div>
                        <TextField
                          // onChange={(e) => {
                          //   setName(e.target.value);
                          // }}
                          disabled
                          value={ModalData.employeeid}
                          // value={AfterRemLeaves}
                          id="filled-disabled"
                          // defaultValue=""
                          variant="filled"
                          fullWidth
                        />
                        <div>Document Id.</div>
                        <TextField
                          // onChange={(e) => {
                          //   setName(e.target.value);
                          // }}
                          disabled
                          value={RejectId}
                          // value={AfterRemLeaves}
                          id="filled-disabled"
                          // defaultValue=""
                          variant="filled"
                          fullWidth
                        />
                        <div>Description</div>
                        <TextField
                          multiline
                          rows={2}
                          // onChange={(e) => {
                          //   setName(e.target.value);
                          // }}
                          disabled
                          value={ModalData.desc}
                          // value={AfterRemLeaves}
                          id="filled-disabled"
                          // defaultValue=""
                          variant="filled"
                          fullWidth
                        />
                        <div>Reason Of Cancel</div>
                        <TextField
                          autoFocus
                          value={Modal.reason}
                          onChange={(e) =>
                            setModalData({ reason: e.target.value })
                          }
                          required
                          multiline
                          rows={4}
                          fullWidth
                          margin="dense"
                          id="outlined-required"
                          label="Required"
                        />
                      </DialogContent>
                      <DialogActions>
                        <Button onClick={handleCloseModal}>Cancel</Button>
                        <Button onClick={(e)=>{rejectUser(RejectId)}}>Delete</Button>
                      </DialogActions>
                    </Dialog>
                    <IconButton
                      onClick={() => {
                        approveUser(user._id);
                      }}
                    >
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
