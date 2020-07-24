import initialState from "../initialState";
import {PROMISE} from "../actions"

function promiseReducer(state=initialState,{type, name, status, payload, error}){
    if (type === PROMISE){
        return {
            ...state,
            [name]:{
                status,
                payload,
                error
            }
        }
    }
    return state
}

export default promiseReducer;