import { useState } from "react";
import React from "react";
// import Header from "../components/Header";
// import Sidebar from "../components/Sidebar"; 
import { Box } from "@mui/material";
import axios from "axios";

import {
  TextField,
  InputAdornment,
  FormControl,
  InputLabel,
  IconButton,
  Button,
  Input,
  Checkbox,
  Alert,
  Stack,
} from "@mui/material";

// Material UI Icon Imports
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import LoginIcon from "@mui/icons-material/Login";

// Email Validation
const isEmail = (email) =>
  /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email);

function Login() {
  const [employee_id, setEId] = useState("");
  const [password, setPass] = useState("");

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   // console.log("axios");
  //   await axios
  //     .post("http://localhost:7000/api/login", { employee_id, password })
  //     .then((response) => {
  //       // response.json()
  //       console.log(response.data, "userData");
  //       if (response.data.status == "ok") {
  //         alert("login successfull !");
  //         window.localStorage.setItem("token", response.data.data);
  //         window.location.href = "./admin-page";
  //       }
  //       //   // toast.success(response.data.msg, { position: "top-right" });
  //       // navigate("/admin-page");
  //     });
  //   // .catch((error) => console.log(error.message));
  // };

  // export default function Login() {
  const [showPassword, setShowPassword] = useState(false);

  // //Inputs
  const [emailInput, setEmailInput] = useState("");
  // const [passwordInput, setPasswordInput] = useState("");

  // // Inputs Errors
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  // // Overall Form Validity
  const [formValid, setFormValid] = useState();
  const [success, setSuccess] = useState();

  // // Handles Display and Hide Password
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  // // Label for Checkbox
  // const label = { inputProps: { "aria-label": "Checkbox demo" } };

  // // Validation for onBlur Email
  const handleEmail = () => {
    // console.log(isEmail(emailInput));
    if (!isEmail(emailInput)) {
      setEmailError(true);
      return;
    }

    setEmailError(false);
  };

  // // Validation for onBlur Password
  const handlePassword = () => {
    if (
      !password
      // ||
      // passwordInput.length < 5 ||
      // passwordInput.length > 20
    ) {
      setPasswordError(true);
      return;
    }

    setPasswordError(false);
  };

  // //handle Submittion
  const handleSubmit =async  (e) => {
    e.preventDefault();
    setSuccess(null);
    //First of all Check for Errors

    // If Email error is true
    if (emailError || !emailInput) {
      setFormValid("Email is Invalid. Please Re-Enter");
      return;
    }

    // If Password error is true
    if (passwordError || !password) {
      setFormValid(
        "Password is set btw 5 - 20 characters long. Please Re-Enter"
      );
      return;
    }
    setFormValid(null);
    setSuccess("Form Submitted Successfully");

    // Proceed to use the information passed
        // console.log("axios");
        await axios.post("http://localhost:7000/api/login",{employee_id:employee_id,email:emailInput,password:password}).then((response) => {
          // response.json()
          console.log(response.data,"userData");
          if(response.data.status=='ok'){
            alert("login successfull !")
            window.localStorage.setItem("token",response.data.data);
            window.localStorage.setItem("loggedIn",true)
            window.location.href="./admin-page"
          }
        //   // toast.success(response.data.msg, { position: "top-right" });
          // navigate("/admin-page");
        })
  .catch((error) => console.log(error.message));

  // Show Successfull Submittion
  };

  return (
    <Box
      container
      sx={{
        p: 15,
        m: "auto",
        marginTop:"3em",
        alignItems: "center",
        bgcolor:"grey",
        width: "40%",
        borderRadius: 5,
      }}
    >
      <form onSubmit={handleSubmit} action="" method="">
        <div style={{ marginTop: "5px" }}>
          <TextField
            label="Employee ID"
            fullWidth
            id="standard-basic"
            variant="standard"
            sx={{ width: "100%" }}
            value={employee_id}
            onChange={(e) => setEId(e.target.value)}
            InputProps={{}}
            size="small"
          />
        </div>

        <div style={{ marginTop: "5px" }}>
          <TextField
            label="Email Address"
            fullWidth
            error={emailError}
            id="standard-basic"
            variant="standard"
            sx={{ width: "100%" }}
            value={emailInput}
            InputProps={{}}
            size="small"
            onBlur={handleEmail}
            onChange={(event) => {
              setEmailInput(event.target.value);
            }}
          />
        </div>
        <div style={{ marginTop: "5px" }}>
          <FormControl sx={{ width: "100%" }} variant="standard">
            <InputLabel
              error={passwordError}
              htmlFor="standard-adornment-password"
            >
              Password
            </InputLabel>
            <Input
              error={passwordError}
              value={password}
              name="password"
              onBlur={handlePassword}
              id="standard-adornment-password"
              type={showPassword ? "text" : "password"}
              onChange={(event) => {
                setPass(event.target.value);
              }}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
        </div>

        <div style={{ marginTop: "10px" }}>
          <Button
            type="submit"
            variant="contained"
            fullWidth
            startIcon={<LoginIcon />}
          >
            LOGIN
          </Button>
        </div>
        {/* <input
          type="number"
          name="eid"
          required
          value={employee_id}
          onChange={(e) => setEId(e.target.value)}
          placeholder="Enter Employee-Id"
        />
        <br /> */}
        {/* <input type="name" name="name" required placeholder="Enter Name" /> */}
        {/* <br /> */}
        {/* <input type="email" name="email" required placeholder="Enter email" />
        <br />
        <br /> */}
        {/* <input
          type="password"
          name="password"
          value={password}
          onChange={(e) => setPass(e.target.value)}
          required
          placeholder="Enter password"
        />
        <br />
        <br />
        <button type="submit" value="Login">
          Submit
        </button> */}
      </form>

      <a href="/forget-pass">Forgot Password</a>

      <a href="/register">Register</a>
    </Box>

    // <div>
    //      <Box
    //   container
    //   sx={{
    //     p: 5,
    //     m: "auto",
    //     // bgcolor:"black",
    //     alignItems:"center",

    //     width: "60%",
    //     borderRadius: 1,
    //   }}
    // >
    //    <form onSubmit={handleSubmit} action="" method="">
    //    <div style={{ marginTop: "5px" }}>
    //     <TextField
    //       label="Employee ID"
    //       fullWidth
    //       id="standard-basic"
    //       variant="standard"
    //       sx={{ width: "100%" }}
    //       value={employee_id}
    //       InputProps={{}}
    //       size="small"
    //       onChange={(event) => {
    //         setEId(event.target.value);
    //       }}
    //     />
    //   </div>
    //   <div style={{ marginTop: "5px" }}>
    //     <TextField
    //       label="Email Address"
    //       fullWidth
    //       error={emailError}
    //       id="standard-basic"
    //       variant="standard"
    //       sx={{ width: "100%" }}
    //       value={emailInput}
    //       InputProps={{}}
    //       size="small"
    //       onBlur={handleEmail}
    //       onChange={(event) => {
    //         setEmailInput(event.target.value);
    //       }}
    //     />
    //   </div>
    //   <div style={{ marginTop: "5px" }}>
    //     <FormControl sx={{ width: "100%" }} variant="standard">
    //       <InputLabel
    //         error={passwordError}
    //         htmlFor="standard-adornment-password"
    //       >
    //         Password
    //       </InputLabel>
    //       <Input
    //         error={passwordError}
    //         value={passwordInput}
    //         onBlur={handlePassword}
    //         id="standard-adornment-password"
    //         type={showPassword ? "text" : "password"}
    //         onChange={(event) => {
    //           setPasswordInput(event.target.value);
    //         }}
    //         endAdornment={
    //           <InputAdornment position="end">
    //             <IconButton
    //               aria-label="toggle password visibility"
    //               onClick={handleClickShowPassword}
    //               onMouseDown={handleMouseDownPassword}
    //             >
    //               {showPassword ? <VisibilityOff /> : <Visibility />}
    //             </IconButton>
    //           </InputAdornment>
    //         }
    //       />
    //     </FormControl>
    //   </div>

    //   <div style={{ marginTop: "10px" }}>
    //     <Button
    //       variant="contained"
    //       fullWidth
    //       startIcon={<LoginIcon />}
    //     >
    //       LOGIN
    //     </Button>
    //   </div>

    //   {/* Show Form Error if any */}
    //   {formValid && (
    //     <Stack sx={{ width: "100%", paddingTop: "10px" }} spacing={2}>
    //       <Alert severity="error" size="small">
    //         {formValid}
    //       </Alert>
    //     </Stack>
    //   )}

    //   {/* Show Success if no issues */}
    //   {success && (
    //     <Stack sx={{ width: "100%", paddingTop: "10px" }} spacing={2}>
    //       <Alert severity="success" size="small">
    //         {success}
    //       </Alert>
    //     </Stack>
    //   )}

    //   <div style={{ marginTop: "2em", fontSize: "1rem" }} margin="left">
    //     <a>Forgot Password</a>
    //     <br />
    //     <br />
    //     Don't have an account ?{" "}
    //     <div style={{ textDecoration: "underline", color: "blue" }}>
    //       Sign Up
    //     </div>
    //   </div>
    //   </form>
    //   </Box>

    // </div>
  );
}

export default Login;
