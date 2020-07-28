import actionPromise from '../actionPromise'
import { getGQL } from "../../../gql"

export default function actionPromiseGetUserPhoto({ userId }) {

  let promise = getGQL()(`
    query userPhotos($userId: ID!){
      getUserPhotos(userId: $userId) {
        id
        photoLink
        userId
        isMain
      }
    }
    `, { userId})


 
  return actionPromise('getUserPhoto', promise)
}