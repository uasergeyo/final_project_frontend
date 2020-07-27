import actionPromise from '../actionPromise'
import { getGQL } from "../../../gql"

export default function actionPromiseFindLikes({ token, id }) {
    const auth = {
        'Authorization': 'Bearer ' + token
    }
    let promise = getGQL(auth)(`
    query info($id: ID!){
        getUser(id: $id) {
    favourite{
      announcement{
        id
      }
    }
  }
    }
        `, { id })



    return actionPromise('getLikes', promise)
}