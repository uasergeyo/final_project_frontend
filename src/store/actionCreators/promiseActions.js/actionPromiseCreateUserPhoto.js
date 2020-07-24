import actionPromise from '../actionPromise'
import { getGQL } from "../../../gql"

export default function actionPromiseCreateUserPhoto({token,data}) {
  const auth = {
    'Authorization': 'Bearer ' + token
  }
  let promise = getGQL(auth)(`
  mutation createPhoto($photoLink: String!,$userId: ID){
    createPhoto(photoLink:$photoLink,userId:$userId){
      id
    }
  } 
    `,{...data})


 
  return actionPromise('createUserPhoto', promise)
}