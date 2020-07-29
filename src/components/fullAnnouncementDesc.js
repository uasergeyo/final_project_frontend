import React from 'react'
import Slider from './slider'
import Loader from './loader'

class FullAnnouncement extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            announcement: '',
            avatar: ''
        }
    }

    componentDidMount() {
        this.props.onFindOneAnnouncement({ id: this.props.match.params.id })
            .then(() =>  this.props.avatar.map(a => a.isMain ? this.setState({ avatar: a.photoLink }) : null))
    }

    render() {
        if (this.props.announcement) {
            return (
                <div className="container p-5">
                    <div className="row">
                        <div className="col col-lg-8">
                            <div className="card p-5">
                                <div className="mb-3 m-auto">
                                    {this.props.photo.length ? <Slider images={this.props.announcement.photo.map(a => a.photoLink)} /> :
                                                 <img className="img-fluid" src="http://localhost:4000/content/info/photo-default-slider.png" alt="..." />}
                                </div>
                                <div className="card-body">
                                    <h2>{this.props.announcement.announcementHeader}</h2>
                                    <h4>{this.props.announcement.announcementPrice ? this.props.announcement.announcementPrice : "Договорная"}
                                        {this.props.announcement.announcementPrice ? this.props.announcement.currency.currencySymbol : ''}</h4>
                                    <p className="text-break">{this.props.announcement.announcementText}</p>
                                    <span className="d-flex justify-content-between">
                                        <h5>{this.props.area} {this.props.city}</h5>
                                        <p className="bg-warning pl-2 pr-2 rounded">{this.props.announcement.hasDelivery ? "Возможна доставка почтой" : "Без доставки почтой"}</p>
                                    </span>
                                </div>
                                <div className="mb-3">
                                </div>
                            </div>
                        </div>
                        <div className="col col-lg-4">
                            <div className="card pt-5">
                                <img className="w-50 rounded-circle m-auto" src={this.state.avatar ?
                                                this.state.avatar : "http://localhost:4000/content/info/without-photo.png"} alt={this.state.avatar ?
                                                this.state.avatar : "http://localhost:4000/content/info/without-photo.png"} />
                                <div className="card-body">
                                    <div className="card-header">
                                        <h3>{this.props.userName}</h3>
                                    </div>
                                    <ul className="list-group list-group-flush">
                                        <li className="list-group-item">Email</li>
                                        <li className="list-group-item"><a href={`mailto:${this.props.email}`}>{this.props.email}</a></li>
                                        {this.props.phones.length ?<li className="list-group-item">Teлефоны</li>:null}
                                        {this.props.phones ? this.props.phones.map(a => <li className="list-group-item" key={a.phone}>
                                            <a href={`tel:${a.phone}`}>{a.phone}</a>
                                        </li>) : null}
                                        {this.props.uArea?<li className="list-group-item">{this.props.uArea} {this.props.uCity}</li>:null}
                                    </ul>
                                </div>
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