import actionPromise from '../actionPromise'
import { getGQL } from "../../../gql"

export default function actionPromiseCreateAnnouncement(data) {
  const auth = {
    'Authorization': 'Bearer ' + data.token
  }
  let promise = getGQL(auth)(`
  mutation createAnnouncement(
    $announcementHeader: String!
  $announcementText: String
  $announcementPrice: Float
  $hasDelivery: Boolean
  $userId: ID!
  $areaId: ID!
  $cityId: ID!
  $currencyId: ID!
  $categoryId: ID!
  $subCategoryId: ID
  $photoLink:[String]
  ){
    createAnnouncement(
  announcementHeader:$announcementHeader
  announcementText: $announcementText
  announcementPrice: $announcementPrice
  hasDelivery:$hasDelivery 
  userId:$userId 
  areaId: $areaId
  cityId:$cityId
  currencyId: $currencyId
  categoryId: $categoryId
  subCategoryId: $subCategoryId
  photoLink:$photoLink
    ){
      id
    }
  }
    
     
    `, { ...data.body })

  return actionPromise('createAnnouncement', promise)

}