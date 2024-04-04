import { Box, Grid, Paper, Container } from "@mui/material";
import Sidebar from "../../../components/Sidebar";
import {
  DollarCircleOutlined,
  ShoppingCartOutlined,
  ShoppingOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Card, Space, Statistic, Table, Typography } from "antd";
import { useEffect, useState } from "react";
import { getSalesReport, getSales, getOrders, getRevenue } from "./api/API";
import ToDoList from "../../ToDoList/getToDo/ToDoList";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import CssBaseline from "@mui/material";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function Dashboard() {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };
  const [orders, setOrders] = useState(0);
  const [inventory, setInventory] = useState(0);
  const [customers, setCustomers] = useState(0);
  const [revenue, setRevenue] = useState(0);

  // useEffect(() => {
  //   getOrders().then((res) => {
  //     setOrders(res.total);
  //     setRevenue(res.discountedTotal);
  //   });
  //   getInventory().then((res) => {
  //     setInventory(res.total);
  //   });
  //   getCustomers().then((res) => {
  //     setCustomers(res.total);
  //   });
  // }, []);
  return (
    <Box container sx={{ display: "flex" }}>
      <Sidebar
        openSidebarToggle={openSidebarToggle}
        OpenSidebar={OpenSidebar}
      />
      <Container maxWidth={false} disableGutters>
        <Box
          // onSubmit={handleSubmit}
          sx={{
            display: "flex",
            flexGrow: 1,
            flexShrink: 1,
            flexWrap: "wrap",
            backgroundColor: "gray",
            p: 5,
            my: 8,
            ml: 4,
            width: "90%",
            borderRadius: 1,
          }}
        >
          <Space style={{ width: "100%" }} direction="vertical">
            <Typography.Title level={4}>Dahboard</Typography.Title>

            <Space
              size={"large"}
              // style={{ display: 'flex', flexWrap:"wrap", alignItems:"flex-start" }}
              direction="horizontal"
            >
              <Paper elevation={20}>
                <DashboardCard
                  icon={
                    <ShoppingCartOutlined
                      style={{
                        color: "green",
                        backgroundColor: "rgba(0,255,0,0.25)",
                        borderRadius: 20,
                        fontSize: 40,
                        padding: 8,
                      }}
                    />
                  }
                  title="Orders"
                  value={12345}
                />
              </Paper>
              <DashboardCard
                icon={
                  <ShoppingCartOutlined
                    style={{
                      color: "green",
                      backgroundColor: "rgba(0,255,0,0.25)",
                      borderRadius: 20,
                      fontSize: 40,
                      padding: 8,
                    }}
                  />
                }
                title="Orders"
                value={12345}
              />
              <DashboardCard
                icon={
                  <ShoppingCartOutlined
                    style={{
                      color: "green",
                      backgroundColor: "rgba(0,255,0,0.25)",
                      borderRadius: 20,
                      fontSize: 40,
                      padding: 8,
                    }}
                  />
                }
                title="Orders"
                value={12345}
              />
              <DashboardCard
                icon={
                  <ShoppingCartOutlined
                    style={{
                      color: "green",
                      backgroundColor: "rgba(0,255,0,0.25)",
                      borderRadius: 20,
                      fontSize: 40,
                      padding: 8,
                    }}
                  />
                }
                title="Leaves"
                value={12345}
              />
            </Space>
            <Grid container justify="space-between" spacing={2}>
              {/* <Space size={"large"} direction="horizontal" > */}
              <Grid item>
                <RecentOrders />
              </Grid>
              <Grid item>
                <RecentSales />
              </Grid>
            </Grid>
            {/* </Space> */}
            <Grid container justify="space-arbetweenound" spacing={2}>
              <Grid item>
                <Space
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    alignItems: "flex-start",
                  }}
                >
                  <DashboardChart />
                </Space>
              </Grid>
              <Grid item>
                {/* <Space
                  // style={{
                  //   display: "flex",
                  //   flexWrap: "wrap",
                  //   alignItems: "flex-start",
                  // }}
                > */}
                  <Box
                    container
                    sx={{
                      position: "absolute",
                      overflow: "auto",
                      // my: 2,
                      mx: 2,
                      // p: 1,
                      height: "40%",
                      width: "40%",
                    }}
                  >
                    <Card style={{width:500}}>
                    <ToDoList />
                  </Card>
                  </Box>
                {/* </Space> */}
              </Grid>
            </Grid>
            <Space>
              <DashboardSalesChart />
            </Space>
          </Space>
        </Box>
      </Container>
    </Box>
  );
}

