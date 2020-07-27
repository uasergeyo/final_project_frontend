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
            .then(() => { this.props.avatar.map(a => a.isMain ? this.setState({ avatar: a.photoLink }) : null); console.log("dsdssdsdsd", this.props.avatar) })
    }

    render() {
        if (this.props.announcement) {
            return (
                <div className="container p-5">
                    <div className="row">
                        <div className="col col-lg-8">
                            <div className="card p-5">
                                <div className="mb-3 m-auto">
                                    {this.props.photo.length ? <Slider images={this.props.announcement.photo.map(a => a.photoLink)} /> : <img className="img-fluid" src="http://localhost:4000/content/info/photo-default-slider.png" alt="..." />}
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
                                    {/* <h5>{this.props.announcement}{this.props.announcement.currency.currencySymbol}</h5>
                            <p>{this.props.announcement.}</p> */}
                                </div>
                                <div className="mb-3">
                                </div>
                            </div>
                        </div>
                        <div className="col col-lg-4">
                            <div className="card pt-5">
                                <img className="w-50 rounded-circle m-auto" src={this.state.avatar ? this.state.avatar : "http://localhost:4000/content/info/without-photo.png"} alt={this.state.avatar ? this.state.avatar : "http://localhost:4000/content/info/without-photo.png"} />
                                <div className="card-body">
                                    <div class="card-header">
                                        <h3>{this.props.userName}</h3>
                                    </div>
                                    <ul class="list-group list-group-flush">
                                        <li class="list-group-item">Email</li>
                                        <li class="list-group-item"><a href={`mailto:${this.props.email}`}>{this.props.email}</a></li>
                                        <li class="list-group-item">Teлефоны</li>
                                        {this.props.phones ? this.props.phones.map(a => <li class="list-group-item" key={a.phone}>
                                            <a href={`tel:${a.phone}`}>{a.phone}</a>
                                        </li>) : null}
                                    </ul>
                                    {/* <h3>{this.props.userName}</h3>
                                    <h5>Телефоны</h5>
                                    {this.props.phones ? this.props.phones.map(a => <p key={a.phone}>{a.phone}</p>) : null} */}
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