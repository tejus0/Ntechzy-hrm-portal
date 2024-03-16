import Dropdown from "../../components/Dropdown";
import { useState } from "react";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

function PayrollAdmin() {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };
  return (
    <Box container sx={{ display: "flex" }}>
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
          SALARY SLIP
          <hr />
        </Typography>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid container item xs={6} direction="column">
            <div>Employee Name : </div>
            <TextField
              fullWidth
              required
              id="outlined-required"
              label="Required"
            />
            <div>Base Salary Amount : </div>
            <TextField
              id="outlined-basic"
              label="Outlined"
              variant="outlined"
            />
            <div>Bonus Name : </div>
            <TextField id="filled-basic" label="Filled" variant="filled" />
            <div>Amount : </div>
            <TextField
              id="standard-basic"
              label="Standard"
              variant="standard"
            />
          </Grid>
          <Grid container item xs={6} direction="column">
            <div>Attendence Deduction : </div>
            <TextField
              id="outlined-basic"
              label="Outlined"
              variant="outlined"
            />
            <div>Total Amount : </div>
            <TextField
              id="outlined-basic"
              label="Outlined"
              variant="outlined"
            />
            <div>Date : </div>
            <TextField
              id="outlined-basic"
              label="Outlined"
              variant="outlined"
            />
            <div>XYZ : </div>
            <TextField
              id="standard-basic"
              label="Standard"
              variant="standard"
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

export default PayrollAdmin;
