import React from 'react'

class PhotoGallery extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userId: '',
            announcementId: ''
        }
    }

    componentDidMount() {
        if (this.props.photo && this.props.photo.length > 0) {
            if (this.props.photo[0].userId) {
                this.setState({
                    userId: this.props.photo[0].userId,
                })
                console.log("this.props.photo[0].userId", this.props.photo[0].userId)
            } else if (this.props.photo[0].announcementId) {
                this.setState({
                    announcementId: this.props.photo[0].announcementId
                })
            }

        }
    }

    componentDidUpdate(prevProps) {
        if (prevProps.photo !== this.props.photo && this.props.photo.length > 0) {
            if (this.props.photo[0].userId) {
                this.setState({
                    userId: this.props.photo[0].userId,
                })
            } else if (this.props.photo[0].announcementId) {
                this.setState({
                    announcementId: this.props.photo[0].announcementId
                })
            }
        }
    }

    removePhotoHandler = (id) => {
        this.props.onRemovePhoto({
            id,
            token: this.props.token
        })
    }

    setUpMainPhoto = (id) => {
        this.props.onSetMainPhoto({
            token: this.props.token,
            id,
            userId: this.state.userId,
            announcementId: this.state.announcementId
        })
    }

    render() {
        if (this.props.photo) {
            return (
                <div className="row m-3">
                    {this.props.photo ? this.props.photo.map(a => <span key={a.id} className="col col-lg-3 col-md-4 col-sm-6 d-flex flex-column justify-content-between">
                        <img className={a.isMain ? "border border-primary img-fluid img-thumbnail w-100 cardImg" : "img-fluid img-thumbnail w-100 cardImg"} src={a.photoLink} alt="..." />
                        <span className="d-flex justify-content-between">
                            <p className="cityAndDate cursor-pointer primary-color-for-text" onClick={() => this.removePhotoHandler(a.id)}>Удалить</p>
                            {a.isMain ? <p className="cityAndDate cursor-pointer primary-color-for-text" ></p> :
                                <p className="cityAndDate cursor-pointer primary-color-for-text" onClick={() => this.setUpMainPhoto(a.id)}>Сделать главным</p>}
                        </span>
                    </span>)
                        : null}
                </div>
            )
        } else {
            return null
        }
    }
}

export default PhotoGallery