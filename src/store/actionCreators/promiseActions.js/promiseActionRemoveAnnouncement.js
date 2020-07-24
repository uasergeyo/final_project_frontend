import actionPromise from '../actionPromise'
import { getGQL } from "../../../gql"

export default function actionPromiseRemoveAnnouncement({token,body}) {
  const auth = {
    'Authorization': 'Bearer ' + token
  }
  let promise = getGQL(auth)(`
  mutation removeAnnouncement($userId: ID!,$id: ID!,$isDisabled: Boolean){
    editAnnouncement(userId: $userId,id: $id,isDisabled: $isDisabled){
      id
    }
  }
    `, { ...body })

  return actionPromise('removeAnnouncement', promise)

}