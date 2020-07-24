import React from 'react'

class PhotoGallery extends React.Component {


    removePhotoHandler = (e) => {
        this.props.onRemovePhoto({
            id: e.target.name,
            token: this.props.token
        })
    }
    render() {
        if (this.props.photo) {
            return (

                <div className="row">
                    {this.props.photo ? this.props.photo.map(a => <span key={a.id} className="col col-lg-3 col-md-4 col-sm-6 d-flex flex-column justify-content-between">
                        <img className="img-fluid img-thumbnail w-auto" src={a.photoLink} />
                        <button name={a.id} onClick={this.removePhotoHandler.bind(this)}>Удалить</button>
                    </span>) : null}
                </div>
            )
        } else {
            return null
        }
    }
}

export default PhotoGallery