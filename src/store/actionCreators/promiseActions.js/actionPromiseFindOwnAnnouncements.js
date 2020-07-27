import actionPromise from '../actionPromise'
import { getGQL } from "../../../gql"

export default function actionPromiseFindOwnAnnouncements({token,id}) {
  const auth = {
    'Authorization': 'Bearer ' + token
  }
  let promise = getGQL(auth)(`
  query findOwnAnnouncements($id: ID!){
    getUser(id:$id){
     announcements{
                  id
                  createdAt
                  announcementText
                  announcementHeader
                  announcementPrice
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
    }
    }} 
    `, { id })


 
  return actionPromise('findOwn', promise)
}