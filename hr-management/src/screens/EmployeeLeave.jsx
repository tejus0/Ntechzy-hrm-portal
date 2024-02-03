import React, { useState } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import { Box, ThemeProvider } from "@mui/system";
import { Button, Grid, IconButton, TextField } from "@mui/material";

function EmployeeLeave() {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };
  return (
    <Box container sx={{display:"flex"}}>
      <Header OpenSidebar={OpenSidebar} />
      <Sidebar
        openSidebarToggle={openSidebarToggle}
        OpenSidebar={OpenSidebar}
      />
      <Grid container sx={{margin:"20px"}}>
        <Box
          sx={{
            boxShadow: 2,
            width: "90%",
            height: "5%",
            borderRadius: 1,
            bgcolor: "red",
            margin: "10px",
          }}
        >
          Apply Leaves
        </Box>

        <Box
          sx={{
            boxShadow: 2,
            width: "90%",
            height: "90%",
            borderRadius: 1,
            bgcolor: "grey",
            margin: "10px",
          }}
        >
          <Grid container sx={{ margin: "5px" }} spacing={2}>
            {/* Heading */}
            <Grid md={12} sm={12} sx={{textAlign:"center"}}>
              Apply Leaves
              <hr />
            </Grid>

            {/* content */}
            <Grid xs={6} md={5} sx={{ margin: "20px" }} direction="column">
               Leave Type *
               <Grid>
              <TextField
          id="outlined-select-currency"
          select
          label="Select"
          defaultValue="EUR"
          helperText="Please select your currency"
          fullWidth
        >
          {/* {currencies.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))} */}
        </TextField>
        </Grid>
            </Grid>
            <Grid xs={6} md={5} sx={{ margin: "5px" }}>
              Remaining Leaves *
              <Grid>
              <TextField
          disabled
          id="filled-disabled"
          label="Disabled"
          defaultValue="10"
          variant="filled"
          fullWidth
        />
        </Grid>
            </Grid>
            <Grid xs={6} md={5} sx={{ margin: "5px" }}>
              From
              <Grid>
              <TextField
          id="outlined-select-currency"
          select
          label="Select"
          defaultValue="EUR"
          helperText="Please select your currency"
          fullWidth
        >
          {/* {currencies.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))} */}
        </TextField>
        </Grid>
            </Grid>
            <Grid xs={6} md={5} sx={{ margin: "5px" }}>
              To *
              <Grid>
              <TextField
          id="outlined-select-currency"
          select
          label="Select"
          defaultValue="EUR"
          helperText="Please select your currency"
          fullWidth
        >
          {/* {currencies.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))} */}
        </TextField>
        </Grid>
            </Grid>
            <Grid md={5} sx={{ margin: "5px" }}>
              Day
              <Grid>
              <TextField
          id="outlined-select-currency"
          select
          label="Select"
          defaultValue="EUR"
          helperText="Please select your currency"
          fullWidth
        >
          {/* {currencies.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))} */}
        </TextField>
        </Grid>
            </Grid>
            <Grid md={5} sx={{ margin: "5px" }}>
              Remaining Leaves
              <Grid>
              <TextField
          disabled
          id="filled-disabled"
          label="Disabled"
          defaultValue="10"
          variant="filled"
          fullWidth
        />
        </Grid>
            </Grid>
          </Grid>

          {/* Buttons at bottom */}
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
        </Box>
      </Grid>
    </Box>
  );
}

export default EmployeeLeave;
