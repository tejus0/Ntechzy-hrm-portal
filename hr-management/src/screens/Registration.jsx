import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Box } from "@mui/material";

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

const sayHello = () => {
  try {
    alert("Your registration is successfull, Kindly verify your mail !");
  } catch (error) {
    console.log(error.response.data);
  }
};

// Email Validation
const isEmail = (email) =>
  /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email);

const Registration = () => {
  const [employee_id, setEId] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setPhone] = useState("");
  const [password, setPass] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  // // Inputs Errors
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  // // Overall Form Validity
  const [formValid, setFormValid] = useState();
  const [success, setSuccess] = useState();
  // Handles Display and Hide Password
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  // Validation for onBlur Email
  const handleEmail = () => {
    console.log(isEmail(email));
    if (!isEmail(email)) {
      setEmailError(true);
      return;
    }

    setEmailError(false);
  };
  // Validation for onBlur Password
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

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("axios");
    await axios
      .post("http://localhost:7000/api/register", {
        employee_id,
        username,
        email,
        mobile,
        password,
      })
      .then((response) => {
        console.log(response);
        // toast.success(response.data.msg, { position: "top-right" });
        // navigate("/");
        if (response.status == 200) {
          alert("Registration successfull !");
          window.location.href = "./";
        }
      })
      .catch((error) => console.log(error.message));
  };

  return (
    <Box
      container
      sx={{
        p: 15,
        m: "auto",
        marginTop: "3em",
        alignItems: "center",
        bgcolor: "grey",
        width: "40%",
        borderRadius: 5,
      }}
    >
      <h1>User Registration Form</h1>

      <form action="" method="post" enctype="multipart/form-data">
        <div style={{ marginTop: "5px" }}>
          <TextField
            type="text"
            name="eId"
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
            type="text"
            name="name"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            label="Enter username"
            fullWidth
            id="standard-basic"
            variant="standard"
            sx={{ width: "100%" }}
            InputProps={{}}
            size="small"
          />
        </div>

        <div style={{ marginTop: "5px" }}>
          <TextField
            // type="email"
            name="email"
            label="Email Address"
            fullWidth
            error={emailError}
            id="standard-basic"
            variant="standard"
            sx={{ width: "100%" }}
            value={email}
            InputProps={{}}
            size="small"
            onBlur={handleEmail}
            onChange={(event) => {
              setEmail(event.target.value);
            }}
          />
        </div>

        <div style={{ marginTop: "5px" }}>
          <TextField
            type="text"
            name="mno"
            value={mobile}
            onChange={(e) => setPhone(e.target.value)}
            label="Enter mobile number"
            fullWidth
            id="standard-basic"
            variant="standard"
            sx={{ width: "100%" }}
            InputProps={{}}
            size="small"
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
            onClick={handleSubmit}
            type="button"
            variant="contained"
            fullWidth
            startIcon={<LoginIcon />}
          >
            Sign Up
          </Button>
        </div>
        {/* <input
          type="text"
          name="eId"
          value={employee_id}
          onChange={(e) => setEId(e.target.value)}
          placeholder="Enter Your Employee ID"
          required
        />
        <br />
        <br />
        <input
          type="text"
          name="name"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter Your name"
          required
        />
        <br />
        <br />
        <input
          type="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter Your email"
          required
        />
        <br />
        <br />
        <input
          type="text"
          name="mno"
          value={mobile}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="Enter Your number"
          required
        />
        <br />
        <br />
        {/* <input type="file" name="image" required />
        <br />
        <br /> */}
        {/* <input
          type="password"
          name="password"
          value={password}
          onChange={(e) => setPass(e.target.value)}
          placeholder="Enter Your password"
          required
        />
        <br />
        <br />
        <button onClick={handleSubmit} type="button">
          Submit
        </button>
        <br />
        <br /> */}
      </form>
    </Box>
  );
};

export default Registration;
