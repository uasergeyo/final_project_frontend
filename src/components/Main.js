import React from 'react'
import MAIN_PAGE_W from './wrappers/main_page_w'
import {PrivateRoute} from '../helpers'
import REGISTRATON_W from './wrappers/registration_w'
import { Route, Switch} from 'react-router-dom'
import PROFILE_W from './wrappers/profile_w';
import FAVOURITE_W from './wrappers/favourite_w';
import NotFound from './not_found';
import LogIn_W from './wrappers/login_w';
import CREATE_ANNOUNCEMENT_W from './wrappers/createAnnouncement_w'
import FULL_ANNOUNCEMENT_W from './wrappers/full_announcement_desc_w'
import EDIT_ANNOUNCEMENT_W from './wrappers/edit_announcement_w'
import AnnouncementActionResult from './announcementActionResult'
import WillBeDone from './willBeDone'


class Main extends React.Component {
    render() {
        return (
            <div className="flex-shrink-0 bg-light border-bottom mb-5">
                <Switch>
                    <PrivateRoute path="/create_announcement" component={CREATE_ANNOUNCEMENT_W} exact />
                    <Route path="/login" component={LogIn_W} exact/>
                    <Route path="/registration" component={REGISTRATON_W} exact />
                    <PrivateRoute path="/favourite" component={FAVOURITE_W} exact />
                    <PrivateRoute path="/profile" component={PROFILE_W}/>
                    <PrivateRoute path="/edit-announcement/:id" component={EDIT_ANNOUNCEMENT_W} exact/>
                    <PrivateRoute path="/announcement-action-result/:id" component={AnnouncementActionResult} exact/>
                    <Route path="/full-announcement-description/:id" component={FULL_ANNOUNCEMENT_W} exact/>
                    <Route path="/advanced_search" component={MAIN_PAGE_W} exact/>
                    <Route path="/most-popular-requests" component={WillBeDone} exact/>
                    <Route path="/site-map" component={WillBeDone} exact/>
                    <Route path="/ukraine-map" component={WillBeDone} exact/>
                    <Route path="/how-to-buy-and-sell" component={WillBeDone} exact/>
                    <Route path="/help" component={WillBeDone} exact/>
                    <Route path="/" component={MAIN_PAGE_W} exact/>
                    <Route component={NotFound} />
                </Switch>
            </div>
        )
    }
}

export default Main;




