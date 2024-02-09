import React, { useState } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import { Box, ThemeProvider } from "@mui/system";
import { Button, Grid, IconButton, TextField } from "@mui/material";
import Typography from "@mui/material/Typography";
function EmployeeLeave() {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };
  return (
    <Box container sx={{display:"flex"}}>
      <Sidebar
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
          width: '80%',
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
            textDecoration:"underline",
            fontSize:"30px"
          }}
        >
         APPLY LEAVES
         <hr />
        </Typography>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid container item xs={6} direction="column">
            <div> Leave Type * : </div>
              <TextField
          fullWidth
          required
          id="outlined-required"
          label="Required"
          helperText="Please select your currency"
         
         >
          {/* {currencies.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))} */}
         </TextField>
         <div>From</div>
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
           <div>Remaining Leaves *</div> 
            
              <TextField
          disabled
          id="filled-disabled"
          label="Disabled"
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
          {/* {currencies.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))} */}
         </TextField>
         <div>To *</div>
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
            <div>Remaining Leaves</div>
             
              <TextField
          disabled
          id="filled-disabled"
          label="Disabled"
          defaultValue="10"
          variant="filled"
          fullWidth
          />
       </Grid>
       <Grid container item spacing={1} align="center" direction="row" sx={{marginTop:"10px"}}>
        
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
  );
}

export default EmployeeLeave;
