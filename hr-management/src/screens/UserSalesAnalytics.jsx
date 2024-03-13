import Dropdown from "../components/Dropdown";
import { useState } from "react";
import Header from "../components/Header";
import Usersidebar from "../components/Usersidebar";
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
function EmployeeDetails() {
  const [img, setImg] = useState();
  const [video, setVideo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [link, setLink] = useState("Linik is here");
  const [isDisabled, setIsDisabled] = useState(false);

  const [uploadProgress, setUploadProgress] = useState(0);

  const users = {
    name: "",
    fatherName: "",
    mobile: "",
    profileImage: "",
    designation: "",
    employeeNo: "",
    dob: "",
    address: "",
    date_of_join: "",
    passingYearX: "",
    schoolNameX: "",
    gradeX: "",
    passingYearXII: "",
    schoolNameXII: "",
    gradeXII: "",
    passingYearCollege: "",
    university: "",
    degree: "",
    branch: "",
    gradeUniversity: "",
    company: "",
    role: "",
    experience: "",
    email: "",
    password: "",
  };
  const [user, setUser] = useState(users);
  const navigate = useNavigate();

  const inputHandler = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "images_preset");

    try {
      let cloudName = process.env.REACT_APP_COUDINARY_CLOUD_NAME;
      let api = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;
      console.log(api);
      const res = await axios.post(api, formData);
      // .then((res) => setImg(res.data.secure_url))
      // .catch((error) => console.log(error));
      const { secure_url } = res.data;
      setImg(secure_url);
      console.log(secure_url);
      setLink(secure_url);
      setIsDisabled(true);
      // return secure_url;
    } catch (error) {
      console.log(error.response.data);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios
      .post("http://localhost:7000/api/create", user)
      .then((response) => {
        console.log(response);
        toast.success(response.data.msg, { position: "top-right" });
        navigate("/");
      })
      .catch((error) => console.log(error.response.data));
  };

  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };
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
          sx={{ margin: "10px", paddingLeft:"8%" }}
        >
          <Grid container item xs={5} direction="column"  sx={{ margin: "20px" }}>
            <div>Client's Name : </div>
            <TextField
              onChange={inputHandler}
              fullWidth
              required
              name="name"
              id="outlined-required"
              label="Required"
            />
            <div>Contact Number: </div>
            <TextField
              onChange={inputHandler}
              name="fatherName"
              id="outlined-basic"
              label="Outlined"
              variant="outlined"
            />
            <div>Home State : </div>
            <TextField
              onChange={inputHandler}
              fullWidth
              required
              name="name"
              id="outlined-required"
              label="Required"
            />
            <div>Receipt Number : </div>
            <TextField
              onChange={inputHandler}
              name="mobile"
              id="outlined-basic"
              label="Outlined"
              variant="outlined"
            />
            <div>Course Enrolled For : </div>
            <TextField
              onChange={inputHandler}
              name="designation"
              id="outlined-basic"
              label="Outlined"
              variant="outlined"
            />
             <div>Paid Fee : </div>
            <TextField
              onChange={inputHandler}
              name="employeeNo"
              id="outlined-basic"
              label="Outlined"
              variant="outlined"
            />
            <div>Remaining Fee: </div>
            <TextField
              onChange={inputHandler}
              name="dob"
              id="outlined-basic"
              label="Outlined"
              variant="outlined"
            />
          </Grid>
          <Grid container item xs={5} direction="column"  sx={{ margin: "20px" }}>
           
            <div>Enrolled For Associate College: </div>
            <TextField
              onChange={inputHandler}
              name="address"
              id="outlined-basic"
              label="Outlined"
              variant="outlined"
            />
            <div>Registration Amount : </div>
            <TextField
              onChange={inputHandler}
              name="date_of_join"
              id="outlined-basic"
              label="Outlined"
              variant="outlined"
            />
            <div>Amount For Services : </div>
            <TextField
              onChange={inputHandler}
              name="email"
              id="outlined-basic"
              label="Outlined"
              variant="outlined"
            />
            <div>Date Of Enrollment : </div>
            <TextField
              onChange={inputHandler}
              name="email"
              id="outlined-basic"
              label="Outlined"
              variant="outlined"
            />
            <div>Admission Status : </div>
            <TextField
              onChange={inputHandler}
              name="email"
              id="outlined-basic"
              label="Outlined"
              variant="outlined"
            />
            <div>Bonus Status : </div>
            <TextField
              onChange={inputHandler}
              name="email"
              id="outlined-basic"
              label="Outlined"
              variant="outlined"
            />
            <div>Incentives : </div>
            <TextField
              onChange={inputHandler}
              name="dob"
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

export default EmployeeDetails;
