import './App.css'
import Login from "./screens/Login";
import PayrollAdmin from "./screens/PayrollAdmin";
import LandingLayout from './pages/LandingLayout.jsx';
import EmployeeLeave from './screens/EmployeeLeave.jsx';
import {BrowserRouter as Router, Routes,Route } from "react-router-dom";
import EmployeeAttend from './screens/EmployeeAttend.jsx';
import EmployeeDetails from './screens/EmployeeDetails.jsx';
import Calendar from './screens/Calendar.jsx';
import Todoform from './screens/Todoform.jsx';
import Todolist from './screens/TodoList.jsx';
import Modal from 'react-modal';
import React,{useState} from 'react';
import {v4} from 'uuid';
Modal.setAppElement('#root')
function App() {
  const[todos,setTodos]=useState([
    {
      id:1,
      title:"Play",
      isCompleted: false
    },
    {
      id:2,
      title:"Play Cricket",
      isCompleted: true
    },
    {
      id:3,
      title:"Play Cricket",
      isCompleted: true
    },
    {
      id:4,
      title:"Play Cricket",
      isCompleted: true
    },
  ]);
  const checkTodo=(id)=>{
    console.log(id);
    setTodos(todos.map(todo => {
      if(todo.id==id)
      todo.isCompleted =!todo.isCompleted
    console.log(todo.isCompleted);
    return todo;
    }));
  };
  const deleteTodo=(id)=>
  {
    setTodos(todos.filter(todo=>todo.id!=id))
  };
  const addTodo = (text) =>{
       const newTodo ={
         id:v4(),
         title: text,
         isCompleted: false,
       };
      setTodos([...todos, newTodo]);
  };
 return (
      // <Router>
      //     <Routes>
      //       <Route  exact path='/' element={<LandingLayout/>}/>
      //       <Route exact path="/payroll" element={<PayrollAdmin />} />
      //       <Route exact path="/login" element={<Login />} />
      //       <Route exact path="/leave-management" element={<EmployeeLeave />} />
      //       <Route exact path="/attendance-management" element={<EmployeeAttend />} />
      //       <Route exact path="/employee-details" element={<EmployeeDetails />} />
      //       <Route exact path="/calendar" element={<Calendar />} />
          
      //     </Routes>
      // </Router>
      <div>
      <Todoform  addTodo={addTodo} />
      <Todolist todos={todos} checkTodo={checkTodo} deleteTodo={deleteTodo}/>
      </div>
  );
  
}

export default App;
