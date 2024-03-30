import { Box, Button, Grid, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import Sidebar from "../../../components/Sidebar";

export default function ToDoTask  ()  {
	const [openSidebarToggle, setOpenSidebarToggle] = useState(false);

	const [empId, setEmpId] = useState("")
	const [title, setTitle] = useState("")
	const [desc, setDesc] = useState("")

	 const [EmpError, setEmpError] = useState(false);
  const [TitleError, setTitleNameError] = useState(false);
  const [DescError, setDescError] = useState(false);

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
		Add Task
		<hr />
	  </Typography>

	  {/* <form onSubmit={handleSubmit} noValidate autoComplete="off"> */}
	  <Grid
		container
		rowSpacing={1}
		sx={{ margin: "10px", paddingLeft: "8%" }}
	  >
		
		  <div>Employee Id </div>
		  <TextField
			onChange={(e) => {
			  setEmpId(e.target.value);
			  if (e.target.validity.valid) {
				setEmpError(false);
			  }
			  else{
				setEmpError(true);
			  }
			  }
			}
			// value={AfterRemLeaves}
			error={EmpError}
			helperText={EmpError ? "Please enter Employee ID" : ""}
			fullWidth
			required
			name="Employee-id"
			id="outlined-required"
			label="Required"
		  />
		  <div>Title : </div>
		  {/* <ValidatedTextField  label="Required" onChange={inputHandler}/> */}
		  <TextField
			onChange={(e) => {
				setTitle(e.target.value);
				if (e.target.validity.valid) {
					setTitle(false);
				  }
				  else{
					setTitle(true);
				  }
			  }}
			error={TitleError}
			helperText={TitleError ? "Please enter Title" : ""}
			fullWidth
			required
			name="title"
			id="outlined-required"
			label="Required"
		  />
		   <div>Description : </div>
		  {/* <ValidatedTextField  label="Required" onChange={inputHandler}/> */}
		  <TextField
			onChange={(e) => {
				setDesc(e.target.value);
				if (e.target.validity.valid) {
					setDesc(false);
				  }
				  else{
					setDesc(true);
				  }
			  }}
			error={DescError}
			helperText={DescError ? "Please enter description" : ""}
			fullWidth
			required
			multiline
			rows={4}
			name="description"
			id="outlined-required"
			label="Required"
		  />
		  </Grid>
		  <Grid container spacing={1} align="center" direction="row">
                  <Grid item sx={{ margin: "auto" }}>
                    <Button
                      // onClick={handleSubmit}
                      type="submit"
                      variant="contained"
                      color="success"
                    >
                      Apply
                    </Button>
                  </Grid>
                  <Grid item sx={{ margin: "auto" }}>
                    <Button
                      type="button"
                      variant="contained"
                      color="error"
                    >
                      Reset
                    </Button>
                  </Grid>
                </Grid>
		  </Box>
		  </Box>
  );
};
