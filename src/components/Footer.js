import React from 'react';
import {NavLink } from 'react-router-dom'

class Footer extends React.Component {
    render() {
        return (
            <div className="container mb-5">  
                <NavLink to="/" className="mx-auto" style={{ width: "100px", display: "block" }}>
                    <img className="mb-4" src="/images/logo.png" alt="" width="100" />
                </NavLink>
                <div className="row">
                    <div className="d-flex flex-column align-items-center col col-lg-6 col-md-6 col-sm-12">
                        <div className="d-flex flex-column align-items-start">
                            <a href="/l_w" className="text-decoration-none">Самые поплярные запросы</a>
                            <a href="/l_w" className="text-decoration-none">Карта сайта</a>
                            <a href="/l_w" className="text-decoration-none">Карта Украины</a>
                            <a href="/l_w" className="text-decoration-none">Как продавать и покупать ?</a>
                            <a href="/l_w" className="text-decoration-none">Помощь обратная связь</a>
                        </div>
                    </div>
                    <div className="d-flex flex-column align-items-center col col-lg-6 col-md-6 col-sm-12">
                        <div className="d-flex flex-column align-items-start">
                            <a href="/l_w" className="text-decoration-none">buyAndSale@gmail.com</a>
                            <a href="/l_w" className="text-decoration-none">+380991234567</a>
                            <a href="/l_w" className="text-decoration-none">+380981234567</a>
                            <a href="/l_w" className="text-decoration-none">+380501234567</a>
                            <a href="/l_w" className="text-decoration-none">Контакты</a>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Footer;