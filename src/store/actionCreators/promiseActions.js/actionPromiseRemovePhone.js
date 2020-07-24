  import actionPromise from '../actionPromise'
  import { getGQL } from "../../../gql"
  
  export default function actionPromiseRemovePhone({ token,id}) {
      const auth = {
          'Authorization': 'Bearer ' + token
      }
      let promise = getGQL(auth)(`
      mutation removePhone($id: ID!){
        removePhone(id:$id){
          id
          phone
        }
      }
          `, { id })
  
  
   
    return actionPromise('removedPhone', promise)
  }