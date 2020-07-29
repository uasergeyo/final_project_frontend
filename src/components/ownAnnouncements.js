import React from 'react';
import Loader from './loader'
import ANNOUNCEMENT_CARD_W from './wrappers/announcement_card_w'
import { NavLink } from 'react-router-dom'

class OwnAnnouncements extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            announcements: '',
            favourite: '',
        }
    }

    componentDidMount() {
        this.props.onSearchLikes({ id: this.props.userId, token: this.props.token })
            .then(() => this.setState({ favourite: this.props.favourite.map(a => a.announcement ? a.announcement.id : null) }))
        this.props.onFindOwnAnnouncements({ id: this.props.userId, token: this.props.token })
            .then(() => this.setState({ announcements: this.props.announcements }))

    }

    render() {
        if (this.props.announcements && this.props.favourite) {
            return (
                <>
                    {
                        this.props.announcements.length ? this.props.announcements.map(a => {
                            return <ANNOUNCEMENT_CARD_W key={a.id}
                                announcement={a}
                                identifier={a.id}
                                history={this.props.history}
                                userLikes={this.state.favourite}
                            />
                        }) : <div className="d-flex flex-column mx-auto justify-content-around"  >
                                <h3 className="text-center mt-5 mb-5">Нет объявлений</h3>
                                <NavLink to="/" className="btn btn-outline-primary mb-3 mx-auto">Перейти на главную</NavLink>
                                <NavLink to="/create_announcement" className="btn btn-outline-warning mb-3 mx-auto">Подать объявление</NavLink>
                            </div>
                    }
                </>
            )
        } else {
            return <Loader />
        }
    }
}

export default OwnAnnouncements;