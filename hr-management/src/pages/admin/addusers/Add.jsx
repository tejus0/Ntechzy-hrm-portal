import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";
import "./add.css";
import toast from 'react-hot-toast';

const Add = () => {

  const users = {
    name:"",
    father_name:"",
    mobile:"",
    designation:"",
    dob:"",
    address:"",
    doj:"",
    passingYearX:"",
    schoolNameX:"",
    gradeX:"",
    passingYearXII:"",
    schoolNameXII:"",
    gradeXII:"",
    passingYearCollege:"",
    university:"",
    degree:"",
    branch:"",
    gradeUniversity:"",
    company:"",
    role:"",
    experience:"",
    email:"",
    password:""
  }

  const [user, setUser] = useState(users);
  const navigate = useNavigate();

  const inputHandler = (e) =>{
      const {name, value} = e.target;
      setUser({...user, [name]:value});
  }

  const submitForm = async(e) =>{
    e.preventDefault();
    await axios.post(`${process.env.REACT_APP_BASE_URL}/create`, user)
    .then((response)=>{
       toast.success(response.data.msg, {position:"top-right"})
       navigate("/")
    })
    .catch(error => console.log(error))
  }


  return (
    <div className='addUser'>
        {/* <Link to={"/"}>Back</Link> */}
        <h3>Add new user</h3>
        <form className='addUserForm' onSubmit={submitForm}>
            <div className="inputGroup">
                <label htmlFor="fname">First name</label>
                <input type="text" onChange={inputHandler} id="fname" name="fname" autoComplete='off' placeholder='First name' />
            </div>
            <div className="inputGroup">
                <label htmlFor="lname">Last name</label>
                <input type="text" onChange={inputHandler} id="lname" name="lname" autoComplete='off' placeholder='Last name' />
            </div>
            <div className="inputGroup">
                <label htmlFor="email">Email</label>
                <input type="email" onChange={inputHandler} id="email" name="email" autoComplete='off' placeholder='Email' />
            </div>
            <div className="inputGroup">
                <label htmlFor="password">Password</label>
                <input type="password" onChange={inputHandler} id="password" name="password" autoComplete='off' placeholder='password' />
            </div>
            <div className="inputGroup">
                <button type="submit">ADD USER</button>
            </div>
        </form>
    </div>
  )
}

export default Add