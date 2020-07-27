import React from 'react';
import {NavLink} from 'react-router-dom'

class NotFound extends React.Component {
    render() {console.log(this.props)
        return (
            <div className="bg-light p-5 mb-5 min-vw-100 min-vh-100">
                <div className="container mt-5 d-flex flex-column justify-content-center">
                        <h2 className="text-center mb-5">Страница не найдена</h2>
                        <span className="w-100 d-flex justify-content-center">
                        <NavLink to="/" className="btn btn-outline-primary w-25">На главную</NavLink>
                        </span>
                </div>
            </div>
        )
    }
}

export default NotFound;