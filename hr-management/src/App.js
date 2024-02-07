import './App.css'
import Login from "./screens/Login";
import PayrollAdmin from "./screens/PayrollAdmin";
import LandingLayout from './pages/LandingLayout.jsx';
import EmployeeLeave from './screens/EmployeeLeave.jsx';
import {BrowserRouter as Router, Routes,Route } from "react-router-dom";
import EmployeeAttend from './screens/EmployeeAttend.jsx';
import EmployeeDetails from './screens/EmployeeDetails.jsx';
function App() {
 return (
      <Router>
          <Routes>
            <Route  exact path='/' element={<LandingLayout/>}/>
            <Route exact path="/payroll" element={<PayrollAdmin />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/leave-management" element={<EmployeeLeave />} />
            <Route exact path="/attendance-management" element={<EmployeeAttend />} />
            <Route exact path="/employee-details" element={<EmployeeDetails />} />
          </Routes>
      </Router>
  );
  
}

export default App;