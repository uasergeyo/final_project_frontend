import React from 'react'
import { Route,Redirect} from 'react-router-dom'
import store from '../store/store'

const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={(props) => (
        store.getState().login.jwt_token
        ? <Component {...props} />
        : <Redirect to={{
            pathname: '/login',
            state: { from: props.location }
          }} />
    )} />
  )

  export default PrivateRoute;