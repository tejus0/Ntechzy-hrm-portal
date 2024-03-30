import { useState, useEffect } from "react";
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
import Sidebar from "../../components/Sidebar";
function AdminSalesForm() {
  const [img, setImg] = useState();
  const [video, setVideo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [link, setLink] = useState("Linik is here");
  const [isDisabled, setIsDisabled] = useState(false);

  const [uploadProgress, setUploadProgress] = useState(0);
  
  const [user_id, setUser_id] = useState("");
  
  const Id = JSON.parse(localStorage.getItem("Id-data"), function (k, v) {
    return v;
  });

  const users = {
    employee_id: Id,
    client_name: "",
    client_father_name:"",
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

  const [nameError, setNameError] = useState(false);
  const [FatherNameError, setFatherNameError] = useState(false);
  const [ClientNoError, setClientNoError] = useState(false);
  const [ClientStateError, setClientStateError] = useState(false);
  const [CourseError, setCourseError] = useState(false);
  const [PaidFeeError, setPaidFeeError] = useState(false);
  const [remFeeError, setRemFeeError] = useState(false);
  const [CollegeError, setCollegeError] = useState(false);
  const [regAmountError, setRegAmountError] = useState(false);
  const [srvcAmountError, setSrvcAmountError] = useState(false);
  const [enrollDateError, setEnrollDateError] = useState(false);
  const [statusError, setStatusError] = useState(false);
  const [bonusStatusError, setBonusStatusError] = useState(false);
  const [incentivesError, setIncentivesError] = useState(false);
  
  const inputHandler = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
    if (e.target.validity.valid) {
      setNameError(false);
      setFatherNameError(false);
      setClientNoError(false);
      setClientStateError(false);
      setCourseError(false);
      setPaidFeeError(false);
      setRemFeeError(false);
      setCollegeError(false);
      setRegAmountError(false);
      setSrvcAmountError(false);
      setEnrollDateError(false);
      setStatusError(false);
      setBonusStatusError(false);
      setIncentivesError(false);
    } else {
      setNameError(true);
      setFatherNameError(true);
      setClientNoError(true);
      setClientStateError(true);
      setCourseError(true);
      setPaidFeeError(true);
      setRemFeeError(true);
      setCollegeError(true);
      setRegAmountError(true);
      setSrvcAmountError(true);
      setEnrollDateError(true);
      setStatusError(true);
      setBonusStatusError(true);
      setIncentivesError(true);
    }
  };


  const resetForm = () => {
    setUser({
      client_no: "",
      client_name: "",
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
    console.log(user_id);
    e.preventDefault();
    if (nameError || user.client_no.trim() == "" || user.client_father_name.trim() == "" || user.assoc_college.trim() == "" || user.bonus_status.trim() == "" || user.client_name.trim() == "" || user.client_state.trim() == "" || user.course.trim() == "" || user.enroll_date.trim() == "" || user.incentives.trim() == "" || user.paid_fee.trim() == "" || user.registration_amount.trim() == "" || user.rem_fee.trim() == "" || user.services_amount.trim() == "" || user.status.trim() == "") {
      console.log(user, "user");
      toast.error("Please fill the details first", { position: "top-right" });
    } else {
      console.log(user, "form");
      await axios
        .post(`http://localhost:7000/api/create-sales`, user)
        .then((response) => {
          console.log(response);
          if(response.status===200){
          toast.success(response.data.msg, { position: "top-right" });
          // navigate("/");
          resetForm();
          }
          else if(response.status===201){
            toast.error(response.data.msg, { position: "top-right" });
          }
        })
        .catch((error) => console.log(error.response.data));
    }

    // navigate("/")
  };

  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };

  useEffect(() => {

    console.log(Id, typeof Id);
    if (Id) {
      console.log("id not setting");
      setUser_id(Id);
      console.log(user_id, "this is not working");
    }
  }, [user_id]);

  return (
    <Box container sx={{ display: "flex" }}>
      <Sidebar
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
              defaultValue={user_id}
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
            {/* <ValidatedTextField  label="Required" onChange={inputHandler}/> */}
            <TextField
              onChange={inputHandler}
              error={nameError}
              helperText={nameError ? "Please enter Client name" : ""}
              fullWidth
              required
              name="client_name"
              id="outlined-required"
              label="Required"
            />
             <div>Client's Father Name : </div>
            {/* <ValidatedTextField  label="Required" onChange={inputHandler}/> */}
            <TextField
              onChange={inputHandler}
              error={nameError}
              helperText={nameError ? "Please enter Client Father's name" : ""}
              fullWidth
              required
              name="client_father_name"
              id="outlined-required"
              label="Required"
            />
            <div>Contact Number: </div>
            <TextField
              required
              onChange={inputHandler}
              error={nameError}
              helperText={nameError ? "Please enter client number" : ""}
              name="client_no"
              id="outlined-basic"
              label="Outlined"
              variant="outlined"
            />
            <div>Home State : </div>
            <TextField
              onChange={inputHandler}
              error={nameError}
              helperText={nameError ? "Please enter client state" : ""}
              fullWidth
              required
              name="client_state"
              id="outlined-required"
              label="Required"
            />
            <div>Course Enrolled For : </div>
            <TextField
              onChange={inputHandler}
              error={nameError}
              helperText={nameError ? "Please enter course" : ""}
              required
              name="course"
              id="outlined-basic"
              label="Outlined"
              variant="outlined"
            />
            <div>Paid Fee : </div>
            <TextField
              required
              onChange={inputHandler}
              error={nameError}
              helperText={nameError ? "Please enter paid fee" : ""}
              name="paid_fee"
              id="outlined-basic"
              label="Outlined"
              variant="outlined"
            />
            <div>Remaining Fee: </div>
            <TextField
              required
              onChange={inputHandler}
              error={nameError}
              helperText={nameError ? "Please enter remaining fee" : ""}
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
              required
              onChange={inputHandler}
              error={nameError}
              helperText={nameError ? "Please enter associated college" : ""}
              name="assoc_college"
              id="outlined-basic"
              label="Outlined"
              variant="outlined"
            />
            <div>Registration Amount : </div>
            <TextField
              required
              onChange={inputHandler}
              error={nameError}
              helperText={nameError ? "Please enter registration amounte" : ""}
              name="registration_amount"
              id="outlined-basic"
              label="Outlined"
              variant="outlined"
            />
            <div>Amount For Services : </div>
            <TextField
              required
              onChange={inputHandler}
              error={nameError}
              helperText={nameError ? "Please enter services amount" : ""}
              name="services_amount"
              id="outlined-basic"
              label="Outlined"
              variant="outlined"
            />
            <div>Date Of Enrollment : </div>
            <TextField
              required
              onChange={inputHandler}
              error={nameError}
              helperText={nameError ? "Please enter enroll date" : ""}
              // value={users.enroll_date}
              name="enroll_date"
              id="outlined-basic"
              label="Outlined"
              variant="outlined"
            />
            <div>Admission Status : </div>
            <TextField
              required
              onChange={inputHandler}
              error={nameError}
              helperText={nameError ? "Please enter status" : ""}
              name="status"
              id="outlined-basic"
              label="Outlined"
              variant="outlined"
            />
            <div>Bonus Status : </div>
            <TextField
              required
              onChange={inputHandler}
              error={nameError}
              helperText={nameError ? "Please enter bonus status" : ""}
              name="bonus_status"
              id="outlined-basic"
              label="Outlined"
              variant="outlined"
            />
            <div>Incentives : </div>
            <TextField
              required
              onChange={inputHandler}
              error={nameError}
              helperText={nameError ? "Please enter incentives" : ""}
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

export default AdminSalesForm;
