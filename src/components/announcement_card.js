import React from 'react';
import { NavLink } from 'react-router-dom';
import Card from 'react-bootstrap/Card'

class AnnouncementCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLike: false
        }
    }
    createLikeHandler = (e) => {
        this.props.onCreateLike({ token: this.props.token, announcementId: this.props.identifier })
            .then(() => {
                if (this.props.responseCreateLike) {
                    this.setState({ islike: true })
                } else {
                    this.setState({ isLike: false })
                }
            })
    }

    removeAnnouncementHandler = () => {
        this.props.onRemoveAnnouncement({
            token: this.props.token,
            body: {
                userId: this.props.userId,
                id: this.props.identifier,
                isDisabled: true
            }
        })
    }

    fullAnnouncementHandler = (e) => {
        this.props.history.push(`/full-announcement-description/${this.props.identifier}`)
    }

    render() {
        return (
            // <Card className="m-1" key={this.props.identifier}>
            //     {
            //         this.props.announcement.photo[0] !== undefined ? <Card.Img variant="top" src={this.props.announcement.photo[0].photoLink} onClick={this.fullAnnouncementHandler} className="card-img-top cardImg img-fluid img-thumbnail" alt="..." /> : <Card.Img variant="top" src="/images/notFound.jpg" onClick={this.fullAnnouncementHandler} className="card-img-top cardImg img-fluid img-thumbnail" alt="..." />
            //     }
            //     <Card.Body>
            //         <Card.Title className="card-title cursor-pointer" onClick={this.fullAnnouncementHandler}>{this.props.announcement.announcementHeader ? this.props.announcement.announcementHeader : ""}</Card.Title>
            //         <Card.Text>
            //             <span className="d-flex justify-content-between">
            //                 <p className="card-text"> {this.props.announcement.city.cityName ? this.props.announcement.city.className : ''}</p>
            //                 <p>{this.props.announcement.announcementPrice ? this.props.announcement.announcementPrice : 'Договорная'} {this.props.announcement.currency.currencySymbol ? this.props.announcement.currency.currencySymbol : ''} </p>
            //             </span>
            //             <span className="d-flex justify-content-between">
            //                 <p> {new Date(this.props.announcement.createdAt).getDay()}-
            //                     {new Date(this.props.announcement.createdAt).getMonth() + 1}-
            //                     {new Date(this.props.announcement.createdAt).getFullYear()}</p>
            //                 <span className="bg-success " onClick={this.createLikeHandler.bind(this)}>&#9825;</span>
            //             </span>
            //         </Card.Text>
            //     </Card.Body>
            //     <Card.Footer>
            //     {this.props.history.location.pathname === "/profile/my_announcements" ?
            //                 // (this.props.announcement.user?
            //                 (+this.props.userId === +this.props.announcement.user.id ?
            //                     <div>
            //                         <NavLink className="card-link" to={`/edit-announcement/${this.props.identifier}`}>Редактировать объявление</NavLink>
            //                         <small className="cursor-pointer primary-color-for-text" onClick={this.removeAnnouncementHandler}>Удалить объявление</small>
            //                     </div>
            //                     : null)
            //                 // :null)
            //                 : null}
            //         <small className="text-muted">Редактировать объявление</small>

            //     </Card.Footer>
            // </Card>
            <div className="col col-lg-3 col-md-4 col-sm-6 mb-4">
                <div className="card h-100">
                    <div>
                        {
                            <img src={this.props.announcement.photo[0] !== undefined ? this.props.announcement.photo[0].photoLink : "/images/notFound.jpg"} onClick={this.fullAnnouncementHandler} className="w-100 card-img-top cardImg img-fluid img-thumbnail" alt="..." />
                            // this.props.announcement.photo[0] !== undefined ? <img src={this.props.announcement.photo[0].photoLink} onClick={this.fullAnnouncementHandler} className="card-img-top cardImg img-fluid img-thumbnail" alt="..." /> : <img src="/images/notFound.jpg" onClick={this.fullAnnouncementHandler} className="card-img-top cardImg img-fluid img-thumbnail" alt="..." />
                        }
                        {/* <div className="h-75 bg-alarm d-flex flex-column "> */}
                        <h5 className="card-title cursor-pointer cardHeaderAnnouncement" onClick={this.fullAnnouncementHandler}>{this.props.announcement.announcementHeader ? this.props.announcement.announcementHeader : ""}</h5>
                        {/* </div> */}
                    </div>
                    <div className="m-2">
                        {/* <h5 className="card-title cursor-pointer" onClick={this.fullAnnouncementHandler}>{this.props.announcement.announcementHeader ? this.props.announcement.announcementHeader : ""}</h5> */}
                        <span className="d-flex justify-content-between">
                            <p className="card-text"> {this.props.announcement.city.cityName ? this.props.announcement.city.className : ''}</p>
                            <p className="announcementPrice">{this.props.announcement.announcementPrice ? this.props.announcement.announcementPrice : 'Договорная'} {this.props.announcement.currency.currencySymbol ? this.props.announcement.currency.currencySymbol : ''} </p>
                        </span>
                        <span className="d-flex flex-column">
                            <p className="cityAndDate">{this.props.announcement.area.areaName} | {this.props.announcement.city.cityName}</p>
                            <p className="cityAndDate">{new Date(this.props.announcement.createdAt).getDay()}-
                                {new Date(this.props.announcement.createdAt).getMonth() + 1}-
                                {new Date(this.props.announcement.createdAt).getFullYear()}</p>
                            {/* this.state.isLike? */}
                            <span className="bg-success " onClick={this.createLikeHandler.bind(this)}>&#9825;</span>
                            {/* <span alt={`#${this.props.announcement.id}`} className="bg-transparent" onClick={this.createLikeHandler.bind(this)} className="text-decoration-none">&#x2764;</span> */}
                            {/* &hearts; &#x2764; &#x2661; stars &#x2606;  &#x2605;*/}
                        </span>
                        {/* {this.props.userId===this.props.announcement.user.id ?<NavLink to=`/edit-announcement/{this.props.identifier}`/>:null} */}
                        {this.props.history.location.pathname === "/profile/my_announcements" ?
                            // (this.props.announcement.user?
                            (+this.props.userId === +this.props.announcement.user.id ?
                                <div>
                                    <NavLink className="card-link" to={`/edit-announcement/${this.props.identifier}`}>Редактировать объявление</NavLink>
                                    <p className="cursor-pointer primary-color-for-text" onClick={this.removeAnnouncementHandler}>Удалить объявление</p>
                                </div>
                                : null)
                            // :null)
                            : null}
                        {/* {this.props.announcement.user?(this.props.userId===this.props.announcement.user.id ?<div>MOEEEEEEEEE</div>:null):null} */}
                    </div>
                </div>
            </div>

        )
    }
}

export default AnnouncementCard;


