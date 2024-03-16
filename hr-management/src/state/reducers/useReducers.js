import {USER_LOGIN_SUCCESS,USER_LOGIN_FAIL,USER_LOGOUT} from '../action-creators/userConstants'

export const userLoginReducer = (state={},action)=>{
    switch(action.type){
        case USER_LOGIN_SUCCESS:
            return {userInfo:action.payload}
        case USER_LOGIN_FAIL:
            return {error:action.payload}
        case USER_LOGOUT:
            return {}
        default:
            return state;
    }
}