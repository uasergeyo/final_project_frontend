import { bindActionCreators } from 'redux';
import { actionLogin, 
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
		 actionFindAnnouncementPhotos,
		 actionRemovePhoto,
		 actionCreatePhotoForAnnouncement,
		 actionCreateUserPhoto,
		 actionFindLikes,
		 actionSetMainPhoto,



		} from './actionCreators';

function mapDispatchToProps(component) {
	switch (component) {
		case "LogIn": return function (dispatch) {
			return {
				onLogin: bindActionCreators(actionLogin, dispatch)
			};
		};
		case "Profile": return function (dispatch) {
			return {
				onGetUserInfo: bindActionCreators(actionGetUserInfo,dispatch),
				onLogOut: bindActionCreators(actionLogout, dispatch)
			};
		};
		case "Header": return function (dispatch){
			return {
				onRedirect: bindActionCreators(wasRedirectedFrom,dispatch)
			};
		};
		case "Registration":return function (dispatch){
			return {
				onRegister: bindActionCreators(actionRegister, dispatch)
			}
		};
		case "Select":return function (dispatch){
			return {
				onSearch:bindActionCreators(actionSearch,dispatch),
				onAnnouncementParams:bindActionCreators(actionGetSearchParams,dispatch),
			}
		};
		// case "Main_page": return function (dispatch){
		// 	return {
		// 		onSearch:bindActionCreators(actionSearch,dispatch),
		// 	}
		// };
		case "AnnouncementsField": return function (dispatch){
			return {
				onSearch:bindActionCreators(actionSearch,dispatch),
				onSearchLikes:bindActionCreators(actionFindLikes,dispatch),
			}
		};
		case "CreateAnnouncement":return function (dispatch){
			return{
				// onAddPhoto:bindActionCreators(actionAddPhoto,dispatch),
				onAnnouncementParams:bindActionCreators(actionGetSearchParams,dispatch),
				onCreateAnnouncement:bindActionCreators(actionCreateAnnouncement,dispatch)
			}
		};
		case "SearchParams":return function (dispatch){
			return{
				onAnnouncementParams:bindActionCreators(actionGetSearchParams,dispatch)
			}
		};

		case "Favourite":return function(dispatch){
			return{
				onSearchFavourite:bindActionCreators(actionFindFavourite,dispatch),
			}
		};
		case "AnnouncementCard": return function(dispatch){
			return{
				onCreateLike: bindActionCreators(actionCreateLike,dispatch),
				onRemoveAnnouncement: bindActionCreators(actionRemoveAnnouncement,dispatch),
			}
		};

		case "FullAnnouncement": return function(dispatch){
			return{
				onFindOneAnnouncement: bindActionCreators(actionFindOneAnnouncement,dispatch)
			}
		}

		case "OwnAnnouncements":return function(dispatch){
			return{
				onFindOwnAnnouncements: bindActionCreators(actionFindOwnAnnouncements,dispatch),
				onSearchLikes:bindActionCreators(actionFindLikes,dispatch),
			}
		};

		case "Settings": return function(dispatch){
			return{
				onGetUserInfo: bindActionCreators(actionGetUserInfo,dispatch),
				onUpdateUserNameAndCity: bindActionCreators(actionUpdateUserNameAndCity,dispatch),
				onUpdateUserLoginAndPassword: bindActionCreators(actionUpdateUserLoginAndPassword,dispatch),
				onAddPhoneNumber: bindActionCreators(actionAddPhoneNumber,dispatch),
				onGetAvatarPhoto: bindActionCreators(actionGetUserPhoto,dispatch),
				onAddAvatar: bindActionCreators(actionCreateUserPhoto,dispatch),
				onRemoveUser: bindActionCreators(actionRemoveUser,dispatch),
				onRemovePhone: bindActionCreators(actionRemovePhone,dispatch)
			}
		};
		
		case "EditAnnouncement":return function (dispatch){
			return{
				onAnnouncementForEdit: bindActionCreators(actionFindAnnouncementForEdit,dispatch),
				onAnnouncementParams:bindActionCreators(actionGetSearchParams,dispatch),
				onEditAnnouncement:bindActionCreators(actionEditAnnouncement,dispatch),
				onFindAnnouncementPhotos:bindActionCreators(actionFindAnnouncementPhotos,dispatch),
				onRemovePhoto: bindActionCreators(actionRemovePhoto,dispatch),
				onAddPhoto: bindActionCreators(actionCreatePhotoForAnnouncement,dispatch)
			}
		};

		case "PhotoGallery": return function (dispatch){
			return{
				onRemovePhoto: bindActionCreators(actionRemovePhoto,dispatch),
				onAddPhoto: bindActionCreators(actionCreatePhotoForAnnouncement,dispatch),
				onSetMainPhoto:bindActionCreators(actionSetMainPhoto,dispatch),
			}
		}
		
		default: return undefined;
	}
}

export default mapDispatchToProps;