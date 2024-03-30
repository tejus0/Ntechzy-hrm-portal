import "./App.css";
import Login from "./screens/Login";
import PayrollAdmin from "./pages/admin/PayrollAdmin.jsx";
import LandingLayout from "./pages/admin/LandingLayout.jsx";
import EmployeeLeave from "./pages/admin/addleaves/AddLeave.jsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import EmployeeAttend from "./pages/admin/EmployeeAttend.jsx";
import EmployeeDetails from "./components/EmployeeDetails.jsx";
import Users from "./pages/admin/getusers/Users.jsx";
import UpdateEmployee from "./pages/admin/updateEmployees/UpdateEmployee.jsx";
import Calendar from "./pages/admin/Calendar.jsx";
import Modal from "react-modal";
// import wForget from "./screens/Forget.jsx";
import Reset from "./screens/resetPassword/Reset.jsx";
import Registration from "./screens/Registration.jsx";
import Leave from "./pages/admin/getleaves/leaves.jsx";
import ToDoList from "./pages/ToDoList/getToDo/ToDoList.jsx";
import { UserContext } from "../src/screens/contexts/userContext.js";

import Userleave from "./pages/users/UserLeave.jsx";
import Userdetails from "./pages/users/UserDetails.jsx";
import UserLandingLayout from "./pages/users/UserLandingLayout.jsx";
import Usersales from "./pages/users/UserSalesAnalytics.jsx";
import Attendance from "./screens/Attendance.jsx";
import UserLeaveList from "./pages/users/getleaves/UserLeavesList.jsx";
import AdminSalesForm from "./pages/admin/AdminSalesForm.jsx";
import Getallsales from "./pages/admin/getSales/GetAllSales.jsx";
import UserSalesList from "./pages/users/getSales/UserSalesList.jsx";
import ToDoTask from "./pages/admin/ToDoTask/ToDoTask.jsx";
import UserRejectedLeaves from "./pages/users/getRejectedLeaves/UserRejectedLeaves.jsx";

Modal.setAppElement("#root");

function App() {
  const isLoggedIn = window.localStorage.getItem("loggedIn");
  return (
    <Router>
      <UserContext.Provider value="he;llo i am contet ">
        <Routes>
          <Route exact path="/admin-page" element={<LandingLayout />} />
          <Route exact path="/payroll" element={<PayrollAdmin />} />
          <Route exact path="/register" element={<Registration />} />
          <Route
            exact
            path="/"
            element={isLoggedIn == "true" ? <LandingLayout /> : <Login />}
          />
          <Route exact path="/leave-management" element={<EmployeeLeave />} />
          <Route
            exact
            path="/attendance-management"
            element={<EmployeeAttend />}
          />
          <Route exact path="/employee-details" element={<EmployeeDetails />} />
          <Route exact path="/employee-list" element={<Users />} />
          <Route exact path="/update-employee" element={<UpdateEmployee />} />
          <Route exact path="/calendar" element={<Calendar />} />

          <Route exact path="/todo" element={<ToDoList />} />
          <Route exact path="/user-page" element={<UserLandingLayout />} />
          <Route exact path="/userleave" element={<Userleave />} />
          <Route exact path="/userdetails" element={<Userdetails />} />
          <Route exact path="/usersales" element={<Usersales />} />

          <Route exact path="/attendance" element={<Attendance />} />
          <Route exact path="/adminsales" element={<AdminSalesForm />} />

          <Route exact path="/forget-pass" element={<Reset />} />
          <Route exact path="/leaves-list" element={<Leave />} />
          <Route exact path="/user-leaves-list" element={<UserLeaveList />} />
          <Route exact path="/user-rejected-leaves-list" element={<UserRejectedLeaves />} />
          <Route exact path="/admin-sales-list" element={<Getallsales />} />
          <Route exact path="/user-sales-list" element={<UserSalesList />} />
          <Route exact path="/admin-tasks" element={<ToDoTask />} />
          {/* <Route exact path="/todo" element={<ToDoList />} /> */}
        </Routes>
      </UserContext.Provider>
    </Router>
  );
}

export default App;
