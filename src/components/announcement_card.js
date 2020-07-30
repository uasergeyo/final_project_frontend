import React from 'react';
import { NavLink } from 'react-router-dom';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip'

class AnnouncementCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLike: false,
            avatar: '',
            isRemoved: false
        }
    }

    componentDidMount() {
        if (this.props.userLikes.indexOf(this.props.identifier) > -1) {
            this.setState({ isLike: true })
        }
        this.props.announcement.photo.map(a => a.isMain ? this.setState({ avatar: a.photoLink }) : null)
    }

    componentDidUpdate(prevProps) {
        if (prevProps.responseRemoveAnnouncement !== this.props.responseRemoveAnnouncement && this.props.responseRemoveAnnouncement === this.props.identifier) {
            this.setState({ isRemoved: true })
        }
    }

    createLikeHandler = (e) => {
        if (this.props.token) {
            this.props.onCreateLike({ token: this.props.token, announcementId: this.props.identifier })
                .then(() => {
                    if (this.props.responseCreateLike) {
                        this.setState({ isLike: true })
                    } else {
                        this.setState({ isLike: false })
                    }
                })
        } else {
            this.props.history.push("/login")
        }
    }

    removeAnnouncementHandler = () => {
        this.props.onRemoveAnnouncement({
            token: this.props.token,
            body: {
                userId: this.props.userId,
                id: this.props.identifier,
                isDisabled: true,
            }
        })
    }

    fullAnnouncementHandler = (e) => {
        this.props.history.push(`/full-announcement-description/${this.props.identifier}`)
    }

    render() {
        return (
            <div className="col col-lg-3 col-md-4 col-sm-6 col-12 mb-4">
                <div className={this.state.isRemoved ?"card h-100 p-2 removedAnnouncement":"card h-100 p-2"}>
                    <div>
                        {
                            <img src={this.state.avatar ?
                                this.state.avatar : (this.props.announcement.photo && this.props.announcement.photo[0]
                                    && this.props.announcement.photo[0].photoLink) || "/content/info/notFound.jpg"
                            } onClick={this.fullAnnouncementHandler}
                                className="w-100 cursor-pointer card-img-top cardImg img-fluid" alt="..." />
                        }
                        <div className="w-auto overflow-hidden" style={{ height: "52px" }}>
                            <h5 className="card-title cursor-pointer cardHeaderAnnouncement text-left" onClick={this.fullAnnouncementHandler}>
                                {this.state.isRemoved ? "Объявление удалено" : this.props.announcement.announcementHeader ?
                                    (this.props.announcement.announcementHeader.length >= 55 ? this.props.announcement.announcementHeader.slice(0, 55) + '.....' : this.props.announcement.announcementHeader) : ""}
                            </h5>
                        </div>
                    </div>
                    <div className="m-2">
                        <span className="d-flex justify-content-between">
                            <p className="card-text"> {this.props.announcement.city.cityName ? this.props.announcement.city.className : ''}</p>
                            <p className="announcementPrice">{this.props.announcement.announcementPrice ? this.props.announcement.announcementPrice : 'Договорная'}{" "}
                                {this.props.announcement.announcementPrice ? this.props.announcement.currency.currencySymbol : ''}</p>
                        </span>
                        <span className="d-flex flex-column">
                            <p className="cityAndDate">{this.props.announcement.area.areaName} | {this.props.announcement.city.cityName}</p>
                        </span>
                        {this.props.history.location.pathname === "/profile/own_announcements" ?
                            (+this.props.userId === +this.props.announcement.user.id ?
                                <div className="d-flex justify-content-between">
                                    <NavLink className="cityAndDate card-link" to={`/edit-announcement/${this.props.identifier}`}>Редактировать</NavLink>
                                    <p className="cityAndDate cursor-pointer primary-color-for-text" onClick={this.removeAnnouncementHandler}>Удалить</p>
                                </div>
                                : null
                            )
                            : null}
                        <div className="d-flex justify-content-between">
                            <span className="d-flex flex-column align-items-center">
                                <p className="mb-0 cityAndDate">
                                {new Date(+this.props.announcement.createdAt).getDate()}-
                                {new Date(+this.props.announcement.createdAt).getMonth() + 1}-
                                {new Date(+this.props.announcement.createdAt).getFullYear()}</p>
                            </span>
                            <OverlayTrigger
                                placement="top"
                                delay={{ show: 250, hide: 400 }}
                                overlay={<Tooltip>{this.props.token ? (this.state.isLike ? "Удалить из избранных" : "В избранные") : "Необходима авторизация"}</Tooltip>}>
                                <img className="cursor-pointer" src={this.state.isLike ? "/content/likers/like.png" : "/content/likers/not-like.png"} onClick={this.createLikeHandler.bind(this)} alt="..." />
                            </OverlayTrigger>
                        </div>
                    </div>
                </div>
            </div>

        )
    }
}

export default AnnouncementCard;



