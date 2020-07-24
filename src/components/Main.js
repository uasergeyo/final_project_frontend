import React from 'react'
import MAIN_PAGE_W from './wrappers/main_page_w'
import {PrivateRoute} from '../helpers'
// import helpers from '../helpers'
import REGISTRATON_W from './wrappers/registration_w'
import { Route, Switch} from 'react-router-dom'
import Profile_W from './wrappers/profile_w';
import FAVOURITE_W from './wrappers/favourite_w';
import NotFound from './not_found';
import LogIn_W from './wrappers/login_w';
import CREATE_ANNOUNCEMENT_W from './wrappers/createAnnouncement_w'
import FULL_ANNOUNCEMENT_W from './wrappers/full_announcement_desc_w'
import EDIT_ANNOUNCEMENT_W from './wrappers/edit_announcement_w'


class LinkForWarnings extends React.Component{
render(){
    return(
<div>Когда-нибудь здесь будет контент,а может и не будет</div>
    )
}
}


class Main extends React.Component {
    render() {
        return (
            <div className="flex-shrink-0">
                <Switch>
                    <PrivateRoute path="/create_announcement" component={CREATE_ANNOUNCEMENT_W} />
                    <Route path="/login" component={LogIn_W} />
                    <Route path="/registration" component={REGISTRATON_W} />
                    <PrivateRoute path="/favourite" component={FAVOURITE_W} />
                    <PrivateRoute path="/profile" component={Profile_W} />
                    <PrivateRoute path="/edit-announcement/:id" component={EDIT_ANNOUNCEMENT_W}/>
        <Route path="/l_w" component={LinkForWarnings}/>
                    <Route path="/full-announcement-description/:id" component={FULL_ANNOUNCEMENT_W}/>
                    <Route path="/" component={MAIN_PAGE_W} />
                    <Route component={NotFound} />
                </Switch>
            </div>
        )
    }
}

export default Main;




