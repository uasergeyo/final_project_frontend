import { d } from '../helpers'

function mapStateToProps(component) {
	switch (component) {
		case "LogIn": {
			return function (state) {
				return {
					token: state.login.jwt_token,
					user: state.login.userData,
					animation: state.login.pending,
					previousURL: state.redirectedFromLink.redirectedFrom 
				};
			}
		}
		case "Profile": {
			return function (state) {
				return {                                                              
					avatar: d`${state}.promiseReducer.getUserInfo.payload.data.getUser.photos`,
					userId: d`${state}.promiseReducer.userData.id`,
					token: d`${state}.promiseReducer.jwt_token`,
					user: d`${state}.promiseReducer.getUserInfo.payload.data.getUser`,
				};
			}
		}
		case "Main": {
			return function (state) {
				return {
					token: state.login.jwt_token,
					user: state.login.userData,
					animation: state.login.pending,
					previousURL: state.redirectedFromLink.redirectedFrom
				}
			};
		};
		case "Header": {
			return function (state) {
				return {
					link: state.redirectedFromLink.redirectedFrom
				}
			}
		};

		case "Select": {
			return function (state) {
				return {
					areas: d`${state}.promiseReducer.params_for_announcements.payload.data.getAreas`,
				}
			}
		};

		// case "Main_page": {
		// 	return function (state) {
		// 		return {
		// 			announcements: d`${state}.promiseReducer.searchRequest.payload.data.searchAnnouncements.rows`,
		// 			count: d`${state}.promiseReducer.searchRequest.payload.data.searchAnnouncements.count`,
		// 		}
		// 	}
		// };

		case "AnnouncementsField": {
			return function (state) {
				return {
					requestData:d`${state}.passRequestData.requestData`,
					announcements: d`${state}.promiseReducer.searchRequest.payload.data.searchAnnouncements.rows`,
					count: d`${state}.promiseReducer.searchRequest.payload.data.searchAnnouncements.count`,
				}
			}
		};

		case "CreateAnnouncement": {
			return function (state) {
				return {
					areas: d`${state}.promiseReducer.params_for_announcements.payload.data.getAreas`,
					categories: d`${state}.promiseReducer.params_for_announcements.payload.data.getCategories`,
					currencies: d`${state}.promiseReducer.params_for_announcements.payload.data.getCurrencies`,
					data: d`${state}.promiseReducer.params_for_announcements.payload.data`,
					userId: d`${state}.promiseReducer.userData.id`,
					token: d`${state}.promiseReducer.jwt_token`,
					report: d`${state}.promiseReducer.createAnnouncement.payload.data.createAnnouncement.id`
				}
			}
		};
		case "Favourite": {
			return function (state) {
				return {
					userId: d`${state}.promiseReducer.userData.id`,
					token: d`${state}.promiseReducer.jwt_token`,
					announcements: d`${state}.promiseReducer.findFavourite.payload.data.getUser.favourite`,
					responseCreateLike: d`${state}.promiseReducer.createLike.payload.data.createLike.id`,
				}

			}
		};

		case "SearchParams": {
			return function (state) {
				return {
					categories: d`${state}.promiseReducer.params_for_announcements.payload.data.getCategories`,
					currencies: d`${state}.promiseReducer.params_for_announcements.payload.data.getCurrencies`,
					data: d`${state}.promiseReducer.params_for_announcements.payload.data`,
				}
			}
		};

		case "AnnouncementCard": {
			return function (state) {
				return {
					token: d`${state}.promiseReducer.jwt_token`,
					responseCreateLike: d`${state}.promiseReducer.createLike.payload.data.createLike.id`,
					userId: d`${state}.promiseReducer.userData.id`,
				}
			}
		}

		case "FullAnnouncement": {
			return function (state) {
				return {
					userId: d`${state}.promiseReducer.userData.id`,
					announcement: d`${state}.promiseReducer.findOneAnnouncement.payload.data.getAnnouncement`,
					userName: d`${state}.promiseReducer.findOneAnnouncement.payload.data.getAnnouncement.user.userName`,
					phones: d`${state}.promiseReducer.findOneAnnouncement.payload.data.getAnnouncement.user.phones`,
					avatar: d`${state}.promiseReducer.findOneAnnouncement.payload.data.getAnnouncement.user.photos`,
					area: d`${state}.promiseReducer.findOneAnnouncement.payload.data.getAnnouncement.area.areaName`,
					city: d`${state}.promiseReducer.findOneAnnouncement.payload.data.getAnnouncement.city.cityName`,
					photo: d`${state}.promiseReducer.findOneAnnouncement.payload.data.getAnnouncement.photo`,
				}
			}
		};

		case "OwnAnnouncements" :{
			return function(state){
				return {
					userId: d`${state}.promiseReducer.userData.id`,
					token: d`${state}.promiseReducer.jwt_token`,
					announcements: d`${state}promiseReducer.findOwn.payload.data.getUser.announcements`,
					responseRemoveAnnouncement: d`${state}.promiseReducer.removeAnnouncement.payload.data`,
				}
			}
		};

		case "Settings" :{
			return function(state){
				return {
					userId:   d`${state}.promiseReducer.userData.id`,
					token:    d`${state}.promiseReducer.jwt_token`,
					userInfo: d`${state}.promiseReducer.getUserInfo.payload.data.getUser`,
					photo: d`${state}.promiseReducer.getUserInfo.payload.data.getUser.photos`,
					areas:    d`${state}promiseReducer.getUserInfo.payload.data.getAreas`,
					cityId:   d`${state}.promiseReducer.getUserInfo.payload.data.getUser.city.id`,
					areaId:   d`${state}.promiseReducer.getUserInfo.payload.data.getUser.area.id`,
					phones:   d`${state}.promiseReducer.getUserInfo.payload.data.getUser.phones`,
					phone:    d`${state}.promiseReducer.addPhoneNumber.payload.data.createPhone`,
					avatar:   d`${state}.promiseReducer.addAvatar.payload.data.createPhoto.photoLink`,
					addPhoneNumbers: d`${state}.promiseReducer.addPhoneNumber.payload.data.createPhone` ,
					removePhoneNumbers: d`${state}.promiseReducer.removedPhone.payload.data.removePhone`,
					responseRemoveUser: d`${state}.promiseReducer.removeUser.payload.data.removeUser`,
					userName: d`${state}.promiseReducer.getUserInfo.payload.data.getUser.userName`,
					areaName: d`${state}.promiseReducer.getUserInfo.payload.data.getUser.area.areaName`,
					cityName: d`${state}.promiseReducer.getUserInfo.payload.data.getUser.city.cityName`,
					updatedUserPhoto: d`${state}.promiseReducer.getUserPhoto.payload.data.getUserPhotos`,
					deletedPhoto:d`${state}.promiseReducer.removePhoto.payload.data.removePhoto.id`,
					addPhoto:d`${state}.promiseReducer.createUserPhoto.payload.data.createPhoto.id`
					

				}
			}
		};

		case "EditAnnouncement":{
			return function(state){
				return{
					token:    d`${state}.promiseReducer.jwt_token`,
					announcement:d`${state}.promiseReducer.findAnnouncementForEdit.payload.data.getAnnouncement`,
					categories: d`${state}.promiseReducer.findAnnouncementForEdit.payload.data.getCategories`,
					currencies: d`${state}.promiseReducer.findAnnouncementForEdit.payload.data.getCurrencies`,
					userId:   d`${state}.promiseReducer.userData.id`,
					responseOnEdit: d`${state}.promiseReducer.editAnnouncement.payload.data.editAnnouncement.id`,
					updatedPhoto:d`${state}.promiseReducer.getAnnouncementPhotos.payload.data.getAnnouncement.photo`,
					isChangeInPhoto:d`${state}.promiseReducer.removePhoto.payload.data.removePhoto.id`,
					newPhoto:d`${state}.promiseReducer.createAnnouncementPhoto.payload.data.createPhoto.id`

				}
			}
		}
		default: return undefined;
	}
}

export default mapStateToProps;