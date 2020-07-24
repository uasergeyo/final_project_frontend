import initialState from "../initialState";
import {PASS_REQUEST_DATA} from '../actions';

export default function passRequestData(state =initialState, action){
    if(action.type === PASS_REQUEST_DATA){
      return  {
        requestData: action.data
      }
    }else{
        return state
    }
}