import actionPromise from '../actionPromise'
import { getGQL } from "../../../gql"

export default function actionPromiseGetFullCategories() {

    let promise = getGQL()(`
    query categories{
        getCategories{
          categoryName, categoryImage,id
        }
      }
     
    `, {})

    return actionPromise('categoriesFullDesc', promise)

}