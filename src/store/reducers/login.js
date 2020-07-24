import initialState from "../initialState";
import {LOGIN,LOGOUT,TOKEN} from '../actions';
import {decode} from '../../helpers';
// import helpers from '../../helpers';
// const {decode} = helpers;

export default function logIn(state =initialState, action){
    if(action.type === LOGIN){
      return  {
        pending: true
      }
    }else if(action.type === LOGOUT){
        localStorage.removeItem("jwt_token")
        return {}
    }else if(action.type ===TOKEN){
            localStorage.setItem("jwt_token",action.jwt_token) 
        return {
            pending: false,
            jwt_token: action.jwt_token,
            userData: decode(action.jwt_token)
        }
    }else{
        return state
    }
}



