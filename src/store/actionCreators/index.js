import {TOKEN, LOGOUT,REDIRECTED_AS_UNREGISTERED,PASS_REQUEST_DATA} from '../actions';
import store from '../store'
import actionPromise from './actionPromise'
// import {getGQL} from "../../gql"
import { d } from '../../helpers'
import {actionPromiseSearch,
    actionPromiseParamsForAnnouncements,
    actionPromiseCreateAnnouncement,
    actionPromiseAddPhoto,
    actionPromiseFindFavourite,
    actionPromiseCreateLike,
    actionPromiseFindOneAnnouncement,
    actionPromiseFindOwnAnnouncements,
    actionPromiseGetUserInfo,
    actionPromiseUpdateUserNameAndCity,
    actionPromiseUpdateUserLoginAndPassword,
    actionPromiseAddPhoneNumber,
    actionPromiseGetUserPhoto,
    actionPromiseFindAnnouncementForEdit,
    actionPromiseRemoveAnnouncement,
    actionPromiseEditAnnouncement,
    actionPromiseRemoveUser,
    actionPromiseRemovePhone,
    actionLoginPromise,
    actionRegisterPromise,
    actionPromiseFindAnnouncementPhotos,
    actionPromiseRemovePhoto,
    actionPromiseCreatePhotoForAnnouncement,
    actionPromiseCreateUserPhoto,



    

} from './promiseActions.js'

export {
    actionPromise,
    actionLogin,
    actionLogout,
    wasRedirectedFrom,
    actionRegister,
    actionSearch,
    actionGetSearchParams,
    actionCreateAnnouncement,
    actionAddPhoto,
    actionFindFavourite,
    actionCreateLike,
    actionFindOneAnnouncement,
    actionFindOwnAnnouncements,
    actionGetUserInfo,
    actionUpdateUserNameAndCity,
    actionUpdateUserLoginAndPassword,
    actionAddPhoneNumber,
    actionGetUserPhoto,
    actionFindAnnouncementForEdit,
    actionRemoveAnnouncement,
    actionEditAnnouncement,
    actionRemoveUser,
    actionRemovePhone,
    actionPassRequestData,
    actionFindAnnouncementPhotos,
    actionRemovePhoto,
    actionCreatePhotoForAnnouncement,
    actionCreateUserPhoto
}


// function actionLoginPromise( userEmail, userPassword ) {
//     let promise = getGQL()
//     (`query login($userEmail:String!, $userPassword:String!){
//         logInAuth(userEmail:$userEmail,userPassword:$userPassword){
//           token
//         }
//       } `, { userEmail, userPassword })
        
//     return  actionPromise('login', promise)

// }

function actionLogin(userEmail, userPassword){
    return async dispatch => {
    let token = await dispatch(actionLoginPromise(userEmail, userPassword))
    if (token.data.logInAuth){
       return dispatch(actionToken(token.data.logInAuth.token))
    }else{
        console.log(token.errors[0].messages)
    }
}
}

// function actionRegisterPromise(userEmail, userPassword){
//     let promise = getGQL()
//     (`mutation newUser($userEmail:String!,$userPassword:String!){
//   createUser(userEmail: $userEmail,userPassword: $userPassword){
//     id
//   }
// }
//     `, {userEmail, userPassword}
//     )
//     return actionPromise('register', promise)
// }

function actionRegister(userEmail,userPassword){
    return async dispatch => {debugger;
        let user  =await dispatch(actionRegisterPromise(userEmail,userPassword))
        if (!user.errors) {
            try{                
               await dispatch(actionLogin(userEmail,userPassword))                
            }catch(e){
                console.log("actionRegister",e)
                if (store.getState().login.jwt_token) window.location.replace("/profile/my_settings")
            }
        }
    }
}


function actionSearch(data){
    return async dispatch =>{
        dispatch(actionPassRequestData(data))
        return await dispatch(actionPromiseSearch(data))
        
    }
}

function actionGetSearchParams(){
    return async dispatch =>{
        return await dispatch(actionPromiseParamsForAnnouncements())
    }
}

function actionCreateAnnouncement(data){
    return async dispatch =>{
        return await dispatch(actionPromiseCreateAnnouncement(data))
    }
}

function actionAddPhoto(data){
    return async dispatch =>{
        return await dispatch(actionPromiseAddPhoto(data))
    }
}

function actionFindFavourite(data){
    return async dispatch =>{
        return await dispatch(actionPromiseFindFavourite(data))
    }
}

function actionCreateLike(data){
    return async dispatch =>{
        return await dispatch(actionPromiseCreateLike(data))
    }
}

function actionFindOneAnnouncement(data){
    return async dispatch =>{
        return await dispatch(actionPromiseFindOneAnnouncement(data))
    }
}

function actionFindOwnAnnouncements(data){
    return async dispatch =>{
        return await dispatch(actionPromiseFindOwnAnnouncements(data))
    }
}

function actionGetUserInfo(data){
    return async dispatch =>{
        return await dispatch(actionPromiseGetUserInfo(data))
    }
}

function actionUpdateUserNameAndCity(data){
    return async dispatch =>{
        return await dispatch (actionPromiseUpdateUserNameAndCity(data))
    }
}

function actionUpdateUserLoginAndPassword(data){
    return async dispatch =>{
        return await dispatch(actionPromiseUpdateUserLoginAndPassword(data))
    }
}

function actionAddPhoneNumber(data){
    return async dispatch =>{
        return await dispatch(actionPromiseAddPhoneNumber(data))
    }
}

function actionGetUserPhoto(data){
    return async dispatch =>{
        return await dispatch (actionPromiseGetUserPhoto(data))
    }
}

function actionFindAnnouncementForEdit(data){
    return async dispatch =>{
        return await dispatch (actionPromiseFindAnnouncementForEdit(data))
    }
}

function actionRemoveAnnouncement(data){
    return async dispatch =>{
        return await dispatch(actionPromiseRemoveAnnouncement(data))
    }
}

function actionEditAnnouncement(data){
    return async dispatch =>{
        return await dispatch(actionPromiseEditAnnouncement(data))
    }
}

function actionRemoveUser(data){
    return async dispatch =>{
        let result = await dispatch(actionPromiseRemoveUser(data))
        if(d`${result}.data.removeUser.userName`){
           dispatch(actionLogout())
        }else{
            return "something wrong"
        }
    }
}

function actionRemovePhone(data){
    return async dispatch =>{
        return await dispatch(actionPromiseRemovePhone(data))
    }
}

function actionFindAnnouncementPhotos(data){
    return async dispatch =>{
        return await dispatch(actionPromiseFindAnnouncementPhotos(data))
    }
}

function actionRemovePhoto(data){
    return async dispatch =>{
        return await dispatch(actionPromiseRemovePhoto(data))
    }
}

function actionCreatePhotoForAnnouncement(data){
    return async dispatch=>{
        return await dispatch(actionPromiseCreatePhotoForAnnouncement(data))
    }
}

function actionCreateUserPhoto(data){
    return async dispatch =>{
        return await dispatch(actionPromiseCreateUserPhoto(data))
    }
}

function actionLogout() {
    return {
        type: LOGOUT,
        jwt_token: null
    }
}

function actionToken(token) {
    return {
        type: TOKEN,
        jwt_token: token
    }
}

function wasRedirectedFrom(link) {
    return {
        type: REDIRECTED_AS_UNREGISTERED,
        link
    }
}

function actionPassRequestData(data){
    return{
        type: PASS_REQUEST_DATA,
        data
    }
}

