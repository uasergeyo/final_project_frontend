import actionPromise from '../actionPromise'
import { getGQL } from "../../../gql"

export default function actionPromiseFindAnnouncementForEdit({token,id}) {
    
    const auth = {
        'Authorization': 'Bearer ' + token
    }

    let promise = getGQL(auth)(`
        query findOne($id: ID!){
        getAnnouncement(id: $id) {
            id
            announcementText
            announcementHeader
            user{
                id
            }
            photo{
                id
                photoLink
                announcementId
                isMain
            }
            category{
                id
                categoryName
              }
            subcategory{
            id
            subCategoryName
           }
            announcementPrice
            currency{
                id
                currencySymbol
            }
            hasDelivery
        }
        getCategories{
            id
        categoryName
        subcategories{
            id
            subCategoryName
        }
        }
        getCurrencies{
        id
        currencySymbol
    }
    }

`, { id })



    return actionPromise('findAnnouncementForEdit', promise)
}