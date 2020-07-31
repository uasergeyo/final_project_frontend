import { combineReducers } from 'redux';
import login from './login';
import redirectedFromLink from './redirectedFrom'; 
import promiseReducer from './promiseReducer';
import passRequestData from './passRequestData'

const reducers = combineReducers({
    login,
    redirectedFromLink,
    promiseReducer,
    passRequestData,
});

export default reducers;