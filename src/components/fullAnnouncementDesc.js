import React from 'react'
import Slider from './slider'
import Loader from './loader'

class FullAnnouncement extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            announcement: '',
            photo: ''
        }
    }

    componentDidMount() {
        this.props.onFindOneAnnouncement({ id: this.props.match.params.id })
        // .then(() => this.setState({
        //     announcement: this.props.announcement,
        //     photo: this.props.announcement.photo.map(a => a.photoLink)
        // }))
        console.log("^^^^^^", this.state.announcement, "///////", this.props)
        // this.props.announcements.map(a=> a.photoLink)
    }

    render() {
        if (this.props.announcement) {
            console.log(this.props)
            return (
                <div className="container">
                    <div className="row">
                        <div className="col col-lg-8">
                            <div className="mb-3 m-auto">
                                {this.props.photo ? <Slider images={this.props.announcement.photo.map(a => a.photoLink)} /> : null}
                            </div>
                            <div className="mb-3">
                                <h2>{this.props.announcement.announcementHeader}</h2>
                                <h4>{this.props.announcement.announcementPrice}  {this.props.announcement.currency.currencySymbol}</h4>
                                <p>{this.props.announcement.announcementText}</p>
                                <h5>{this.props.area} {this.props.city}</h5>
                                <p>{this.props.announcement.hasDelivery ? "Возможность доставки почтой" : null}</p>
                                {/* <h5>{this.props.announcement}{this.props.announcement.currency.currencySymbol}</h5>
                            <p>{this.props.announcement.}</p> */}
                            </div>
                            <div className="mb-3">
                            </div>
                        </div>
                        <div className="col col-lg-4 mt-3">
                            <div className="m-auto">
                        {this.props.avatar[0].photoLink?<img className="w-50 rounded-circle m-auto" src={this.props.avatar[0].photoLink} alt={this.props.avatar[0].photoLink}/>:null}
                        <h3>{this.props.userName}</h3>
                        <h5>Телефоны</h5>
                        {this.props.phones?this.props.phones.map(a=><p key={a.phone}>{a.phone}</p>):null}
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

export default FullAnnouncement