import {configureStore} from '@reduxjs/toolkit'
import UserReducer from './UserSlice'
import User from '../pages/getusers/Users'

const store= configureStore({
    reducer:{
        user:UserReducer
    }
})

export default store;