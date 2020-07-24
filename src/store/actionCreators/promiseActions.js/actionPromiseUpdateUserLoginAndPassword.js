import actionPromise from '../actionPromise'
import { getGQL } from "../../../gql"

export default function actionPromiseUpdateUserLoginAndPassword({ token, data }) {
    const auth = {
        'Authorization': 'Bearer ' + token
    }
    let promise = getGQL(auth)(`
        mutation updateUser(
            $userEmail: String
            $userPassword: String
                 ){
                     updateUser(
                        userEmail: $userEmail
                        userPassword: $userPassword
                            ) {
                                id
                            }
                        }
        `, { ...data })


 
  return actionPromise('updateUserLoginAndPassword', promise)
}