import actionPromise from '../actionPromise'
import { getGQL } from "../../../gql"

export default function actionPromiseUpdateUserNameAndCity({ token, data }) {
    const auth = {
        'Authorization': 'Bearer ' + token
    }
    let promise = getGQL(auth)(`
        mutation updateUser(
            $userName: String!
            
            $areaId: ID
            $cityId: ID
                 ){
                     updateUser(
                        userName: $userName
                        
                        areaId: $areaId
                        cityId: $cityId
                            ) {
                                userName
                                city{
                                    id
                                    cityName
                                }
                                area{
                                    id
                                    areaName
                                }
                                phones{
                                    phone
                                }
                                photos{
                                    id
                                    photoLink
                                }
                            }
                        }
        `, { ...data })


 
  return actionPromise('updateUserNameAndCity', promise)
}