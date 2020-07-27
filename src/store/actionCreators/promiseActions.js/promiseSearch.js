import actionPromise from '../actionPromise'
import { getGQL } from "../../../gql"

export default function actionPromiseSearch(data) {
  
  let promise = getGQL()(`
  query Announcements(
    $areaId:ID,$cityId:ID,
              $categoryId:ID,
              $subCategoryId:ID,
              $currencyId:ID,
              $hasPhoto:Boolean,
              $hasDelivery:Boolean,
              $priceFrom:Float,
              $priceTo:Float,
              $findEverywhere:Boolean,
              $requestText:String,
              $sort:String,
              $limit: Int,
              $offset: Int,
  ){
            searchAnnouncements(
              areaId:$areaId,cityId:$cityId,
              categoryId:$categoryId,
              subCategoryId:$subCategoryId,
              currencyId:$currencyId,
              hasPhoto:$hasPhoto,
              hasDelivery:$hasDelivery,
              priceFrom:$priceFrom,
              priceTo:$priceTo,
              findEverywhere:$findEverywhere,
              requestText:$requestText,
              sort:$sort,
              limit: $limit,
              offset: $offset
          ){
      count
      rows{
            id
            createdAt
            announcementText
            announcementHeader
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
    }   }  
    `, { ...data })

  return actionPromise('searchRequest', promise)

}