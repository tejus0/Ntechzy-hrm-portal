import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from "axios";
import "../addusers/add.css";
import toast from 'react-hot-toast';
import Dropdown from "../../components/Dropdown";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

const UpdateEmployee = () => {

//  const users = {
//     fname: "",
//     lname: "",
//     email: ""
//  }

//  const {id} = useParams();
//  const navigate = useNavigate();
//  const [user, setUser] = useState(users);

//  const inputChangeHandler = (e) =>{
//     const {name, value} = e.target;
//     setUser({...user, [name]:value});
//     console.log(user);
//  }

//  useEffect(()=>{
//     axios.get(`http://localhost:8000/api/getone/${id}`)
//     .then((response)=>{
//         setUser(response.data)
//     })
//     .catch((error)=>{
//         console.log(error);
//     })
//  },[id])


//  const submitForm = async(e)=>{
//     e.preventDefault();
//     await axios.put(`http://localhost:8000/api/update/${id}`, user)
//     .then((response)=>{
//        toast.success(response.data.msg, {position:"top-right"})
//        navigate("/")
//     })
//     .catch(error => console.log(error))
//  }

//   return (
    // <div className='addUser'>
    //     <h3>Update user</h3>
    //     <form className='addUserForm' onSubmit={submitForm}>
    //         <div className="inputGroup">
    //             <label htmlFor="fname">First name</label>
    //             <input type="text" value={user.fname} onChange={inputChangeHandler} id="fname" name="fname" autoComplete='off' placeholder='First name' />
    //         </div>
    //         <div className="inputGroup">
    //             <label htmlFor="lname">Last name</label>
    //             <input type="text" value={user.lname} onChange={inputChangeHandler} id="lname" name="lname" autoComplete='off' placeholder='Last name' />
    //         </div>
    //         <div className="inputGroup">
    //             <label htmlFor="email">Email</label>
    //             <input type="email" value={user.email} onChange={inputChangeHandler} id="email" name="email" autoComplete='off' placeholder='Email' />
    //         </div>
    //         <div className="inputGroup">
    //             <button type="submit">UPDATE USER</button>
    //         </div>
    //     </form>
    // </div>
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
          <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 4 }}>
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
          </Box>
      </Box>
  )
}

export default UpdateEmployee