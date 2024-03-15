import React, { useState, useEffect } from "react";
import {
  BsFillArchiveFill,
  BsFillGrid3X3GapFill,
  BsPeopleFill,
  BsFillBellFill,
} from "react-icons/bs";
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import { Grid } from "@mui/material";
import PropTypes from "prop-types";
import axios from "axios";
import ToDoList from "./ToDoList/getToDo/ToDoList.jsx"
import Typography from "@mui/material/Typography";
function Home() {
  const data = [
    {
      name: "Page A",
      uv: 4000,
      pv: 2400,
      amt: 2400,
    },
    {
      name: "Page B",
      uv: 3000,
      pv: 1398,
      amt: 2210,
    },
    {
      name: "Page C",
      uv: 2000,
      pv: 9800,
      amt: 2290,
    },
    {
      name: "Page D",
      uv: 2780,
      pv: 3908,
      amt: 2000,
    },
    {
      name: "Page E",
      uv: 1890,
      pv: 4800,
      amt: 2181,
    },
    {
      name: "Page F",
      uv: 2390,
      pv: 3800,
      amt: 2500,
    },
    {
      name: "Page G",
      uv: 3490,
      pv: 4300,
      amt: 2100,
    },
  ];

  const [userCount, setuserCount] = useState([]);
  const [leaveCount, setleaveCount] = useState([]);

  // const fetchData = () => {
  //   const userAPI = axios.get("http://localhost:7000/api/getUserCount");
  //   const leavesAPI = axios.get("http://localhost:7000/api/getLeaveCount");
  //   axios.all([userAPI, leavesAPI]).then(
  //     axios.spread((...allData) => {
  //       const allUserData = allData[0];
  //       const allLeaveData = allData[1];
  //       console.log(allUserData);
  //       console.log(allLeaveData);
  //       setuserCount(allUserData);
  //       setleaveCount(allLeaveData);
  //     })
  //   );
  // };

  useEffect(() => {
    const fetchData = async () => {
      try {
        
         axios.get(`${process.env.REACT_APP_BASE_URL}/getUserCount`).then(users=> setuserCount(users.data)).catch(err=> console.log(err));
        // axios
        //   .get("http://localhost:7000/api/getLeaveCount")
        //   .then((leaves) => setleaveCount(leaves.data))
        //   .catch((err) => console.log(err));
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div style={{ width: "90%" }}>
      <div className="main-cards">
        <div className="card">
          <div className="card-inner">
            <h3>PRODUCTS</h3>
            <BsFillArchiveFill className="card_icon" />
          </div>
          <h1>300</h1>
        </div>
        <div className="card">
          <div className="card-inner">
            <h3>Leaves Pending</h3>
            <BsFillGrid3X3GapFill className="card_icon" />
          </div>
          <h1>{leaveCount}</h1>
        </div>
        <div className="card">
          <div className="card-inner">
            <h3>CUSTOMERS</h3>
            <BsPeopleFill className="card_icon" />
          </div>
          <h1>{userCount}</h1>
        </div>
        <div className="card">
          <div className="card-inner">
            <h3>ALERTS</h3>
            <BsFillBellFill className="card_icon" />
          </div>
          <h1>42</h1>
        </div>
      </div>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          flexGrow: 1,
          p: 5,
          // marginRight: "10px",
          width: "85vw",
          height: "90vh",
          bgcolor: "white",
          borderRadius: 1,
        }}
      >
        <Grid container spacing={3}>
          <Grid xs={4}>
            <ResponsiveContainer>
              <BarChart
                width={100}
                height={20}
                data={data}
                margin={{
                  top: 5,
                  right: 3,
                  left: 2,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="pv" fill="#8884d8" />
                <Bar dataKey="uv" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          </Grid>
          <Grid xs={4}>
            <ResponsiveContainer>
              <LineChart
                width={20}
                height={20}
                data={data}
                margin={{
                  top: 5,
                  right: 3,
                  left: 2,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="pv"
                  stroke="#8884d8"
                  activeDot={{ r: 8 }}
                />
              <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
              </LineChart>
            </ResponsiveContainer>
          </Grid>
          <Grid sx={{}} xs={4}>
          
            <Box
              container
              sx={{
                overflow: "auto",
                my: 2,
                p: 1,
                height: "80%",
              }}
            >
               <Typography
            variant="h5"
            style={{
              textAlign: "center",
              justifyContent: "center",
              width: "100%",
              textDecoration: "underline",
              fontSize: "30px",
              marginBottom:"10px",
            }}
          >
           TO-DO LIST
            <hr />
          </Typography>
             
             <ToDoList/>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}

export default Home;
