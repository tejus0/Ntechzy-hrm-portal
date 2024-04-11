import UserSideBar from "../../components/UserSideBar";
import { useState, useRef } from "react";
import {Box,Grid,Button, TextField,Checkbox,
    FormControlLabel,
    FormGroup,
    FormLabel,Radio,RadioGroup} from "@mui/material";
import Typography from "@mui/material/Typography";
import toast from "react-hot-toast";
import axios from "axios";

const GrievanceForm = () => {
    const Id = JSON.parse(localStorage.getItem("Id-data"), function (k, v) {
        return typeof v === "object" || isNaN(v) ? v : parseInt(v, 10);
      });

    const [query, setQuery] = useState("")
    const [option, setOption] = useState("")
    
  const [queryError, setQueryError] = useState(false);
  const [optionError, setOptionError] = useState(false);
    console.log({option});

  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);
  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };

  const handleChange=(e)=>{
    setOption(e.target.value)
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      queryError ||
      optionError ||
      query.trim() == "" ||
      option.trim() == ""
    ) {
      toast.error("Please fill the details first", { position: "top-right" });
    } else {
    //   console.log(desc, "text is here");
      await axios
        .post(`http://localhost:7000/api/createGrievance`, {
          Employee_id: Id,
          Category: option,
          Query: query
        })
        .then((response) => {
          // console.log(response,"tasks");
          toast.success("Grievance added successfully !", { position: "top-right" });
          setQuery("");
          setOption("");
        })
        .catch((error) => console.log(error));
    }
  };
  return (
    <Box container sx={{ display: "flex" }}>
      {window.localStorage.getItem("user-type") == "user" ? (
        <UserSideBar
          openSidebarToggle={openSidebarToggle}
          OpenSidebar={OpenSidebar}
        />
      ) : (
        <UserSideBar
          openSidebarToggle={openSidebarToggle}
          OpenSidebar={OpenSidebar}
        />
      )}
      <Box
        component="form"
        onSubmit={handleSubmit}
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
          Grievance Form
          <hr />
        </Typography>
        
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 2 }}>
          <Grid container item xs={12} direction="column">
          <form>
      < FormGroup
        sx={{
          padding: 2,
          borderRadius: 2
        }}
      >
            <div style={{fontSize:"1.5em", marginTop:4}}>Employee Id </div>
            <TextField
              defaultValue
              // onChange={(e) => {
              //   setName(e.target.value);
              // }}
              disabled
              value={Id}
              // value={AfterRemLeaves}
              id="filled-disabled"
              // defaultValue=""
              variant="filled"
              fullWidth
            />
            <div style={{fontSize:"1.5em", marginTop:4}}>Category</div>
            <RadioGroup
            
        row
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="row-radio-buttons-group"
        value={option}
        onChange={handleChange}
      >
          <FormControlLabel
            control={<Radio required name="laptop" value="laptop"/>}
            label="Laptop"
          />
          <FormControlLabel
            control={<Radio required name="headset" value="headset" />}
            label="Head Set"
          />
        </RadioGroup>
        <div style={{fontSize:"1.5em", marginTop:4}}>Query* </div>
        <TextField
                  required
                  onChange={(e)=>{setQuery(e.target.value)}}
                  multiline
                  rows={4}
                  fullWidth
                  id="outlined-required"
                  label="Required"
                />
      </FormGroup>
    </form>
          </Grid>
        </Grid>
        <Grid margin={"auto"}>
        <Button  type="submit"
                      variant="contained"
                      color="success">Submit</Button>
                      </Grid>
       
      </Box>
    </Box>
  );
};

export default GrievanceForm;
