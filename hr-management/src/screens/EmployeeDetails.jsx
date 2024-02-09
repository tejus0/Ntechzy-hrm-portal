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
            paddingTop: "3%",
            textDecoration:"underline",
            fontSize:"30px",
          
          }}
        >
         EMPLOYEE DETAILS
         <hr />
        </Typography>
        <Typography
          variant="h2"
          style={{
            textAlign: "center",
            justifyContent: "center",
            width: "100%",
            paddingTop: "2%",
            textDecoration:"underline",
            fontSize:"23px",
          
          }}
        >
         PERSONAL DETAILS
        </Typography>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 4 }} sx={{margin:"10px"}}>
          <Grid container item xs={4} direction="column">
            <div>Employee Name : </div>
            <TextField
              fullWidth
              required
              id="outlined-required"
              label="Required"
            />
            <div>Father Name : </div>
            <TextField
              id="outlined-basic"
              label="Outlined"
              variant="outlined"
            />
            <div>Gender : </div>
            <TextField id="filled-basic" label="Filled" variant="filled" />
            <div>Mobile : </div>
            <TextField
              id="outlined-basic"
              label="Outlined"
              variant="outlined"
            />
           <div>Designation : </div>
            <TextField
              id="outlined-basic"
              label="Outlined"
              variant="outlined"
            />
         
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
              id="outlined-basic"
              label="Outlined"
              variant="outlined"
            />
            <div>Address : </div>
            <TextField
              id="outlined-basic"
              label="Outlined"
              variant="outlined"
            />
            <div>Date Of Joining : </div>
            <TextField
              id="outlined-basic"
              label="Outlined"
              variant="outlined"
            />
            <div>Status : </div>
            <TextField
              id="outlined-basic"
              label="Outlined"
              variant="outlined"
            />
            
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
        <Typography
          variant="h5"
          style={{
            textAlign: "center",
            justifyContent: "center",
            width: "100%",
            paddingTop: "3%",
            textDecoration:"underline",
            fontSize:"30px",
          
          }}
        >
         EDUCATIONAL DETAILS
         <hr />
        </Typography>
        <Typography
          variant="h2"
          style={{
            textAlign: "center",
            justifyContent: "center",
            width: "100%",
            paddingTop: "2%",
            textDecoration:"underline",
            fontSize:"23px",
          
          }}
        >
         Xth DETAILS
        </Typography>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 4}} sx={{margin:"10px", }}>
        <Grid container item xs={4} direction="column">
            <div>  Passing Year : </div>
            <TextField
             
              required
              id="outlined-required"
              label="Required"
            />
           </Grid>
           <Grid container item xs={4} direction="column">
            <div>  School Name : </div>
            <TextField
             
              required
              id="outlined-required"
              label="Required"
            />
           </Grid>
           <Grid container item xs={4} direction="column">
            <div>  Percentage/CGPA : </div>
            <TextField
             
              required
              id="outlined-required"
              label="Required"
            />
           </Grid>

          </Grid>
          <Typography
          variant="h2"
          style={{
            textAlign: "center",
            justifyContent: "center",
            width: "100%",
            paddingTop: "2%",
            textDecoration:"underline",
            fontSize:"23px",
          
          }}
        >
         XIIth / DIPLOMA DETAILS
        </Typography>
          <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 4}} sx={{margin:"10px"}}>
          
          <Grid container item xs={4} direction="column">
            <div>  Passing Year : </div>
            <TextField
             
              required
              id="outlined-required"
              label="Required"
            />
           </Grid>
           <Grid container item xs={4} direction="column">
            <div>  School Name : </div>
            <TextField
             
              required
              id="outlined-required"
              label="Required"
            />
           </Grid>
           <Grid container item xs={4} direction="column">
            <div>  Percentage : </div>
            <TextField
             
              required
              id="outlined-required"
              label="Required"
            />
           </Grid>
           
          </Grid>
          <Typography
          variant="h2"
          style={{
            textAlign: "center",
            justifyContent: "center",
            width: "100%",
            paddingTop: "2%",
            textDecoration:"underline",
            fontSize:"23px",
          
          }}
        >
         GRADUATION DETAILS
        </Typography>
          <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 4}} sx={{margin:"10px", justifyContent:"space-between"}}>
          
          <Grid container item xs={4} direction="column">
            <div>  Passing Year : </div>
            <TextField
             
              required
              id="outlined-required"
              label="Required"
            />
           </Grid>
           <Grid container item xs={4} direction="column">
            <div>  University Name : </div>
            <TextField
             
              required
              id="outlined-required"
              label="Required"
            />
           </Grid>
           <Grid container item xs={4} direction="column">
            <div> Degree : </div>
            <TextField
             
              required
              id="outlined-required"
              label="Required"
            />
           </Grid>
          </Grid>
          <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 4}} sx={{margin:"10px",}}>
           <Grid container item xs={4} direction="column">
            <div> Branch : </div>
            <TextField
             
              required
              id="outlined-required"
              label="Required"
            />
           </Grid>
           <Grid container item xs={4} direction="column">
            <div> CGPA : </div>
            <TextField
             
              required
              id="outlined-required"
              label="Required"
            />
           </Grid>
          </Grid>
          <Typography
          variant="h5"
          style={{
            textAlign: "center",
            justifyContent: "center",
            width: "100%",
            paddingTop: "3%",
            textDecoration:"underline",
            fontSize:"30px",
          
          }}
        >
         PROFESSIONAL DETAILS
         <hr />
        </Typography>
        
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 4}} sx={{margin:"10px", }}>
        <Grid container item xs={4} direction="column">
            <div>  Previous Company : </div>
            <TextField
             
              required
              id="outlined-required"
              label="Required"
            />
           </Grid>
           <Grid container item xs={4} direction="column">
            <div>  Role : </div>
            <TextField
             
              required
              id="outlined-required"
              label="Required"
            />
           </Grid>
           <Grid container item xs={4} direction="column">
            <div>  Experience : </div>
            <TextField
             
              required
              id="outlined-required"
              label="Required"
            />
           </Grid>

          </Grid>
          <Button
          variant="contained"
          href="#contained-buttons"
          color="success"
          sx={{ margin: "5% auto", width: "20%" }}
        >
          Submit
        </Button>

        <Button
          variant="contained"
          href="#contained-buttons"
          color="error"
          sx={{ margin: "5% auto", width: "20%" }}
        >
          Reset
        </Button>
        
       
        </Box>
        
        
    </Box>
    
    
  );
}

export default EmployeeDetails;
