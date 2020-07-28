import React from 'react';
import Loader from './loader';
import PHOTO_GALLERY_W from './wrappers/photo_gallery_w'
import Alert from 'react-bootstrap/Alert'


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
            phoneNumber: '+380',
            phones: '',
            photo: '',
            areaName: '',
            cityName: '',
            addPhoneNumbers: [],
            removePhoneNumbers: [],
            // ----validators--
            warningPhone: "",
            warningName: "",
            responseOnUpdateUserNameAndLocation: false,
            warningUpdateUserNameAndLocation: "",
            passInputSucess: false,
            passwordInfo: "",
            emailInfo: "",
            passCompareSucess: false,
            passCopyInfo: "",
            userPasswordRepeat: "",
            wrongPassOrEmail:"",
            isDataChangeSuccess:false,

        }
    }

    componentDidMount() {
       let obj={
            areas: this.props.areas,
                cityId: this.props.cityId ? this.props.cityId : '',
                areaId: this.props.areaId ? this.props.areaId : '',
                userName: this.props.userName ? this.props.userName : '',
                userEmail: this.props.userInfo.userEmail,
                phones: this.props.phones,
                areaName: this.props.areaName,
                cityName: this.props.cityName,
                photo: this.props.photo,
        }
        if (this.props.userInfo) {
            this.setState({...obj })
        } else {
            this.props.onGetUserInfo({ id: this.props.userId, token: this.props.token })
                .then(() => this.setState({...obj }))
        }
    }

    componentDidUpdate(prevProps) {
        if (prevProps.deletedPhoto !== this.props.deletedPhoto ) {
            this.props.onGetAvatarPhoto({ userId: this.props.userId })
                .then(() => this.setState({ photo: this.props.updatedUserPhoto }))
        } else if (prevProps.addPhoto !== this.props.addPhoto) {
            this.props.onGetAvatarPhoto({ userId: this.props.userId })
                .then(() => this.setState({ photo: this.props.updatedUserPhoto}))
        } else if (prevProps.setMainPhoto !== this.props.setMainPhoto && this.props.setMainPhoto) {
            this.props.onGetAvatarPhoto({ userId: this.props.userId })
            .then(() => this.setState({ photo: this.props.updatedUserPhoto }))
        } else if (prevProps.responseOnUpdateUserNameAndLocation !== this.props.responseOnUpdateUserNameAndLocation) {
            this.setState({ responseOnUpdateUserNameAndLocation: this.props.responseOnUpdateUserNameAndLocation })
        }else if(prevProps.responseOnPassAndEmailChange !== this.props.responseOnPassAndEmailChange && this.props.responseOnPassAndEmailChange){
            this.setState({isDataChangeSuccess:true})
        }else if(prevProps.responseOnPassAndEmailError !== this.props.responseOnPassAndEmailError &&this.props.responseOnPassAndEmailError && this.props.responseOnPassAndEmailError[0]){
            this.setState({wrongPassOrEmail:this.props.responseOnPassAndEmailError[0].message})
            
        }
    }

    editNameHandler = (e) => {
        if (!e.target.value.length || e.target.value.length > 2) {
            this.setState({
                userName: e.target.value ? e.target.value[0].toUpperCase() + e.target.value.slice(1) : "",
                warningName: ""
            })
        } else {
            this.setState({
                userName: "",
                warningName: "Самое аороткое имя - И́я (др.-греч. Ἰάς — «иониянка») — женское русское личное имя греческого происхождения"
            })
        }
    }

    editAreaHandler = (e) => {
        if (e.target.value === "true") {
            this.setState({ areaId: '',cities:[],cityId:'' })
        } else {
        this.searcherIdForOptions(e.target.value, "areaName", "areaId", this.state.areas)
        this.setState({ cityId: '', cityName: '' })
        }
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
        if (this.state.userName && this.state.cityId && this.state.areaId) {
            this.setState({
                responseOnUpdateUserNameAndLocation: false,
                warningUpdateUserNameAndLocation: ""
            }, () =>
                this.props.onUpdateUserNameAndCity({
                    token: this.props.token,
                    data: {
                        id: this.props.userId,
                        userName: this.state.userName,
                        cityId: this.state.cityId,
                        areaId: this.state.areaId,
                    }
                }))
        } else {
            this.setState({ warningUpdateUserNameAndLocation: "Все поля должны быть заполнены соответствующим образом",
                            responseOnUpdateUserNameAndLocation:false
        })
        }
        // responseOnUpdateUserNameAndLocation
    }

    editEmailHandler = (e) => {
        if (this.validateEmail(e.target.value)) {
            this.setState({
                userEmail: e.target.value,
                emailInfo: ""
            })
        } else if (!e.target.value || !this.validateEmail(e.target.value)) {
            this.setState({
                userEmail: e.target.value,
                emailInfo: "Email должен быть формата email@email.com"
            })
        }
    }

    editPasswordHandler = (e) => {
        if (!e.target.value) {
            this.setState({
                passInputSucess: false,
                userPassword: e.target.value,
                passwordInfo: ""
            })
        } else if (e.target.value.length < 8) {
            this.setState({
                passInputSucess: false,
                passwordInfo: "Короткий пароль. Минимум 8 символов.",
                userPassword: e.target.value,
            })
        } else if (e.target.value === e.target.value.toLowerCase()) {
            this.setState({
                passInputSucess: false,
                passwordInfo: "Пароль должен состоять из заглавных и строчных символов.",
                userPassword: e.target.value,
            })
        } else if (e.target.value.match(/^(?=.*?[A-Z])(?=(.*[a-z]){1,})(?=(.*[\d]){1,})(?=(.*[\W]){1,})(?!.*\s).{8,}$/)) {
            this.setState({
                passInputSucess: true,
                userPassword: e.target.value,
                passwordInfo: "Суперпароль ."
            })
        } else if (this.validatePassword(e.target.value)) {
            this.setState({
                passInputSucess: true,
                userPassword: e.target.value,
                passwordInfo: "Надежный пароль"
            })
        }
    }

    passwordRepeatHandler = (e) => {
        if (e.target.value === "") {
            this.setState({
                passCopyInfo: "",
                passCompareSucess: false,
                userPasswordRepeat: e.target.value
            })
        } else if (this.state.userPassword === e.target.value) {
            this.setState({
                passCompareSucess: true,
                passCopyInfo: "Пароли совпали",
                userPasswordRepeat: e.target.value
            })
        } else if (this.state.userPassword !== e.target.value) {
            this.setState({
                passCopyInfo: "Пароли должны быть одинаковые",
                userPasswordRepeat: e.target.value,
                passCompareSucess: false
            })
        }
    }

    validateEmail(email) {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    validatePassword(pass) {
        let lowerPass = pass.toLowerCase()
        if (pass.length > 7 && lowerPass !== pass) {
            return true
        } else {
            return false
        }
    }

    buttonLoginAndEmailHandler = () => {
        if (this.validateEmail(this.state.userEmail) && this.validatePassword(this.state.userPassword) && this.state.userPasswordRepeat === this.state.userPassword) {
            // this.props.onUpdateUserLoginAndPassword({
            //     token: this.props.token,
            //     data: {
            //         id: this.props.userId,
            //         userEmail: this.state.userEmail,
            //         userPassword: this.state.userPassword
            //     }
            // })
            this.setState({
                wrongPassOrEmail:"",
                isDataChangeSuccess:false,
            },()=>this.props.onUpdateUserLoginAndPassword({
                token: this.props.token,
                data: {
                    id: this.props.userId,
                    userEmail: this.state.userEmail,
                    userPassword: this.state.userPassword
                }
            }).then(()=>this.setState({ userPassword:"",
                                        userPasswordRepeat:"",
                                        passwordInfo: "",
                                        passCopyInfo:"",passInputSucess:"",
                                        passCompareSucess:""}))
            )
        } else {
            this.setState({
                wrongPassOrEmail:"Все поля должны быть заполнены соответствующими значениями.",
                isDataChangeSuccess:false
            })
        }
    }

    editPhoneHandler = (e) => {
        if (e.target.value.match(/^\+[0-9]{12}$/)) {
            this.setState({
                phoneNumber: e.target.value,
                warningPhone: ""
            })
        } else {
            this.setState({
                warningPhone: "Телефон должен быть формата +380*********",
                phoneNumber: e.target.value,

            })
        }
    }

    buttonRemovePhoneHandler = (id) => {
        this.props.onRemovePhone({
            token: this.props.token,
            id,
        }).then(() => this.setState({ phones: this.props.removePhoneNumbers }))
    }

    buttonEditPhoneHandler = () => {
        if (this.state.phoneNumber.match(/^\+[0-9]{12}$/) && this.state.phones.map(a => a.phone).indexOf(this.state.phoneNumber) === -1) {
            this.props.onAddPhoneNumber({
                token: this.props.token,
                data: {
                    phone: this.state.phoneNumber,
                    userId: this.props.userId,
                }
            }).then(() => this.setState({
                phones: this.props.addPhoneNumbers,
                warningPhone: "",
                phoneNumber: "+380"
            }))
        } else if(this.state.phones.map(a => a.phone).indexOf(this.state.phoneNumber) !== -1) {
            this.setState({
                warningPhone: "Этот номер уже добавлен"
            })
        }else if(!this.state.phoneNumber.match(/^\+[0-9]{12}$/)){
            this.setState({
                warningPhone: "Телефон должен быть формата +380*********"
            })
        }
    }

    inputPhotoHandler = async (e) => {
        let photoName = "/" + await (await fetch('http://localhost:4000/upload/users', {
            method: "POST",
            body: e.target.files[0]
        })).text()
        this.props.onAddAvatar({
            token: this.props.token,
            data: {
                photoLink: `http://localhost:4000/users${photoName}`,
                userId: this.props.userId,
            }
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
                                            <button className="btn btn-link text-decoration-none" type="button" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">Изменить контактные данные</button>
                                        </h5>
                                    </div>
                                    <div id="collapseOne" className="collapse" aria-labelledby="headingOne" data-parent="#accordionExample">
                                        <div className="card-body">
                                            {
                                                this.state.warningUpdateUserNameAndLocation ? <p className="inputWarning">{this.state.warningUpdateUserNameAndLocation}</p> : null
                                            }
                                            <div className="form-group m-4">
                                                <div className="form-group">
                                                    <label htmlFor="editInputName" className={this.state.warningName ? "inputWarning" : ""}>{this.state.warningName ? this.state.warningName : "Сменить имя"}</label>
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
                                                {
                                                    this.state.responseOnUpdateUserNameAndLocation ? (
                                                        <Alert className="mb-3 mt-3 text-center" variant="success" onClose={() => this.setState({ responseOnUpdateUserNameAndLocation: false })} dismissible>
                                                            <Alert.Heading>Изменения успешно сохранены.</Alert.Heading>
                                                        </Alert>) : null
                                                }
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
                                            <button className="btn btn-link text-decoration-none" type="button" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="true" aria-controls="collapseOne">Изменить логин и пароль</button>
                                        </h5>
                                    </div>
                                    <div id="collapseTwo" className="collapse" aria-labelledby="headingTwo" data-parent="#accordionExample">
                                        <div className="card-body">
                                            <div className="form-group m-4">
                                            <p className="inputWarning">{this.state.wrongPassOrEmail}</p>
                                                <div className="form-group">
                                                    <label htmlFor="inputSettingsEmail" className={this.state.emailInfo ? "inputWarning mb-1" : "mb-1 text-muted"}>{this.state.emailInfo ? this.state.emailInfo : "Сменить email"}</label>
                                                    <input onChange={this.editEmailHandler.bind(this)} defaultValue={this.state.userEmail} type="email" className="form-control" id="inputSettingsEmail" placeholder="Another input placeholder" />
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="inputSettingsPassword" className={this.state.passInputSucess ? "inputSucess mb-1" : this.state.passwordInfo ? "inputWarning mb-1" : "mb-1 text-muted"}>{this.state.passwordInfo ? this.state.passwordInfo : "Введите новый пароль"}</label>
                                                    <input onChange={this.editPasswordHandler.bind(this)} type="password" value={this.state.userPassword} className="form-control" id="inputSettingsPassword" placeholder="Example input placeholder" />
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="inputSettingsPasswordRepeat" className={this.state.passCompareSucess ? "inputSucess mb-1" : this.state.passCopyInfo ? "inputWarning mb-1" : "mb-1 text-muted"}>{this.state.passCopyInfo ? this.state.passCopyInfo : "Повторите новый пароль"}</label>
                                                    <input type="password" onChange={this.passwordRepeatHandler.bind(this)} value={this.state.userPasswordRepeat} className="form-control" id="finputSettingsPasswordRepeat" placeholder="Another input placeholder" />
                                                </div>
                                                {
                                                    this.state.isDataChangeSuccess?( <Alert variant="success" onClose={() => this.setState({isDataChangeSuccess:false})} dismissible>
                                                    <Alert.Heading className="mb-3 mt-3 text-center">Данные успешно сохранены.</Alert.Heading>
                                                  </Alert>):null
                                                }
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
                                            <button className="btn btn-link text-decoration-none" type="button" data-toggle="collapse" data-target="#collapseThree" aria-expanded="true" aria-controls="collapseOne">Редактировать номера телефонов</button>
                                        </h5>
                                    </div>
                                    <div id="collapseThree" className="collapse" aria-labelledby="headingThree" data-parent="#accordionExample">
                                        <div className="card-body">
                                            <div className="form-group m-4">
                                                <div className="form-group">
                                                    <div className="d-flex flex-column">
                                                        {this.state.phones ? this.state.phones.map(a => <div className="d-flex w-50" key={a.id} ><p>{a.phone}</p> <p className="cursor-pointer primary-color-for-text ml-3" onClick={() => this.buttonRemovePhoneHandler(a.id)} name={a.id} > Удалить номер</p></div>) : null}
                                                    </div>
                                                    <label htmlFor="inputSettingsPhone" className={this.state.warningPhone ? "inputWarning" : ""}>{this.state.warningPhone ? this.state.warningPhone : "Добавить телефон"}</label>
                                                    <input onChange={this.editPhoneHandler.bind(this)} value={this.state.phoneNumber} type="phone" className="form-control" id="inputSettingsPhone" placeholder="Another input placeholder" />
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
                                            <button className="btn btn-link text-decoration-none" type="button" data-toggle="collapse" data-target="#collapseFour" aria-expanded="true" aria-controls="collapseOne">Добавить фото</button>
                                        </h5>
                                    </div>
                                    <div id="collapseFour" className="collapse" aria-labelledby="headingFour" data-parent="#accordionExample">
                                        <div className="card-body">
                                            <div className="form-group m-4">
                                                <div className="custom-file">
                                                    {this.state.photo ? <PHOTO_GALLERY_W photo={this.state.photo} token={this.props.token} /> : null}
                                                    <input onChange={this.inputPhotoHandler.bind(this)} type="file" name="file" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="card mb-4">
                                    <div className="card-header" id="headingFive">
                                        <h5 className="mb-0">
                                            <button className="btn btn-link collapsed text-decoration-none" type="button" data-toggle="collapse" data-target="#collapseFive" aria-expanded="false" aria-controls="collapseFive">Удалить профайл</button>
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