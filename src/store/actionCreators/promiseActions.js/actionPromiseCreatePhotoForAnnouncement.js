import actionPromise from '../actionPromise'
import { getGQL } from "../../../gql"

export default function actionPromiseCreatePhotoForAnnouncement({token,...data}) {
  const auth = {
    'Authorization': 'Bearer ' + token
  }
  let promise = getGQL(auth)(`
  mutation createPhoto($photoLink: String!$announcementId: ID){
    createPhoto(photoLink:$photoLink,announcementId:$announcementId){
      id
    }
  } 
    `, {...data})


 
  return actionPromise('createAnnouncementPhoto', promise)
}