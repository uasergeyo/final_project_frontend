import actionPromise from '../actionPromise'
import { getGQL } from "../../../gql"

export default function actionPromiseFindOneAnnouncement({ id }) {

    let promise = getGQL()(`
        query findOne($id: ID!){
        getAnnouncement(id: $id) {
            id
            announcementText
            announcementHeader
            user{
                id
                userName
                userEmail
                phones{
                    phone
            }
            photos{
                photoLink
                isMain
            }
            }
            area{
                id
                areaName
            }
            city{
                id
                cityName
            }
            photo{
                photoLink
            }
            announcementPrice
            currency{
                id
                currencySymbol
            }
            hasDelivery
        }
    }

`, { id })



    return actionPromise('findOneAnnouncement', promise)
}