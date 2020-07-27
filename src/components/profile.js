import React from 'react';
import {Switch, NavLink} from 'react-router-dom'
import SETTINGS_W from './wrappers/settings_w'
import Messages from './messages';
import OWN_ANNOUNCEMENTS_W from './wrappers/own_announcements_w'
import {PrivateRoute} from '../helpers'
import Loader from './loader'

class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title:"Профайл",
            avatar:'',
            
        };
    }

    componentDidMount(){
        console.log("this.props.avatar",this.props.avatar)
        this.props.onGetUserInfo({id:this.props.userId,token: this.props.token})
        .then(()=>this.props.avatar?this.props.avatar.forEach(a=>a.isMain ? this.setState({avatar:a.photoLink}):null):null)
    }

    componentDidUpdate(prevProps){
        if(prevProps.resAvaPhoto !== this.props.resAvaPhoto && this.props.resAvaPhoto){
            this.props.resAvaPhoto.map(a=>a.isMain ? this.setState({avatar:a.photoLink}):null) 
        }
    }

    logOutHandler = () => {
        this.props.onLogOut()
    }

    onClickPointHandler =(e)=>{
        this.setState({title:e.target.innerText})
    }

    render() {
        // console.log(this.props.user)
        if(this.props.user){
            return (
                <div className="container pt-5 mb-5">
                    <div className="d-flex justify-content-around">
                    <h2 className="text-center mb-5">{this.state.title}</h2>
                    <h2 className="text-center mb-5">{this.props.user.userName}</h2>
                   {/* <div className="w-25 d-flex align-items-center"> */}
                   {this.state.avatar ? <img className="w-25  rounded-circle cardImg img-fluid" src={this.state.avatar} alt={this.state.avatar}/>:null}
                    {/* </div> */}
                    </div>
                    <div className="row d-flex ">
                        <NavLink className="mr-5" key="1" onClick={this.onClickPointHandler.bind(this)} to="/profile/my_announcements">Мои бъявления</NavLink>
                        <NavLink className="mr-5" key="2" onClick={this.onClickPointHandler.bind(this)} to="/profile/my_messages">Мои сообщения</NavLink>
                        <NavLink className="mr-5" key="3" onClick={this.onClickPointHandler.bind(this)} to="/profile/my_settings">Мои настройки</NavLink>
                        <NavLink className="mr-5" key="4" onClick={this.logOutHandler} to="/">Выйти из учетной записи</NavLink>
                    </div>

                    <div className="row bg-light p-5">
                        <Switch>
                        {/* <Redirect from='/profile' to='/profile/my_announcements' /> */}
                            <PrivateRoute path="/profile/my_announcements" component={OWN_ANNOUNCEMENTS_W} exact />
                            <PrivateRoute path="/profile/my_messages" component={Messages} exact />
                            <PrivateRoute path="/profile/my_settings" component={SETTINGS_W} exact />
                        </Switch>


                    </div>
                </div>
            )}else{
                return <Loader/>
            }
        
    }
}

export default Profile;