import initialState from "../initialState";
import {REGISTRATION} from '../actions';

export default function registration(state =initialState, action){
    if(action.type === REGISTRATION){
      console.log('action',action)
      return  {
        newUser:action.id
      }
    }else{
        return state
    }
}
