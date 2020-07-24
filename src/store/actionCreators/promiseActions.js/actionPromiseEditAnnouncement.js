import actionPromise from '../actionPromise'
import { getGQL } from "../../../gql"

export default function actionPromiseEditAnnouncement({token,body}) {
  const auth = {
    'Authorization': 'Bearer ' + token
  }
  let promise = getGQL(auth)(`
  mutation editAnnouncement(
    $announcementHeader: String
    $announcementText: String
    $announcementPrice: Float
    $hasDelivery: Boolean
    $userId: ID!
    $id: ID!
    $currencyId: ID
    $categoryId: ID
    $subCategoryId: ID
    ){
      editAnnouncement(
    announcementHeader:$announcementHeader
    announcementText: $announcementText
    announcementPrice: $announcementPrice
    hasDelivery:$hasDelivery 
    userId:$userId 
    id: $id
    currencyId: $currencyId
    categoryId: $categoryId
    subCategoryId: $subCategoryId
      ){
        id
      }
    }
     
    `, { ...body })

  return actionPromise('editAnnouncement', promise)

}