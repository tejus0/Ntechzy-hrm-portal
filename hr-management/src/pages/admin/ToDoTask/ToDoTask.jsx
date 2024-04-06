import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import { useState } from "react";
import Sidebar from "../../../components/Sidebar";
import toast from "react-hot-toast";
import axios from "axios";
import { DatePicker } from "@mui/x-date-pickers";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import 'dayjs/locale/de';
import dayjs from "dayjs";
export default function ToDoTask() {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);

  const [empId, setEmpId] = useState("");
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [date, setDate] = useState("")

  const [EmpError, setEmpError] = useState(false);
  const [TitleError, setTitleError] = useState(false);
  const [DescError, setDescError] = useState(false);

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };

  const resetform = (e) => {
    e.preventDefault();
    setEmpId("");
    setDesc("");
    setTitle("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      EmpError ||
      TitleError ||
      DescError ||
      empId.trim() == "" ||
      title.trim() == "" ||
      desc.trim() == ""
    ) {
      toast.error("Please fill the details first", { position: "top-right" });
    } else {
      console.log(desc, "text is here");
      await axios
        .post(`http://localhost:7000/api/createTask`, {
          Employee_id: empId,
          Title: title,
          Description: desc,
		  Completion_Date:date
        })
        .then((response) => {
          // console.log(response,"tasks");
          toast.success("task added successfully !", { position: "top-right" });
          setEmpId("");
          setDesc("");
          setTitle("");
        })
        .catch((error) => console.log(error));
    }
  };
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="de">
      <Box container sx={{ display: "flex" }}>
        <Sidebar
          openSidebarToggle={openSidebarToggle}
          OpenSidebar={OpenSidebar}
        />

        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            display: "flex",
            flexGrow: 1,
            flexWrap: "wrap",
            p: 5,
            m: 3,
            width: "80%",
            borderRadius: 1,
          }}
          noValidate
          autoComplete="off"
        >
          <Typography
            variant="h2"
            style={{
              textAlign: "center",
              justifyContent: "center",
              width: "100%",
              paddingTop: "2%",
              textDecoration: "underline",
              fontSize: "23px",
            }}
          >
            Add Task
            <hr />
          </Typography>

          {/* <form onSubmit={handleSubmit} noValidate autoComplete="off"> */}
          <Grid
            container
            rowSpacing={1}
            sx={{ margin: "10px", paddingLeft: "8%" }}
          >
            <div>Employee Id </div>
            <TextField
              value={empId}
              onChange={(e) => {
                setEmpId(e.target.value);
                if (e.target.validity.valid) {
                  setEmpError(false);
                } else {
                  setEmpError(true);
                }
              }}
              error={EmpError}
              helperText={EmpError ? "Please enter Employee ID" : ""}
              fullWidth
              required
              name="Employee-id"
              id="outlined-required"
              label="Required"
            />
            <div>Title : </div>
            <TextField
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                if (e.target.validity.valid) {
                  setTitleError(false);
                } else {
                  setTitleError(true);
                }
              }}
              error={TitleError}
              helperText={TitleError ? "Please enter Title" : ""}
              fullWidth
              required
              name="title"
              id="outlined-required"
              label="Required"
            />
            <div>Description : </div>
            <TextField
              value={desc}
              onChange={(e) => {
                setDesc(e.target.value);
				console.log(desc);
                if (e.target.validity.valid) {
                  setDescError(false);
                } else {
                  setDescError(true);
                }
              }}
              error={DescError}
              helperText={DescError ? "Please enter description" : ""}
              fullWidth
              required
              multiline
              rows={4}
              name="description"
              id="outlined-required"
              label="Required"
            />
			<div>Last Date of Completion</div>
            <DatePicker
              // shouldDisableDate={isWeekend}
			  sx={{ml:3,mt:2}}
              label="End Date"
			  // inputFormat="MM/dd/yyyy"
        inputFormat="dd-MM-yyyy"
  value={dayjs(date)}
              // format="YYYY-MM-DD"
              //   value={endDate}
              //   minDate={startDate}
                onChange={(date) => {
                  const d = new Date(date);
                  console.log(d,"date");
				  setDate(d);
                //   setTo(d);
                //   setEndDate(to);
                //   const toDate = moment(d, "DD/MM/YYYY"); // Convert selected date to a Moment.js object
                //   const daysDiff = toDate.diff(from, "days"); // Calculate difference in days
                //   setdaycount(daysDiff);
                }}
            />
          </Grid>
          <Grid container spacing={1} align="center" direction="row">
            <Grid item sx={{ margin: "auto" }}>
              <Button
                // onClick={handleSubmit}
                type="submit"
                variant="contained"
                color="success"
              >
                Apply
              </Button>
            </Grid>
            <Grid item sx={{ margin: "auto" }}>
              <Button onClick={resetform} variant="contained" color="error">
                Reset
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </LocalizationProvider>
  );
}
