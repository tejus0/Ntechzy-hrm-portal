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
import { Grid, Paper, Stack, ThemeProvider } from "@mui/material";
import axios from "axios";
import ToDoList from "../ToDoList/getToDo/ToDoList";
import ReceiptIcon from "@mui/icons-material/Receipt";
import { styled } from "@mui/material/styles";
import Skeleton from "@mui/material/Skeleton";

const BoxShadowDiv = styled("div")(
  ({ theme }) => `
  margin: ${theme.spacing(2)};
  padding: ${theme.spacing(2)};
  border: 1px solid black;
  box-shadow: ${theme.shadows[12]};
`
);

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

  const [userCount, setuserCount] = useState(0);
  const [leaveCount, setleaveCount] = useState(0);
  const [salesCount, setsalesCount] = useState(0);

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

  const [resp, setRespData] = useState({ users: null, leaves: null });

  useEffect(() => {
    const fetchData = async () => {
      const usersCount = await axios
        .get(`${process.env.REACT_APP_BASE_URL}/getUserCount`)
        .then((response) => {
          // response.json();
          console.log(response, "token is sent");
          setuserCount(response.data);
        })
        .catch((error) => console.log(error.message));

      const leaveCount = await axios
        .get(`${process.env.REACT_APP_BASE_URL}/getLeaveCount`)
        .then((response) => {
          console.log(response, "leaves set");
          setleaveCount(response.data);
        })
        .catch((error) => console.log(error.message));

      const salesCount = await axios
        .get(`http://localhost:7000/api/getSalesCount`)
        .then((response) => {
          // response.json();
          console.log(response, "SAles is sent");
          setsalesCount(response.data);
        })
        .catch((error) => console.log(error.message));
    };

    fetchData();
  }, []);

  return (
    <>
      {userCount > 0 && (
        <div style={{ width: "90%" }}>
          <div className="main-cards">
            <div className="card">
              <div className="card-inner">
                <h3>Sales</h3>
                <ReceiptIcon className="card_icon" />
              </div>
              <h1>{salesCount}</h1>
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
              borderRadius: 1,
            }}
          >


          <Grid  container spacing={3}>
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
              <Grid xs={4}>
              <Box
              container
              sx={{
                position:"absolute",
                overflow: "auto",
                my: 2,
                mx:7,
                p: 1,
                height: "80%",
              }}
            >
              <ToDoList/>
            </Box>
              {/* <Paper elevation={20}  maxWidth="sm"  sx={{margin:2,padding:2,border:"1px solid"}}> */}
                  {/* <ToDoList /> */}
                {/* </Paper> */}
              </Grid>
            </Grid>
          </Box>
        </div>
      )}
      {userCount == 0 && (
        <Stack spacing={1}>
          {/* For variant="text", adjust the height via font-size */}
          {/* <Skeleton variant="text" sx={{ fontSize: "1rem" }} /> */}
          {/* For other variants, adjust the size with `width` and `height` */}
          <div style={{ width: "90%" }}>
            <div className="main-cards">
              <Skeleton variant="rectangular" width={210} height={90} />
              <Skeleton variant="rectangular" width={210} height={60} />
              <Skeleton variant="rectangular" width={210} height={60} />
              <Skeleton variant="rectangular" width={210} height={60} />
              <Skeleton variant="rectangular" width={500} height={100} />
            </div>
          </div>
        </Stack>
      )}
    </>
  );
}

export default Home;
