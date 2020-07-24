import actionPromise from '../actionPromise'
import { getGQL } from "../../../gql"

export default function actionLoginPromise( userEmail, userPassword ) {
    let promise = getGQL()
    (`query login($userEmail:String!, $userPassword:String!){
        logInAuth(userEmail:$userEmail,userPassword:$userPassword){
          token
        }
      } `, { userEmail, userPassword })
        
    return  actionPromise('login', promise)

}