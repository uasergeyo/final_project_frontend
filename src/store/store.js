import { createStore,applyMiddleware } from 'redux';
import reducers from './reducers';
import initialState from './initialState';
import thunk from 'redux-thunk';
import {decode} from '../helpers';
import { composeWithDevTools } from 'redux-devtools-extension';
const store = createStore(reducers, initialState,composeWithDevTools(applyMiddleware(thunk)));


store.getState().login.jwt_token = localStorage.getItem("jwt_token")
if(store.getState().login.jwt_token){
    
    store.getState().login.userData = decode(store.getState().login.jwt_token)
}

store.subscribe(()=>console.log("STORE ",store.getState()))

export default store;