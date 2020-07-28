import actionPromise from '../actionPromise'
import { getGQL } from "../../../gql"

export default function actionPromiseFindAnnouncementPhotos({id }) {
    
    let promise = getGQL()(`
    query findOne($id: ID!){
        getAnnouncement(id: $id) {
            photo{
                id
                photoLink
                announcementId
                isMain
            }
    }
}
        `, {id})



    return actionPromise('getAnnouncementPhotos', promise)
}