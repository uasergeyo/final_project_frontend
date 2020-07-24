import { combineReducers } from 'redux';
import login from './login';
import redirectedFromLink from './redirectedFrom'; 
import promiseReducer from './promiseReducer';
import passRequestData from './passRequestData'
// import registration from './registration'

const reducers = combineReducers({
    login,
    redirectedFromLink,
    promiseReducer,
    passRequestData,
    // registration
});

export default reducers;