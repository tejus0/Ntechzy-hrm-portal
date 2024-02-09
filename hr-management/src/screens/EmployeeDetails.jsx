import Dropdown from "../components/Dropdown";
import { useState } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

function EmployeeDetails() {
    const [title, setTitle] = useState('')
    const [details, setDetails] = useState('')



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
            fontSize:"30px",
          
          }}
        >
         EMPLOYEE DETAILS
         <hr />
        </Typography>
        <form noValidate autoComplete="off">
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 4 }}>
          <Grid container item xs={4} direction="column">
            <div>Employee Name : </div>
            <TextField onChange={(e)=>setTitle(e.target.value)}
              fullWidth
              required
              name="name"
              id="outlined-required"
              label="Required"
            />
            <div>Father Name : </div>
            <TextField
            name="father-name"
              id="outlined-basic"
              label="Outlined"
              variant="outlined"
            />
            <div>Gender : </div>
            <TextField name="gender" id="filled-basic" label="Filled" variant="filled" />
            <div>Mobile : </div>
            <TextField
            name="mobile"
              id="outlined-basic"
              label="Outlined"
              variant="outlined"
            />
           <div>Designation : </div>
            <TextField
            name="designation"
              id="outlined-basic"
              label="Outlined"
              variant="outlined"
            />
            <Button
          variant="contained"
          href="#contained-buttons"
          color="success"
          sx={{ margin: "5% auto", width: "20%" }}
        >
          Submit
        </Button>
          </Grid>
          <Grid container item xs={4} direction="column">
          <div>Employee No. : </div>
            <TextField
              id="outlined-basic"
              label="Outlined"
              variant="outlined"
            />
           <div>Date Of Birth : </div>
            <TextField
            name="dob"
              id="outlined-basic"
              label="Outlined"
              variant="outlined"
            />
            <div>Address : </div>
            <TextField
            name="address"
              id="outlined-basic"
              label="Outlined"
              variant="outlined"
            />
            <div>Date Of Joining : </div>
            <TextField
            name="doj"
              id="outlined-basic"
              label="Outlined"
              variant="outlined"
            />
            <div>Status : </div>
            <TextField
            name=""
              id="outlined-basic"
              label="Outlined"
              variant="outlined"
            />
             <Button
          variant="contained"
          href="#contained-buttons"
          color="error"
          sx={{ margin: "5% auto", width: "20%" }}
        >
          Reset
        </Button>
          </Grid>
          <Grid container item xs={4} direction="column" sx={{alignItems:"center"}}>
          <Box
  component="img"
  sx={{
    margin:"25px",
    height: 300,
    width: 350,
    maxHeight: { xs: 233, md: 400 },
    maxWidth: { xs: 350, md: 400 },
  }}
  alt="The house from the offer."
  src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&w=350&dpr=2"
/>
<Button
          variant="contained"
          href="#contained-buttons"
          color="success"
          sx={{  width: "50%" }}
        >
          Upload
        </Button>
       
        </Grid>
        
        </Grid>
        </form>
        </Box>
    </Box>
  );
}

export default EmployeeDetails;
