import actionPromise from '../actionPromise'
import { getGQL } from "../../../gql"

export default function actionPromiseAddPhoneNumber({token,data}) {
  const auth = {
    'Authorization': 'Bearer ' + token
  }
  let promise = getGQL(auth)(`
  mutation addPhone($phone: String!,$userId: ID!){
    createPhone(phone: $phone,userId:$userId){
      id
      phone
    }
  }
    `, { ...data })


 
  return actionPromise('addPhoneNumber', promise)
}