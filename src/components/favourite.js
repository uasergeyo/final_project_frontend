import React from 'react';
import ANNOUNCEMENT_CARD_W from './wrappers/announcement_card_w'
import Loader from './loader'
import { NavLink } from 'react-router-dom'


class Favourite extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      announcements: '',
      favourite: ''
    }
  }

  componentDidMount() {
    this.props.onSearchFavourite({ id: this.props.userId, token: this.props.token })
      .then(() => {
        if (this.props.announcements) {
          this.setState({
            announcements: this.props.announcements,
            favourite: this.props.announcements.map(a => a.announcement ? a.announcement.id : null)
          })
        }
      })
  }

  componentDidUpdate(prevProps) {
    if (prevProps.responseCreateLike !== this.props.responseCreateLike) {
      this.props.onSearchFavourite({ id: this.props.userId, token: this.props.token })
        .then(() => this.setState({
          announcements: this.props.announcements,
          favourite: this.props.announcements.map(a => a.announcement ? a.announcement.id : null)
        }))
    }
  }


  render() {
    if (this.state.announcements && this.state.favourite) {
      return (
        <div className={this.state.announcements.length ?"bg-light p-5 mb-5":"bg-light p-5 mb-5 min-vw-100 min-vh-100 "}>
          <div className="container mt-5">
            <h2 className="text-center mb-5 ">Избранные объявления</h2>
            <div className="row d-flex ">
              {
                this.state.announcements.length > 0 ? this.state.announcements.map(a =>
                  a.announcement ?
                    (<ANNOUNCEMENT_CARD_W key={a.announcement.id}
                      announcement={a.announcement}
                      identifier={a.announcement.id}
                      history={this.props.history}
                      userLikes={this.state.favourite}
                    />) : null) :
                  <div className="d-flex flex-column mx-auto justify-content-around " >
                    <h3 className="text-center mt-5 mb-5">Пока нет ничего в избранных</h3>
                    <NavLink to="/" className="btn btn-outline-primary w-75 mb-3 mx-auto">Перейти на главную</NavLink>
                    <NavLink to="/create_announcement" className="btn btn-outline-warning w-75 mb-3 mx-auto">Подать объявление</NavLink>
                  </div>
              }
            </div>
          </div>
        </div>
      )
    } else {
      return <Loader />
    }
  }
}

export default Favourite;