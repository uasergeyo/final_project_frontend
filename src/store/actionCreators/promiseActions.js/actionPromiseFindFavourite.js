import actionPromise from '../actionPromise'
import { getGQL } from "../../../gql"

export default function actionPromiseFindFavourite({token,id}) {
  const auth = {
    'Authorization': 'Bearer ' + token
  }
  let promise = getGQL(auth)(`
  query findFavourite($id: ID!){
    getUser(id:$id){
      favourite{
  announcement{
    id
                announcementText
                announcementHeader
                createdAt
                user{
                  id
                  userName
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
                isMain
                 }
                currency{
                  id
                  currencySymbol
                }
                announcementPrice
  }
      }
    }
  }
 
    `, { id })


 
  return actionPromise('findFavourite', promise)
}