import React from 'react';
import Loader from './loader';
import PHOTO_GALLERY_W from './wrappers/photo_gallery_w'


class Settings extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            areas: [],
            cities: [],
            cityId: '',
            areaId: '',
            userName: '',
            userEmail: '',
            userPassword: '',
            phoneNumber: '',
            phones: '',
            photo: '',
            areaName: '',
            cityName: '',
            addPhoneNumbers:[],
            removePhoneNumbers:[],
        }
    }

    componentDidMount() {
        if (this.props.userInfo) {
            this.setState({
                areas: this.props.areas,
                cityId: this.props.cityId ? this.props.cityId : '',
                areaId: this.props.areaId ? this.props.areaId : '',
                userName: this.props.userName ? this.props.userName : '',
                userEmail: this.props.userInfo.userEmail,
                phones: this.props.phones,
                areaName: this.props.areaName,
                cityName: this.props.cityName,
                photo:this.props.photo,
            })
        } else {
            this.props.onGetUserInfo({ id: this.props.userId, token: this.props.token })
                .then(() => this.setState({
                    areas: this.props.areas,
                    cityId: this.props.cityId ? this.props.cityId : null,
                    areaId: this.props.areaId ? this.props.areaId : null,
                    userName: this.props.userInfo.userName ? this.props.userInfo.userName : '',
                    userEmail: this.props.userInfo.userEmail,
                    phones: this.props.phones,
                    areaName: this.props.userInfo.area.areaName,
                    cityName: this.props.userInfo.city.cityName,
                    photo:this.props.photo

                }))
        }
    }

    componentDidUpdate(prevProps) {
        if (prevProps.deletedPhoto !== this.props.deletedPhoto) {
            this.props.onGetAvatarPhoto({ userId: this.props.userId})
            .then(()=>this.setState({photo:this.props.updatedUserPhoto}))
        }else if(prevProps.addPhoto !==this.props.addPhoto){
            this.props.onGetAvatarPhoto({ userId: this.props.userId})
            .then(()=>this.setState({photo:this.props.updatedUserPhoto}))
        }
    }

    editNameHandler = (e) => {
        this.setState({ userName: e.target.value })
    }

    editAreaHandler = (e) => {
        // if (e.target.value === "true") {
        //     this.setState({ areaId: '' })
        // } else {
        this.searcherIdForOptions(e.target.value, "areaName", "areaId", this.state.areas)
        this.setState({ cityId: '', cityName: '' })
        // }
        this.props.areas.forEach(element => {
            if (element.areaName === e.target.value) {
                this.setState({
                    cities: element.cities
                })
            }
        });
    }

    editCityHandler = (e) => {
        if (e.target.value === "true") {
            this.setState({ cityId: '' })
        } else {
            this.searcherIdForOptions(e.target.value, "cityName", "cityId", this.state.cities)
        }
    }

    searcherIdForOptions(value, key, fieldNameInState, valueParentElement) {
        valueParentElement.forEach(i => {
            if (i[key] === value) {
                this.setState({ [fieldNameInState]: i.id })
            }
        })
    }

    buttonContactDataHandler = () => {
        this.props.onUpdateUserNameAndCity({
            token: this.props.token,
            data: {
                id: this.props.userId,
                userName: this.state.userName,
                cityId: this.state.cityId,
                areaId: this.state.areaId,
            }
        })
    }

    editEmailHandler = (e) => {
        this.setState({ userEmail: e.target.value })
    }

    editPasswordHandler = (e) => {
        this.setState({ userPassword: e.target.value })
    }

    buttonLoginAndEmailHandler = () => {
        this.props.onUpdateUserLoginAndPassword({
            token: this.props.token,
            data: {
                id: this.props.userId,
                userEmail: this.state.userEmail,
                userPassword: this.state.userPassword
            }
        })
    }

    editPhoneHandler = (e) => {
        this.setState({ phoneNumber: e.target.value })
    }

    buttonRemovePhoneHandler = (e) => {
        this.props.onRemovePhone({
            token: this.props.token,
            id: e.target.name,
        }).then(()=>this.setState({phones:this.props.removePhoneNumbers}))
    }

    buttonEditPhoneHandler = () => {
        this.props.onAddPhoneNumber({
            token: this.props.token,
            data: {
                phone: this.state.phoneNumber,
                userId: this.props.userId,
            }
        }).then(()=>this.setState({phones:this.props.addPhoneNumbers}))
    }

    inputPhotoHandler = async (e) => {
        let photoName = "/" + await (await fetch('http://localhost:4000/upload/users', {
            method: "POST",
            body: e.target.files[0]
        })).text()
        this.props.onAddAvatar({
            token: this.props.token,
            data: {
                photoLink:`http://localhost:4000/users${photoName}` ,
                userId: this.props.userId,
            }
        })
       
    }

    buttonSavePhotoHandler = (e) => {
        this.props.onGetAvatarPhoto({                
                userId: this.props.userId
               })
    }

    buttonRemoveProfileHandler = () => {
        this.props.onRemoveUser({
            token: this.props.token,
            id: this.props.userId
        })
    }

    render() {
        if (this.props.userInfo) {
            return (
                <div className="container mb-5">
                    <div className="row">
                        <div className="col">
                            <div className="accordion mt-5 mb-5" id="accordionExample">
                                <div className="card mb-4">
                                    <div className="card-header" id="headingOne">
                                        <h5 className="mb-0">
                                            <button className="btn btn-link" type="button" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">Изменить контактные данные</button>
                                        </h5>
                                    </div>
                                    <div id="collapseOne" className="collapse" aria-labelledby="headingOne" data-parent="#accordionExample">
                                        <div className="card-body">
                                            <div className="form-group m-4">
                                                <div className="form-group">
                                                    <label htmlFor="editInputName">Сменить имя</label>
                                                    <input type="text" onChange={this.editNameHandler.bind(this)} defaultValue={this.props.userInfo.userName} className="form-control" id="editInputName" placeholder="Example input placeholder" />
                                                </div>
                                                <div className="d-flex ">
                                                    <div className="col pr-0 col-lg-6 pl-0 pr-3">
                                                        <label htmlFor="editInputArea">Выберите область</label>
                                                        <select onChange={this.editAreaHandler.bind(this)} className="form-control " id="editInputArea">
                                                            <option value>{this.state.areaName}</option>
                                                            {this.props.areas ? this.props.areas.map(a => a.areaName !== this.state.areaName ? <option id={a.id} key={a.id}>{a.areaName}</option> : null) : null}
                                                        </select>
                                                    </div>
                                                    <div className="col pr-0 col-lg-6">
                                                        <label htmlFor="editInputCity">Выберите город</label>
                                                        <select onChange={this.editCityHandler.bind(this)} className="form-control" id="editInputCity">
                                                            <option value>{this.state.cityName}</option>
                                                            {this.state.cities ? this.state.cities.map(a => a.cityName !== this.state.cityName ? <option key={a.id}>{a.cityName}</option> : null) : null}
                                                        </select>
                                                    </div>
                                                </div>
                                                <span className="d-flex justify-content-center m-4">
                                                    <button type="button" onClick={this.buttonContactDataHandler} className="btn btn-lg btn-primary">Coxpaнить</button>
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="card mb-4">
                                    <div className="card-header" id="headingTwo">
                                        <h5 className="mb-0">
                                            <button className="btn btn-link" type="button" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="true" aria-controls="collapseOne">Изменить данные для входа</button>
                                        </h5>
                                    </div>
                                    <div id="collapseTwo" className="collapse" aria-labelledby="headingTwo" data-parent="#accordionExample">
                                        <div className="card-body">
                                            <div className="form-group m-4">
                                                <div className="form-group">
                                                    <label htmlFor="inputSettingsEmail">Сменить email</label>
                                                    <input onChange={this.editEmailHandler.bind(this)} defaultValue={this.state.userEmail} type="email" className="form-control" id="inputSettingsEmail" placeholder="Another input placeholder" />
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="inputSettingsPassword">Введите новый пароль</label>
                                                    <input onChange={this.editPasswordHandler.bind(this)} type="password" className="form-control" id="inputSettingsPassword" placeholder="Example input placeholder" />
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="inputSettingsPasswordRepeat">Повторите пароль</label>
                                                    <input type="password" className="form-control" id="finputSettingsPasswordRepeat" placeholder="Another input placeholder" />
                                                </div>
                                                <span className="d-flex justify-content-center m-4">
                                                    <button onClick={this.buttonLoginAndEmailHandler} type="button" className="btn btn-lg btn-primary">Coxpaнить</button>
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="card mb-4">
                                    <div className="card-header" id="headingThree">
                                        <h5 className="mb-0">
                                            <button className="btn btn-link" type="button" data-toggle="collapse" data-target="#collapseThree" aria-expanded="true" aria-controls="collapseOne">Изменить номер телефона</button>
                                        </h5>
                                    </div>
                                    <div id="collapseThree" className="collapse" aria-labelledby="headingThree" data-parent="#accordionExample">
                                        <div className="card-body">
                                            <div className="form-group m-4">
                                                <div className="form-group">
                                                    <div className="d-flex flex-column">
                                                        {this.state.phones ? this.state.phones.map(a => <div className="d-flex" key={a.id} ><p>{a.phone}</p> <button name={a.id} onClick={this.buttonRemovePhoneHandler.bind(this)}>Удалить номер</button></div>) : null}
                                                    </div>
                                                    <label htmlFor="inputSettingsPhone">Добавить телефон</label>
                                                    <input onChange={this.editPhoneHandler.bind(this)} type="text" className="form-control" id="inputSettingsPhone" placeholder="Another input placeholder" />
                                                </div>
                                                <span className="d-flex justify-content-center m-4">
                                                    <button onClick={this.buttonEditPhoneHandler} type="button" className="btn btn-lg btn-primary">Coxpaнить</button>
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="card mb-4">
                                    <div className="card-header" id="headingFour">
                                        <h5 className="mb-0">
                                            <button className="btn btn-link" type="button" data-toggle="collapse" data-target="#collapseFour" aria-expanded="true" aria-controls="collapseOne">Добавить фото</button>
                                        </h5>
                                    </div>
                                    <div id="collapseFour" className="collapse" aria-labelledby="headingFour" data-parent="#accordionExample">
                                        <div className="card-body">
                                            <div className="form-group m-4">
                                                <div className="custom-file">
                                                    {this.state.photo?<PHOTO_GALLERY_W photo={this.state.photo} token={this.props.token}/> :null}
                                                    {this.state.photo ? <img src={this.state.photo} className="img-thumbnail w-25" alt={this.state.profilePhoto} /> : null}
                                                    <input onChange={this.inputPhotoHandler.bind(this)} type="file" name="file" />
                                                </div>
                                                <span className="d-flex justify-content-center m-4">
                                                    <button onClick={this.buttonSavePhotoHandler} type="button" className="btn btn-lg btn-primary">Coxpaнить</button>
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="card mb-4">
                                    <div className="card-header" id="headingFive">
                                        <h5 className="mb-0">
                                            <button className="btn btn-link collapsed" type="button" data-toggle="collapse" data-target="#collapseFive" aria-expanded="false" aria-controls="collapseFive">Удалить профайл</button>
                                        </h5>
                                    </div>
                                    <div id="collapseFive" className="collapse" aria-labelledby="heading" data-parent="#accordionExample">
                                        <div className="card-body">
                                            <div className="form-group m-4">
                                                <span className="d-flex justify-content-center m-4">
                                                    <button type="button" onClick={this.buttonRemoveProfileHandler} className="btn btn-lg btn-primary">Удалить профайл</button>
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>







            )
        } else {
            return <Loader />
        }
    }
}

export default Settings;