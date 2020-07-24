import actionPromise from '../actionPromise'
import { getGQL } from "../../../gql"

export default function actionPromiseCreateLike({token,announcementId}) {
  const auth = {
    'Authorization': 'Bearer ' + token
  }
  let promise = getGQL(auth)(`
  mutation newLike($announcementId: ID!){
    createLike(announcementId:$announcementId){
      id
    }
  }
    `, { announcementId })


 
  return actionPromise('createLike', promise)
}