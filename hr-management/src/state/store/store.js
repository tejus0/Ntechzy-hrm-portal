import { combineReducers } from 'redux'
import {userLoginReducer} from '../reducers/useReducers'

const userInfoFromStorage = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null

const reducer = combineReducers({
    userLogin:userLoginReducer
})

const initialState = {
    userLogin: {userInfo:  userInfoFromStorage}
}