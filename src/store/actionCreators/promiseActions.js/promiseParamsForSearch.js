import actionPromise from '../actionPromise'
import { getGQL } from "../../../gql"

export default function actionPromiseParamsForAnnouncements(data) {

    let promise = getGQL()(`
  query par_for_search{
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
getAreas{
    id
    areaName
    cities{
        id
        cityName
        areaId
    }}
}    
    `, { ...data })

    return actionPromise('params_for_announcements', promise)

}