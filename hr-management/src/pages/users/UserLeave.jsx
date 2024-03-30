import React, { useState, useEffect, useContext, useRef } from "react";
import Sidebar from "../../components/Sidebar";
import { Box, ThemeProvider } from "@mui/system";
import toast from "react-hot-toast";
import { Button, Grid, IconButton, TextField } from "@mui/material";
import Typography from "@mui/material/Typography";
import MenuItem from "@mui/material/MenuItem";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import axios from "axios";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import UserSideBar from "../../components/UserSideBar";

// import { UserContext } from "../../screens/contexts/userContext";

function EmployeeLeave() {
  const [name, setName] = useState("");
  const [empId, setEmpId] = useState("");
  const [type, setType] = useState("");
  const [day, setDay] = useState("");
  const [from, setFrom] = useState(null);
  const [to, setTo] = useState(null);
  const [daycount, setdaycount] = useState(0);
  const [remLeaves, setremLeaves] = useState(0);
  const [desc, setDesc] = useState("");

  const [disable, setDisable] = useState(true);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [BeforeRemLeaves, setBeforeRemLeaves] = useState(0);
  const [AfterRemLeaves, setAfterRemLeaves] = useState(BeforeRemLeaves);
  const [dayDiff, setDayDiff] = useState(0);

  // const emp_id = useContext(UserContext)

  const [user_id, setUser_id] = useState(0);

  // useEffect(() => {
  //   const time = Math.abs(endDate - startDate);
  //   const days = Math.ceil(time / (1000 * 60 * 60 * 24));
  //   setAfterRemLeaves(days);
  //   console.log(days);
  // }, [endDate]);

  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };

  const leaveType = [
    {
      value: "Sick Leave",
    },
    {
      value: "Casual Leave",
    },
    {
      value: "Annual Leave",
    },
  ];

  const dayType = [
    {
      value: "half Day",
    },
    {
      value: "Full Day",
    },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (BeforeRemLeaves < daycount || BeforeRemLeaves <= 0) {
      setBeforeRemLeaves(0);
      toast.error("Leaves are remaining less");
      return;
    }
    await axios
      .post("http://localhost:7000/api/generate-leave", {
        name: name,
        employeeNo: user_id,
        leaveType: type,
        Day: day,
        From: inputBox ? from : "",
        To: inputBox ? to : "",
        Days: daycount,
        RemLeaves: remLeaves,
        Description: desc,
        CancelReason: "",
      })
      .then((response) => {
        console.log(response);
        toast.success("Application submitted successfully !", {
          position: "top-right",
        });

        // navigate("/");
      })
      .catch((error) => console.log(error.response));
  };

  const resetForm = (e) => {
    console.log("here");
    e.preventDefault();
    setDay("");
    setDesc("");
    setEmpId("");
    setFrom("");
    setTo("");
    setName("");
    setType("");
  };

  const [inputBox, setInputBox] = useState(false);
  const handleDay = (value) => {
    if (value === "Full Day") {
      setInputBox(true);
    } else {
      setInputBox(false);
    }
  };

  const totalCasual = 10;

  useEffect(() => {
    const Id = JSON.parse(localStorage.getItem("Id-data"), function (k, v) {
      return typeof v === "object" || isNaN(v) ? v : parseInt(v, 10);
    });
    console.log(Id, typeof Id);
    if (Id) {
      console.log("id not setting");
      setUser_id(Id);
      console.log(user_id, "this is not working");
    }
  }, []);

  const hasPageBeenRendered = useRef(false);

  useEffect(() => {
    if (hasPageBeenRendered.current) {
      const fetchData = async () => {
        await axios
          .get(
            `http://localhost:7000/api/remainingLeaves?employeeNo=${user_id}&leaveType=${type}`
          )
          .then((response) => {
            if (response.data.length == 0) {
              setBeforeRemLeaves(totalCasual);
              // toast.error("Error in fetching remaining leaves, Reload again ");
            } else setBeforeRemLeaves(totalCasual - response.data[0].total);
            console.log(response.data[0].total, "response");
            // toast.success(response, {position:"top-right"})
          })
          .catch((error) => console.log(error));
        // console.log(response);
        // setBeforeRemLeaves(response.data);
      };

      fetchData();
    }
    hasPageBeenRendered.current = true;
  }, [type]);

  const isWeekend = (date) => {
    const day = date.day();

    return day === 0 || day === 6;
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
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
        <Box
          //   component="form"
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
          <form onSubmit={handleSubmit}>
            <Typography
              variant="h5"
              style={{
                textAlign: "center",
                justifyContent: "center",
                width: "100%",
                paddingTop: "5%",
                textDecoration: "underline",
                fontSize: "30px",
              }}
            >
              APPLY LEAVES
              <hr />
            </Typography>
            <Grid
              container
              rowSpacing={1}
              columnSpacing={{ xs: 1, sm: 2, md: 3 }}
            >
              <Grid container item xs={6} direction="column">
                <div>Employee Id </div>
                <TextField
                  defaultValue
                  // onChange={(e) => {
                  //   setName(e.target.value);
                  // }}
                  disabled
                  value={user_id}
                  // value={AfterRemLeaves}
                  id="filled-disabled"
                  // defaultValue=""
                  variant="filled"
                  fullWidth
                />

                <div> Leave Type * : </div>
                <TextField
                  id="outlined-select-currency"
                  onChange={(e) => {
                    setType(e.target.value);
                  }}
                  select
                  label="Select"
                  fullWidth
                >
                  {leaveType.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.value}
                    </MenuItem>
                  ))}
                  {/* {currencies.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))} */}
                </TextField>
                {inputBox ? (
                  <>
                    <div>From</div>
                    <DatePicker
                      disablePast
                      // shouldDisableDate={isWeekend}
                      label="Start Date"
                      // format="YYYY-MM-DD"
                      // value={startDate}
                      value={startDate} // Set the value prop to display the selected start date
                      onChange={(date) => {
                        const d = new Date(date).toLocaleDateString("fr-FR");
                        const fromDate = moment(d, "DD/MM/YYYY");
                        console.log(d);
                        setFrom(fromDate);
                        setStartDate(date);
                      }}
                    />
                  </>
                ) : null}
              </Grid>
              <Grid container item xs={6} direction="column">
                <div> Day</div>
                <TextField
                  id="outlined-select-currency"
                  required
                  select
                  onChange={(e) => {
                    setDay(e.target.value);
                    {
                      handleDay(e.target.value);
                    }
                  }}
                  label="Select"
                  helperText="Please select your currency"
                  fullWidth
                >
                  {dayType.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.value}
                    </MenuItem>
                  ))}
                </TextField>
                <div>Remaining Leaves *</div>

                <TextField
                  value={BeforeRemLeaves}
                  // defaultValue="10"
                  variant="filled"
                  disabled
                  fullWidth
                />
                {inputBox ? (
                  <>
                    <div>To *</div>
                    <DatePicker
                      // shouldDisableDate={isWeekend}
                      label="End Date"
                      // format="YYYY-MM-DD"
                      value={endDate}
                      minDate={startDate}
                      onChange={(date) => {
                        const d = new Date(date).toLocaleDateString("fr-FR");
                        console.log(d);
                        setTo(d);
                        setEndDate(to);
                        const toDate = moment(d, "DD/MM/YYYY"); // Convert selected date to a Moment.js object
                        const daysDiff = toDate.diff(from, "days"); // Calculate difference in days
                        setdaycount(daysDiff);
                      }}
                    />
                  </>
                ) : null}
              </Grid>

              {inputBox ? (
                <>
                  <div>Days of Leave</div>
                  <TextField
                    value={daycount}
                    onChange={(e) => {
                      setdaycount(e.target.value);
                    }}
                    disabled
                    // value={AfterRemLeaves}
                    id="filled-disabled"
                    // defaultValue=""
                    variant="filled"
                    fullWidth
                  />
                </>
              ) : null}

              <Grid
                container
                item
                spacing={1}
                align="center"
                direction="row"
                sx={{ marginTop: "10px" }}
              >
                <div>Reason Of Leave</div>
                <TextField
                  required
                  multiline
                  onChange={(e) => {
                    setDesc(e.target.value);
                  }}
                  rows={4}
                  fullWidth
                  id="outlined-required"
                  label="Required"
                />
                <Grid container spacing={1} align="center" direction="row">
                  <Grid item sx={{ margin: "5px" }}>
                    <Button
                      // onClick={handleSubmit}
                      type="submit"
                      variant="contained"
                      color="success"
                    >
                      Apply
                    </Button>
                  </Grid>
                  <Grid item sx={{ margin: "5px" }}>
                    <Button
                      type="button"
                      variant="contained"
                      color="error"
                      onClick={resetForm}
                    >
                      Reset
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </form>
        </Box>
      </Box>
    </LocalizationProvider>
  );
}

export default EmployeeLeave;
