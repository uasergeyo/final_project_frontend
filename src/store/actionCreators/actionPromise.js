import {PROMISE, PENDING, RESOLVED, REJECTED } from '../actions';


function actionPromise(name, promise) {
    function actionPending() {
        return {
            type: PROMISE,
            status: PENDING,
            name,
            payload: null, error: null
        }
    }

    function actionResolved(payload) {
        return {
            type: PROMISE,
            status: RESOLVED,
            name,
            payload, error: null
        }
    }

    function actionRejected(error) {
        return {
            type: PROMISE,
            status: REJECTED,
            name,
            payload: null, error
        }
    }
    return async dispatch => {
        dispatch(actionPending())
        try {
            let payload = await promise
            dispatch(actionResolved(payload))
            return payload
        }
        catch (error) {
            dispatch(actionRejected(error))
        }
    }
}

export default actionPromise;