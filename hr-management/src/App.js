import './App.css'
import Login from "./screens/Login";
import PayrollAdmin from "./screens/PayrollAdmin";
import LandingLayout from './pages/LandingLayout.jsx';
import EmployeeLeave from './pages/addleaves/AddLeave.jsx';
import {BrowserRouter as Router, Routes,Route } from "react-router-dom";
import EmployeeAttend from './screens/EmployeeAttend.jsx';
import EmployeeDetails from './screens/EmployeeDetails.jsx';
import Users from './pages/getusers/Users.jsx';
import UpdateEmployee from './pages/updateEmployees/UpdateEmployee.jsx';
import Calendar from './screens/Calendar.jsx';
import Modal from 'react-modal';
import Forget from './screens/Forget.jsx';
import Registration from './screens/Registration.jsx';
import Leave from './pages/getleaves/leaves.jsx';
import ToDoList from "./pages/ToDoList/getToDo/ToDoList.jsx"
import {UserContext} from '../src/screens/contexts/userContext.js'
Modal.setAppElement('#root')

function App() {
  const isLoggedIn= window.localStorage.getItem("loggedIn");
 return (
      <Router>
            <UserContext.Provider value= "he;llo i am contet ">
          <Routes>
            <Route  exact path='/admin-page' element={<LandingLayout/>}/>
            <Route exact path="/payroll" element={<PayrollAdmin />} />
            <Route exact path="/register" element={<Registration />} />
            <Route exact path="/" element={isLoggedIn=="true" ? <LandingLayout/> : <Login />} />
            <Route exact path="/leave-management" element={<EmployeeLeave />} />
            <Route exact path="/attendance-management" element={<EmployeeAttend />} />
            <Route exact path="/employee-details" element={<EmployeeDetails />} />
            <Route exact path="/employee-list" element={<Users />} />
            <Route exact path="/update-employee" element={<UpdateEmployee />} />
            {/* <Route exact path="/add" element={<Add />} /> */}
            <Route exact path="/calendar" element={<Calendar />} />
            <Route exact path="/forget-pass" element={<Forget />} />
            <Route exact path="/leaves-list" element={<Leave />} />
            <Route exact path="/todo" element={<ToDoList />} />
          </Routes>
            </UserContext.Provider>
      </Router>
  );
  
}

export default App;
