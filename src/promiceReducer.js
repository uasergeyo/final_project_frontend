const { createStore } = require("redux")
store.subscribe(() => console.log(store.getState()))
import thunk from 'redux-thunk'
import {applyMiddleware} from 'redux'
 
function promiseReducer(state = {}, { type, name, status, payload, error }) {
    if (type === "PROMISE") {
        return {
            ...state,
            [name]: {
                status,
                payload,
                error
            }
        }
    }
}
//-------------------------------------------------------------------------------------

const delay =ms=>new Promise(ok=>setTimeout(()=>ok(ms),ms))

function actionPromise(name,applyMiddleware){
    const actionPending =()=>({
        type:'Promise',
            status:'Pending',
            name,
            payload:null,
            error:null
    })
    const actionResolved =()=>({
        type:'Promise',
            status:'Resolved',
            name,
            payload:null,
            error:null
    })
    const actionRejected =()=>({
        type:"Promise",
                status:"Rejected"
    })
    return async dispatch=>{
        dispatch(actionPending())
        try{
           let payload=await promise
            dispatch(actionResolved(payload))
            return payload
        }catch(error){
            dispatch(actionRejected(error))
        }
    }
}

function actionLogin(login,password){
    let promise =getGql(request)
    return actionPromise('login',promise)
}

function actionRegister(login,password){

}

function actionTimeouts(){
    return async dispatch =>{
        let result = await dispatch(actionPromise('delay1',delay(1000)))
        console.log(result)
        result = await dispatch(actionPromise('delay'+result,delay(result*2)))
        console.log(result)
    }
}
// store.dispatch(actionPromise('delay1000',delay(1000)))
// store.dispatch(actionPromise('delay2000',delay(2000)))

// const store = createStore()
// store.subscribe(() => console.log(store.getState()))
// store.dispatch({ type: "PROMISE", name: "Chatlist", status: "rejected", payload: "ERROR", error: "true" })
// store.dispatch({ type: "PROMISE", name: "Chatlist", status: "rejected", payload: "some text", error: null })
store.dispatch(actionTimeouts())