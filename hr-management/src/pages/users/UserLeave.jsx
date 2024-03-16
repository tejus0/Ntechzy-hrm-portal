import React, { useState, useEffect } from "react";
import Header from "../../components/Header";
import Usersidebar from "../../components/UserSideBar";
import { Box, ThemeProvider } from "@mui/system";
import { Button, Grid, IconButton, TextField } from "@mui/material";
import Typography from "@mui/material/Typography";
import MenuItem from "@mui/material/MenuItem";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import moment from "moment";

function EmployeeLeave() {
  const [disable, setDisable] = useState(true);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [BeforeRemLeaves, setBeforeRemLeaves] = useState(0);
  const [AfterRemLeaves, setAfterRemLeaves] = useState(BeforeRemLeaves);

  useEffect(() => {
    const time = Math.abs(endDate - startDate);
    const days = Math.ceil(time / (1000 * 60 * 60 * 24));
    setAfterRemLeaves(days);
  }, [endDate]);

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
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box container sx={{ display: "flex" }}>
        <Usersidebar
          openSidebarToggle={openSidebarToggle}
          OpenSidebar={OpenSidebar}
        />
        <Box
          component="form"
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
              <div> Leave Type * : </div>
              <TextField
                id="outlined-select-currency"
                select
                label="Select"
                defaultValue="EUR"
                helperText="Please select your currency"
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
              <div>From</div>
              <DatePicker
                disablePast
                label="Start Date"
                value={startDate}
                onChange={(newValue) => {
                  setStartDate(newValue);
                }}
              />

              <div>Remaining Leaves *</div>

              <TextField
                // value={BeforeRemLeaves}

                defaultValue="10"
                variant="filled"
                fullWidth
              />
            </Grid>
            <Grid container item xs={6} direction="column">
              <div> Day</div>
              <TextField
                id="outlined-select-currency"
                select
                label="Select"
                defaultValue="EUR"
                helperText="Please select your currency"
                fullWidth
              >
                {dayType.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.value}
                  </MenuItem>
                ))}
              </TextField>
              <div>To *</div>
              <DatePicker
                label="End Date"
                value={endDate}
                minDate={startDate}
                onChange={(newValue) => {
                  setEndDate(newValue);
                }}
              />
              <div>Remaining Leaves</div>

              <TextField
                disabled
                // value={AfterRemLeaves}
                id="filled-disabled"
                label="Disabled"
                defaultValue="10"
                variant="filled"
                fullWidth
              />
            </Grid>
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
                rows={4}
                fullWidth
                id="outlined-required"
                label="Required"
              />
              <Grid container spacing={1} align="center" direction="row">
                <Grid item sx={{ margin: "5px" }}>
                  <Button variant="contained" color="success">
                    Apply
                  </Button>
                </Grid>
                <Grid item sx={{ margin: "5px" }}>
                  <Button variant="contained" color="error">
                    Cancel
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </LocalizationProvider>
  );
}

export default EmployeeLeave;
