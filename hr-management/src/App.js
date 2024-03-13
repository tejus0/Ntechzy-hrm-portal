import './App.css'
import Login from "./screens/Login";
import PayrollAdmin from "./screens/PayrollAdmin";
import LandingLayout from './pages/LandingLayout.jsx';
import EmployeeLeave from './screens/EmployeeLeave.jsx';
import {BrowserRouter as Router, Routes,Route } from "react-router-dom";
import EmployeeAttend from './screens/EmployeeAttend.jsx';
import EmployeeDetails from './screens/EmployeeDetails.jsx';
import Users from './pages/getusers/Users.jsx';
import UpdateEmployee from './pages/updateEmployees/UpdateEmployee.jsx';
import Calendar from './screens/Calendar.jsx';
import React from 'react';
import Todo from './screens/Todo.jsx';
import Userleave from './screens/UserLeave.jsx';
import Userdetails from './screens/UserDetails.jsx';
import UserLandingLayout from './pages/UserLandingLayout.jsx';
import Usersales from './screens/UserSalesAnalytics.jsx';
function App()
{
 return (
      <Router>
          <Routes>
             <Route  exact path='/' element={<LandingLayout/>}/> 
         <Route exact path="/payroll" element={<PayrollAdmin />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/leave-management" element={<EmployeeLeave />} />
            <Route exact path="/attendance-management" element={<EmployeeAttend />} />
            <Route exact path="/employee-details" element={<EmployeeDetails />} />
            <Route exact path="/employee-list" element={<Users />} />
            <Route exact path="/update-employee" element={<UpdateEmployee />} />
            <Route exact path="/calendar" element={<Calendar />} />
            <Route exact path="/todo" element={<Todo />} /> 
             <Route  exact path='/user' element={<UserLandingLayout/>}/>
            <Route exact path="/userleave" element={<Userleave />} />
            <Route exact path="/userdetails" element={<Userdetails />} />
            <Route exact path="/usersales" element={<Usersales />} />
          </Routes>
       </Router>
     
  );
  
}

export default App;
