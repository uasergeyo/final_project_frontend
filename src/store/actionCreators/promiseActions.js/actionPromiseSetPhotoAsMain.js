import actionPromise from '../actionPromise'
import { getGQL } from "../../../gql"

export default function actionPromiseSetPhotoAsMain({token,announcementId,userId,id}) {
  const auth = {
    'Authorization': 'Bearer ' + token
  }
  let promise = getGQL(auth)(`
  mutation setMainImage(
    $id: ID!
      $userId: ID
    $announcementId: ID
    ){
     setPhotoMain(
    id: $id,
      userId:$userId
    announcementId:$announcementId
    ) {
      id
    photoLink
      isMain
    }
    }
    `, { announcementId,userId,id })


 
  return actionPromise('setMainPhoto', promise)
}