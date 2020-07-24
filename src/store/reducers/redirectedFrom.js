import initialState from "../initialState";
import {REDIRECTED_AS_UNREGISTERED} from '../actions';

export default function redirectedFromLink(state =initialState, action){
    if(action.type === REDIRECTED_AS_UNREGISTERED){
      return  {
        redirectedFrom: action.link
      }
    }else{
        return state
    }
}