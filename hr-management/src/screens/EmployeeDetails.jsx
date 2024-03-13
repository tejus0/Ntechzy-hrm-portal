import Dropdown from "../components/Dropdown";
import { useState } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
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
      .post(`${process.env.REACT_APP_BASE_URL}/create`, user)
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
          PERSONAL DETAILS
          <hr />
        </Typography>

        {/* <form onSubmit={handleSubmit} noValidate autoComplete="off"> */}
        <Grid
          container
          rowSpacing={1}
          columnSpacing={{ xs: 1, sm: 3, md: 4 }}
          sx={{ margin: "10px" }}
        >
          <Grid container item xs={4} direction="column">
            <div>Employee Name : </div>
            <TextField
              onChange={inputHandler}
              fullWidth
              required
              name="name"
              id="outlined-required"
              label="Required"
            />
            <div>Father Name : </div>
            <TextField
              onChange={inputHandler}
              name="fatherName"
              id="outlined-basic"
              label="Outlined"
              variant="outlined"
            />
            <div>Gender : </div>
            <TextField
              onChange={inputHandler}
              name="gender"
              id="filled-basic"
              label="Filled"
              variant="filled"
            />
            <div>Mobile : </div>
            <TextField
              onChange={inputHandler}
              name="mobile"
              id="outlined-basic"
              label="Outlined"
              variant="outlined"
            />
            <div>Designation : </div>
            <TextField
              onChange={inputHandler}
              name="designation"
              id="outlined-basic"
              label="Outlined"
              variant="outlined"
            />
          </Grid>
          <Grid container item xs={4} direction="column">
            <div>Employee No. : </div>
            <TextField
              onChange={inputHandler}
              name="employeeNo"
              id="outlined-basic"
              label="Outlined"
              variant="outlined"
            />
            <div>Date Of Birth : </div>
            <TextField
              onChange={inputHandler}
              name="dob"
              id="outlined-basic"
              label="Outlined"
              variant="outlined"
            />
            <div>Address : </div>
            <TextField
              onChange={inputHandler}
              name="address"
              id="outlined-basic"
              label="Outlined"
              variant="outlined"
            />
            <div>Date Of Joining : </div>
            <TextField
              onChange={inputHandler}
              name="date_of_join"
              id="outlined-basic"
              label="Outlined"
              variant="outlined"
            />
            <div>Email : </div>
            <TextField
              onChange={inputHandler}
              name="email"
              id="outlined-basic"
              label="Outlined"
              variant="outlined"
            />
          </Grid>
          <Grid
            container
            item
            xs={4}
            direction="column"
            sx={{ alignItems: "center" }}
          >
            <TextField type="file" onChange={handleFileUpload} />
            <Box
              sx={{
                margin: "25px",
                // height: 300,
                // width: 350,
                maxHeight: { xs: 233, md: 400 },
                maxWidth: { xs: 350, md: 400 },
              }}
            >
              <img src={img} alt="Image is here" className="w-100 h-100" />
              <input
                name="profileImage"
                onChange={inputHandler}
                disabled={isDisabled}
                id="outlined-disabled"
                label="Disabled"
                value={link}
              />
            </Box>
            {/* <Button
              onClick={handleImg}
              variant="contained"
              color="primary"
              component="span"
            >
              Upload
            </Button>
            {uploadProgress && (
              <LinearProgress variant="determinate" value={uploadProgress} />
            )} */}
            {/* <TextField
                id="originalFileName"
                type="file"
                inputProps={{ accept: 'image/*, .xlsx, .xls, .csv, .pdf, .pptx, .pptm, .ppt' }}
                required
                label="Document"
                name="originalFileName"
                onChange={e => this.handleFileRead(e)}
                size="small"
                variant="standard"
              /> */}
            {/* <Box
              sx={{
                margin: "25px",
                height: 300,
                width: 350,
                maxHeight: { xs: 233, md: 400 },
                maxWidth: { xs: 350, md: 400 },
              }}
            /> */}
            {/* <label htmlFor="img">Image:</label> */}
            {/* <input
              type="file"
              name="image"
              accept="image/*"
              id="img"
              onChange={handleImg()}
            /> */}

            {/* <Button
              onClick={handleImg}
              type="submit"
              variant="contained"
              color="success"
              sx={{ margin: "5% auto", width: "20%" }}
            >
              Upload
            </Button> */}
          </Grid>
        </Grid>

        <Typography
          variant="h5"
          style={{
            textAlign: "center",
            justifyContent: "center",
            width: "100%",
            paddingTop: "3%",
            textDecoration: "underline",
            fontSize: "30px",
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
            textDecoration: "underline",
            fontSize: "23px",
          }}
        >
          Xth DETAILS
        </Typography>
        <Grid
          container
          rowSpacing={1}
          columnSpacing={{ xs: 1, sm: 2, md: 4 }}
          sx={{ margin: "10px" }}
        >
          <Grid container item xs={4} direction="column">
            <div> Passing Year : </div>
            <TextField
              onChange={inputHandler}
              name="passingYearX"
              required
              id="outlined-required"
              label="Required"
            />
          </Grid>
          <Grid container item xs={4} direction="column">
            <div> School Name : </div>
            <TextField
              onChange={inputHandler}
              name="schoolNameX"
              required
              id="outlined-required"
              label="Required"
            />
          </Grid>
          <Grid container item xs={4} direction="column">
            <div> Percentage/CGPA : </div>
            <TextField
              onChange={inputHandler}
              name="gradeX"
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
            textDecoration: "underline",
            fontSize: "23px",
          }}
        >
          XIIth / DIPLOMA DETAILS
        </Typography>
        <Grid
          container
          rowSpacing={1}
          columnSpacing={{ xs: 1, sm: 2, md: 4 }}
          sx={{ margin: "10px" }}
        >
          <Grid container item xs={4} direction="column">
            <div> Passing Year : </div>
            <TextField
              onChange={inputHandler}
              name="passingYearXII"
              required
              id="outlined-required"
              label="Required"
            />
          </Grid>
          <Grid container item xs={4} direction="column">
            <div> School Name : </div>
            <TextField
              onChange={inputHandler}
              name="schoolNameXII"
              required
              id="outlined-required"
              label="Required"
            />
          </Grid>
          <Grid container item xs={4} direction="column">
            <div> Percentage : </div>
            <TextField
              onChange={inputHandler}
              name="gradeXII"
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
            textDecoration: "underline",
            fontSize: "23px",
          }}
        >
          GRADUATION DETAILS
        </Typography>
        <Grid
          container
          rowSpacing={1}
          columnSpacing={{ xs: 1, sm: 2, md: 4 }}
          sx={{ margin: "10px", justifyContent: "space-between" }}
        >
          <Grid container item xs={4} direction="column">
            <div> Passing Year : </div>
            <TextField
              onChange={inputHandler}
              name="passingYearCollege"
              required
              id="outlined-required"
              label="Required"
            />
          </Grid>
          <Grid container item xs={4} direction="column">
            <div> University Name : </div>
            <TextField
              onChange={inputHandler}
              name="university"
              required
              id="outlined-required"
              label="Required"
            />
          </Grid>
          <Grid container item xs={4} direction="column">
            <div> Degree : </div>
            <TextField
              onChange={inputHandler}
              name="degree"
              required
              id="outlined-required"
              label="Required"
            />
          </Grid>
        </Grid>
        <Grid
          container
          rowSpacing={1}
          columnSpacing={{ xs: 1, sm: 2, md: 4 }}
          sx={{ margin: "10px" }}
        >
          <Grid container item xs={4} direction="column">
            <div> Branch : </div>
            <TextField
              onChange={inputHandler}
              name="branch"
              required
              id="outlined-required"
              label="Required"
            />
          </Grid>
          <Grid container item xs={4} direction="column">
            <div> CGPA : </div>
            <TextField
              onChange={inputHandler}
              name="gradeUniversity"
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
            textDecoration: "underline",
            fontSize: "30px",
          }}
        >
          PROFESSIONAL DETAILS
          <hr />
        </Typography>

        <Grid
          container
          rowSpacing={1}
          columnSpacing={{ xs: 1, sm: 2, md: 4 }}
          sx={{ margin: "10px" }}
        >
          <Grid container item xs={4} direction="column">
            <div> Previous Company : </div>
            <TextField
              onChange={inputHandler}
              name="company"
              required
              id="outlined-required"
              label="Required"
            />
          </Grid>
          <Grid container item xs={4} direction="column">
            <div> Role : </div>
            <TextField
              onChange={inputHandler}
              name="role"
              required
              id="outlined-required"
              label="Required"
            />
          </Grid>
          <Grid container item xs={4} direction="column">
            <div> Experience : </div>
            <TextField
              onChange={inputHandler}
              name="experience"
              required
              id="outlined-required"
              label="Required"
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
