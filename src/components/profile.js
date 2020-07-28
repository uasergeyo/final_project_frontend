import React from 'react';
import { Switch, NavLink } from 'react-router-dom'
import SETTINGS_W from './wrappers/settings_w'
import OWN_ANNOUNCEMENTS_W from './wrappers/own_announcements_w'
import { PrivateRoute } from '../helpers'
import Loader from './loader'

class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: "Мои объявления",
            avatar: '',
            userName: "",
        };
    }

    componentDidMount() {
        this.props.onGetUserInfo({ id: this.props.userId, token: this.props.token })
            .then(() => this.props.avatar ? this.props.avatar.forEach(a => a.isMain ? this.setState({ avatar: a.photoLink }) : null) : null)
            .then(() => this.setState({ userName: this.props.user.userName }))
    }

    componentDidUpdate(prevProps) {
        if (prevProps.updatedUserPhoto !== this.props.updatedUserPhoto && this.props.updatedUserPhoto) {
            let test = this.props.updatedUserPhoto.map(a => a.isMain ? (this.setState({ avatar: a.photoLink }), true) : null)
            if (this.props.updatedUserPhoto[0] && test.indexOf(true) < 0) {
                this.setState({ avatar: this.props.updatedUserPhoto[0].photoLink })
            } else if (!this.props.updatedUserPhoto[0]) {
                this.setState({ avatar: "" })
            }
            //    console.log("+++++++++++",this.props.updatedUserPhoto.map(a => a.isMain ?( this.setState({ avatar: a.photoLink }),true) : null))    
        } else if (prevProps.userName !== this.props.userName) {
            this.setState({ userName: this.props.userName })
        }
    }

    logOutHandler = () => {
        this.props.onLogOut()
    }

    onClickPointHandler = (e) => {
        this.setState({ title: e.target.innerText })
    }

    render() {
        if (this.props.user) {
            return (
                <div className="pt-5 mb-5">
                    <div className="container ">
                        <div className="d-flex justify-content-between p-4">
                            <div className="d-flex flex-column justify-content-between">
                                <h2 className="text-center mb-5">{this.state.title}</h2>
                                <div className="row d-flex ">
                                    <NavLink className={this.props.location.pathname === "/profile/own_announcements" ? "mr-5 text-decoration-none currentLink" : "mr-5 text-decoration-none"} key="1" onClick={this.onClickPointHandler.bind(this)} to="/profile/own_announcements">Мои oбъявления</NavLink>
                                    <NavLink className={this.props.location.pathname === "/profile/own_settings" ? "mr-5 text-decoration-none currentLink" : "mr-5 text-decoration-none"} key="3" onClick={this.onClickPointHandler.bind(this)} to="/profile/own_settings">Мои настройки</NavLink>
                                    <NavLink className="mr-5 text-decoration-none" key="4" onClick={this.logOutHandler} to="/">Выйти из учетной записи</NavLink>
                                </div>
                            </div>
                            <NavLink className="text-decoration-none d-flex flex-column justify-content-between" onClick={() => this.setState({ title: "Мои настройки" })} to="/profile/own_settings">
                                <img className="rounded-circle img-fluid objectFit border border-primary p-1 mx-auto"
                                    style={{ width: "100px", height: "100px" }} src={this.state.avatar ? this.state.avatar : "http://localhost:4000/content/info/without-photo.png"} alt="..." />
                                <p className="text-center  m-0 text-primary font-weight-bolder">{this.state.userName ? this.state.userName : ""}</p>
                            </NavLink>
                        </div>
                        <div className="row bg-light p-5">
                            <Switch>
                                <PrivateRoute path="/profile/own_announcements" component={OWN_ANNOUNCEMENTS_W} exact />
                                <PrivateRoute path="/profile/own_settings" component={SETTINGS_W} exact />
                            </Switch>
                        </div>
                    </div>
                </div>
            )
        } else {
            return <Loader />
        }

    }
}

export default Profile;