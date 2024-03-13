import axios from "axios";
import {USER_LOGIN_SUCCESS,USER_LOGIN_FAIL,USER_LOGOUT} from '../action-creators/userConstants'

export const login = (employee_id,email,password)=>async dispatch =>{
    try{
        const {data}= await axios.post(`${process.env.REACT_APP_BASE_URL}/login`,{employee_id,email,password},config)
        dispatch({type:USER_LOGIN_SUCCESS,payload:data})
        localStorage.setItem('userInfo',JSON.stringify(data))
    }
    catch(error){
        // type:USER_LOGIN_FAIL,
        dispatch({
            type:USER_LOGIN_FAIL,
        payload:error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}