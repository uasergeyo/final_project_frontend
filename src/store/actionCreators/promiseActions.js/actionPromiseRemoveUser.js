import actionPromise from '../actionPromise'
import { getGQL } from "../../../gql"

export default function actionPromiseRemoveUser({ token,id}) {
    const auth = {
        'Authorization': 'Bearer ' + token
    }
    let promise = getGQL(auth)(`
    mutation removeUser($id: ID!){
        removeUser(id:$id){
          userName
        }
      }
        `, { id })


 
  return actionPromise('removeUser', promise)
}