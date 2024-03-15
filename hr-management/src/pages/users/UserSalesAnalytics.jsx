import Dropdown from "../../components/Dropdown";
import { useState, useEffect } from "react";
import Header from "../../components/Header";
import Usersidebar from "../../components/UserSideBar";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
// import FileBase64 from "react-file-base64";
// import { ThreeDots } from "react-loader-spinner";
import { LinearProgress } from "@mui/material";
function SalesAnalytics() {
  const [img, setImg] = useState();
  const [video, setVideo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [link, setLink] = useState("Linik is here");
  const [isDisabled, setIsDisabled] = useState(false);

  const [uploadProgress, setUploadProgress] = useState(0);

  const [user_id, setUser_id] = useState(0);

  const users = {
    employee_id: user_id,
    client_name: "",
    client_no: "",
    client_state: "",
    course: "",
    paid_fee: "",
    rem_fee: "",
    assoc_college: "",
    registration_amount: "",
    services_amount: "",
    enroll_date: "",
    status: "",
    bonus_status: "",
    incentives: "",
  };
  const [user, setUser] = useState(users);
  const navigate = useNavigate();

  const inputHandler = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const resetForm = () => {
    setUser({
      client_no: "",
      client_state: "",
      course: "",
      paid_fee: "",
      rem_fee: "",
      assoc_college: "",
      registration_amount: "",
      services_amount: "",
      enroll_date: "",
      status: "",
      bonus_status: "",
      incentives: "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios
      .post("http://localhost:7000/api/create-sales", user)
      .then((response) => {
        console.log(response);
        toast.success(response.data.msg, { position: "top-right" });
        // navigate("/");
        resetForm();
      })
      .catch((error) => console.log(error.response.data));
  };

  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };

  useEffect(() => {
    const Id = JSON.parse(localStorage.getItem("Id-data"), function (k, v) {
      return typeof v === "object" || isNaN(v) ? v : parseInt(v, 10);
    });
    console.log(Id, typeof Id);
    if (Id) {
      console.log("id not setting");
      setUser_id(Id);
      console.log(user_id, "this is not working");
    }
  }, []);

  return (
    <Box container sx={{ display: "flex" }}>
      <Usersidebar
        openSidebarToggle={openSidebarToggle}
        OpenSidebar={OpenSidebar}
      />

      <Box
        component="form"
        // onSubmit={handleSubmit}
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
          variant="h2"
          style={{
            textAlign: "center",
            justifyContent: "center",
            width: "100%",
            paddingTop: "2%",
            textDecoration: "underline",
            fontSize: "23px",
          }}
        >
          SALES REPORT
          <hr />
        </Typography>

        {/* <form onSubmit={handleSubmit} noValidate autoComplete="off"> */}
        <Grid
          container
          rowSpacing={1}
          columnSpacing={{ xs: 1, sm: 3, md: 4 }}
          sx={{ margin: "10px", paddingLeft: "8%" }}
        >
          <Grid
            container
            item
            xs={5}
            direction="column"
            sx={{ margin: "20px" }}
          >
            <div>Employee Id </div>
            <TextField
              defaultValue
              // onChange={(e) => {
              //   setName(e.target.value);
              // }}
              disabled
              value={user_id}
              // value={AfterRemLeaves}
              id="filled-disabled"
              // defaultValue=""
              variant="filled"
              fullWidth
            />
            <div>Client's Name : </div>
            <TextField
              onChange={inputHandler}
              fullWidth
              required
              name="client_name"
              id="outlined-required"
              label="Required"
            />
            <div>Contact Number: </div>
            <TextField
              onChange={inputHandler}
              name="client_no"
              id="outlined-basic"
              label="Outlined"
              variant="outlined"
            />
            <div>Home State : </div>
            <TextField
              onChange={inputHandler}
              fullWidth
              required
              name="client_state"
              id="outlined-required"
              label="Required"
            />
            <div>Course Enrolled For : </div>
            <TextField
              onChange={inputHandler}
              name="course"
              id="outlined-basic"
              label="Outlined"
              variant="outlined"
            />
            <div>Paid Fee : </div>
            <TextField
              onChange={inputHandler}
              name="paid_fee"
              id="outlined-basic"
              label="Outlined"
              variant="outlined"
            />
            <div>Remaining Fee: </div>
            <TextField
              onChange={inputHandler}
              name="rem_fee"
              id="outlined-basic"
              label="Outlined"
              variant="outlined"
            />
          </Grid>
          <Grid
            container
            item
            xs={5}
            direction="column"
            sx={{ margin: "20px" }}
          >
            <div>Enrolled For Associate College: </div>
            <TextField
              onChange={inputHandler}
              name="assoc_college"
              id="outlined-basic"
              label="Outlined"
              variant="outlined"
            />
            <div>Registration Amount : </div>
            <TextField
              onChange={inputHandler}
              name="registration_amount"
              id="outlined-basic"
              label="Outlined"
              variant="outlined"
            />
            <div>Amount For Services : </div>
            <TextField
              onChange={inputHandler}
              name="services_amount"
              id="outlined-basic"
              label="Outlined"
              variant="outlined"
            />
            <div>Date Of Enrollment : </div>
            <TextField
              onChange={inputHandler}
              value={users.enroll_date}
              name="enroll_date"
              id="outlined-basic"
              label="Outlined"
              variant="outlined"
            />
            <div>Admission Status : </div>
            <TextField
              onChange={inputHandler}
              name="status"
              id="outlined-basic"
              label="Outlined"
              variant="outlined"
            />
            <div>Bonus Status : </div>
            <TextField
              onChange={inputHandler}
              name="bonus_status"
              id="outlined-basic"
              label="Outlined"
              variant="outlined"
            />
            <div>Incentives : </div>
            <TextField
              onChange={inputHandler}
              name="incentives"
              id="outlined-basic"
              label="Outlined"
              variant="outlined"
            />
          </Grid>
        </Grid>
        <Button
          onClick={handleSubmit}
          type="submit"
          variant="contained"
          color="success"
          sx={{ margin: "5% auto", width: "20%" }}
        >
          Submit
        </Button>

        <Button
          onClick={resetForm}
          variant="contained"
          color="error"
          sx={{ margin: "5% auto", width: "20%" }}
        >
          Reset
        </Button>
        {/* </form> */}
      </Box>
      {/* {loading && <ThreeDots color="#36d7b7" />} */}
    </Box>
  );
}

export default SalesAnalytics;