function DashboardCard({ title, value, icon }) {
  return (
    <Card style={{ width: 200 }}>
      <Space style={{ flexBasis: "100%" }} direction="horizontal">
        {icon}
        <Statistic title={title} value={value} />
      </Space>
    </Card>
  );
}
function RecentOrders() {
  const [dataSource, setDataSource] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getOrders().then((res) => {
      setDataSource(res.splice(0, 3));
      setLoading(false);
    });
  }, []);

  return (
    <>
      <Typography.Title>Recent Leaves</Typography.Title>
      <Table
        columns={[
          {
            title: "Employee Id",
            dataIndex: "employeeNo",
          },
          {
            title: "Type",
            dataIndex: "leaveType",
          },
          {
            title: "Days",
            dataIndex: "Days",
          },
        ]}
        loading={loading}
        dataSource={dataSource}
        pagination={false}
      ></Table>
    </>
  );
}

function DashboardChart() {
  const [reveneuData, setReveneuData] = useState({
    labels: [],
    datasets: [],
  });

  useEffect(() => {
    getRevenue().then((res) => {
      const labels = res.map((cart) => {
        return `User-${cart._id}`;
      });
      const data = res.map((cart) => {
        return cart.total;
      });

      const dataSource = {
        labels,
        datasets: [
          {
            label: "Leaves Applied",
            data: data,
            backgroundColor: "rgba(255, 0, 0, 1)",
          },
        ],
      };

      setReveneuData(dataSource);
    });
  }, []);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom",
      },
      title: {
        display: true,
        text: "Leaves Report",
      },
    },
  };

  return (
    <Card style={{ width: 500, height: 250 }}>
      <Bar options={options} data={reveneuData} />
    </Card>
  );
}
function DashboardSalesChart() {
  const [reveneuData, setReveneuData] = useState({
    labels: [],
    datasets: [],
  });

  useEffect(() => {
    getSalesReport().then((res) => {
      const labels = res.map((cart) => {
        return `User-${cart._id}`;
      });
      const data = res.map((cart) => {
        return cart.count;
      });

      const dataSource = {
        labels,
        datasets: [
          {
            label: "Sales Done",
            data: data,
            backgroundColor: "rgba(255, 0, 0, 1)",
          },
        ],
      };

      setReveneuData(dataSource);
    });
  }, []);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom",
      },
      title: {
        display: true,
        text: "Sales Report",
      },
    },
  };

  return (
    <Card style={{ marginTop:15 }}>
      <Bar options={options} data={reveneuData} />
    </Card>
  );
}

function RecentSales() {
  const [dataSource, setDataSource] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getSales().then((res) => {
      setDataSource(res.splice(0, 3));
      setLoading(false);
    });
  }, []);

  return (
    <>
      <Typography.Title>Recent Sales</Typography.Title>
      <div >
        <Table style={{width:650}}
          columns={[
            {
              title: "Employee Id",
              dataIndex: "employee_id",
            },
            {
              title: "Client Name",
              dataIndex: "client_name",
            },
            {
              title: "College",
              dataIndex: "assoc_college",
            },
          ]}
          loading={loading}
          dataSource={dataSource}
          pagination={false}
        ></Table>
      </div>
    </>
  );
}

export default Dashboard;
