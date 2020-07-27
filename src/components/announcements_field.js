import React from 'react'
import ANNOUNCEMENT_CARD_W from './wrappers/announcement_card_w';
import Loader from './loader'
import Pagination from 'react-bootstrap/Pagination'


class AnnouncementsField extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
      buttons: [],
      favourite: '',
    }
  }

  componentDidMount = () => {

    if (this.props.userId) {
      this.props.onSearchLikes({ id: this.props.userId, token: this.props.token })
        .then(() => {
            this.setState({ favourite: this.props.favourite.map(a => a.announcement ? a.announcement.id : null) })
        })
    }else{
      this.setState({ favourite: []})
    }
    this.props.onSearch({ limit: 16, offset: 0 })
    .then(() =>this.setState({count:this.props.count},()=>this.createPaginationItems()))
  }

  componentDidUpdate(prevState) {
    if (prevState.count !== this.props.count) {
      this.setState({ count: this.props.count }, () => this.createPaginationItems())
    }
    
  }


  createPaginationItems() {
    let arr = []
    for (let i = 1; i <= Math.ceil(this.state.count / 16); i++) {
      arr.push(i)
    }
    this.setState({ buttons: arr })
  }

  paginationButtonHandler(e) {
    this.props.onSearch({ ...this.props.requestData, limit: 16, offset: +e.target.name * 16 - 16 })
  }

  render() {
    if (this.props.announcements && this.state.favourite) {
      return (
        <div className="bg-light mb-5 pt-5 pb-5">
          <div className="container mb-5 mx-auto">
            <div className="row row-cols-1 row-cols-md-3">
              {this.props.announcements ? this.props.announcements.map(a => {
                let identifier = a.id;
                return <ANNOUNCEMENT_CARD_W history={this.props.history}
                  key={a.id} announcement={a}
                  identifier={identifier}
                  // userLikes={this.state.favourite.map(a => a.announcement ? a.announcement.id : null)} />
                  userLikes={this.state.favourite} />
              }) : null}
              {/* {this.props.announcements.payload.data.searchAnnouncements.map(a => <AnnouncementCard key={a.id} announcement={a} />)} */}
            </div>
          </div>
          <Pagination className="w-100 d-flex justify-content-center">
            {
              this.state.buttons.map(a => {
                return <Pagination.Item onClick={this.paginationButtonHandler.bind(this)} name={a} key={a}>{a}</Pagination.Item>
              })
            }
          </Pagination>
        </div>
      )
    } else {
      return <Loader />
    }
  }
}
export default AnnouncementsField;