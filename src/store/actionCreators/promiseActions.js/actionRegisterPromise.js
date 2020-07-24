import actionPromise from '../actionPromise'
import { getGQL } from "../../../gql"

export default function actionRegisterPromise(userEmail, userPassword){
    let promise = getGQL()
    (`mutation newUser($userEmail:String!,$userPassword:String!){
  createUser(userEmail: $userEmail,userPassword: $userPassword){
    id
  }
}
    `, {userEmail, userPassword}
    )
    return actionPromise('register', promise)
}
