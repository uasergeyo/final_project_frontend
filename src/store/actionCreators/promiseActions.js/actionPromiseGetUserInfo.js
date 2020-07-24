import actionPromise from '../actionPromise'
import { getGQL } from "../../../gql"

export default function actionPromiseGetUserInfo({ token, id }) {
    const auth = {
        'Authorization': 'Bearer ' + token
    }
    let promise = getGQL(auth)(`
        query info($id: ID!){
        getUser(id: $id) {
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
                id
                phone
            }
            photos{
                id
                photoLink
            }
            userEmail
        }
        getAreas{
            id
            areaName
            cities{
                id
                cityName
                areaId
            }}
    }
        `, { id })



    return actionPromise('getUserInfo', promise)
}