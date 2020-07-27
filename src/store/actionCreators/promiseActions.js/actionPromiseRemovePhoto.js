import actionPromise from '../actionPromise'
import { getGQL } from "../../../gql"

export default function actionPromiseRemovePhoto({token,id}) {
  const auth = {
    'Authorization': 'Bearer ' + token
  }
  let promise = getGQL(auth)(`
  mutation remPhoto($id:ID!){
    removePhoto(id:$id){
      id
    }
  }
    `, { id })
 
  return actionPromise('removePhoto', promise)
}