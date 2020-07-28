import React from 'react';
import { NavLink } from 'react-router-dom'

class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    linkAdressHandler = async (e) => {
        await this.props.onRedirect(e.target.href.slice(21));
    }

    newAnnouncementHandler = () => {
        this.props.history.push('/create_announcement')
        this.props.onRedirect('/create_announcement');
    }

    render() {
        return (
            <header className="bg-primary">
                <div className="container">
                    <div className="row">
                        <div className="col">
                            <nav className="navbar navbar-expand-lg navbar-light bg-primary pl-0 pr-0">
                                <NavLink to="/" className="mx-auto" style={{ width: "60px", display: "block" }}>
                                    <img src="/images/logo.png" alt="logo" width="100" />
                                </NavLink>
                                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
                                    <span className="navbar-toggler-icon"></span>
                                </button>
                                <div className="collapse navbar-collapse " id="navbarTogglerDemo01">
                                    <ul className="navbar-nav ml-auto mt-2 mt-lg-0">
                                        <li className="nav-item">
                                            <NavLink to="/favourite" key="favourite" onClick={this.linkAdressHandler.bind(this)} className="nav-link text-danger" id="favourite" >Избранное<span className="sr-only">(current)</span></NavLink>
                                        </li>
                                        <li className="nav-item">
                                            <NavLink to="/profile/own_announcements" key="myProfile" onClick={this.linkAdressHandler.bind(this)} className="nav-link text-light" id="myProfile" >Мой профиль<span className="sr-only">(current)</span></NavLink>
                                        </li>
                                        <li className="nav-item d-flex justify-content-center">
                                            <button onClick={this.newAnnouncementHandler} className="btn btn-primary btn-outline-warning my-2 my-sm-0">Подать объявление</button>
                                        </li>
                                    </ul>
                                </div>
                            </nav>
                        </div>
                    </div>
                </div>
            </header>
        )

    }

}

export default Header;