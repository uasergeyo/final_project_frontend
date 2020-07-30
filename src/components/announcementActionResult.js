import React from 'react'
import { NavLink } from 'react-router-dom'

class AnnouncementActionResult extends React.Component {

    render() {
        return (
            <div className="d-flex bg-white flex-column pt-5 min-vw-100 min-vh-100">
                <div className="d-flex bg-white flex-column mx-auto justify-content-around" style={{ width: "300px", height: "320px" }}>
                    <img src="/content/info/ok1.jpg" alt="..." className="mx-auto cardImg img-fluid" />
                    <NavLink to="/" className="btn btn-outline-primary w-75 mb-3 mx-auto">Перейти на главную</NavLink>
                    <NavLink to="/create_announcement" className="btn btn-outline-warning w-75 mb-3 mx-auto">Подать объявление</NavLink>
                    <NavLink to={`/full-announcement-description/${this.props.match.params.id}`} className="text-decoration-none" >Просмотреть объявление</NavLink>
                </div>
            </div>
        )
    }
}

export default AnnouncementActionResult;