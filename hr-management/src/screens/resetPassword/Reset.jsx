import { Box, Button, Grid, Stack, TextField, Typography } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Reset = () => {
  const [user_id, setUser_id] = useState(0);

    // //Inputs
    const [emailInput, setEmailInput] = useState("");
    // const [passwordInput, setPasswordInput] = useState("");
  
    // // Inputs Errors
    const [emailError, setEmailError] = useState(false);

    // Email Validation
const isEmail = (emailInput) =>
/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(emailInput);

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(emailInput);
    axios
      .post("http://localhost:7000/api/forgot-password", { email:emailInput })
      .then((data) => {
        console.log(data, "userReset");
        alert(data.data.status)
      });
  };

  const handleEmail = () => {
    // console.log(isEmail(emailInput));
    if (!isEmail(emailInput)) {
      setEmailError(true);
      return;
    }

    setEmailError(false);
  };


  return (
    <div>
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
        <h3>Forgot Password</h3>
        <form>
        <Grid container spacing={1}>
        <Grid item xs={12} sx={{ ml: "3em", mr: "3em" }}>
        <div style={{ marginTop: "5px" }}>
          <TextField
            required
            label="Employee ID"
            fullWidth
            id="standard-basic"
            onChange={(e)=> setUser_id(e.target.value)}
            // variant="standard"
            sx={{ width: "100%" }}
            // InputProps={{}}
            // size="small"
          />
          </div>
          </Grid>
          <Grid item xs={12} sx={{ ml: "3em", mr: "3em" }}>
        <div style={{ marginTop: "5px" }}>
         <TextField
            label="Email Address"
            fullWidth
            error={emailError}
            id="standard-basic"
            // variant="standard"
            sx={{ width: "100%" }}
            value={emailInput}
            // InputProps={{}}
            // size="small"
            onBlur={handleEmail}
            autoComplete="email"
            onChange={(event) => {
              setEmailInput(event.target.value);
            }}
          />
        </div>
        </Grid>
          <div style={{ marginTop: "10px" }}>
            <Button
              onClick={handleSubmit}
              type="button"
              variant="contained"
              fullWidth
            >
             Reset Password
            </Button>
          </div>
          <Grid item xs={12}>
            <Stack direction="row" spacing={1}>
              <Typography
                variant="body1"
                component="span"
                style={{ marginTop: "10px" }}
              >
                Not registered yet?{" "}
                <span
                  style={{ color: "#beb4fb", cursor: "pointer" }}
                  onClick={() => {
                    navigate("/register");
                  }}
                >
                  Create an Account
                </span>
              </Typography>
            </Stack>
          </Grid>
          </Grid>
        </form>
      </Box>
    </div>
  );
};

export default Reset;
