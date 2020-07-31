import React from 'react';
import { NavLink } from 'react-router-dom'

class Footer extends React.Component {

    onClickLogoHandler = () => {
        this.props.onSearch({
            limit: 16,
            offset: 0,
            categoryId: '',
            subCategoryId: '',
            priceFrom: 0,
            priceTo: 0,
            currencyId: '',
            sort: '',
            hasDelivery: false,
            hasPhoto: false,
            findEverywhere: false,
            requestText: '',
            areaName: '',
            areaId: '',
            cityId: '',
        })
    }

    render() {
        return (
            <div className="container mb-5">
                <NavLink to="/" onClick={this.onClickLogoHandler} className="mx-auto" style={{ width: "100px", display: "block" }}>
                    <img className="mb-4" src="/images/logo.png" alt="" width="100" />
                </NavLink>
                <div className="row">
                <div className="d-flex flex-column align-items-center col col-lg-6 col-md-6 col-sm-12 col-12">
                        <div className="d-flex flex-column align-items-start">
                            <a href="/most-popular-requests" className="text-decoration-none">Самые популярные запросы</a>
                            <a href="/site-map" className="text-decoration-none">Карта сайта</a>
                            <a href="/ukraine-map" className="text-decoration-none">Карта Украины</a>
                            <a href="/how-to-buy-and-sell" className="text-decoration-none">Как продавать и покупать ?</a>
                            <a href="/help" className="text-decoration-none">Помощь обратная связь</a>
                        </div>
                    </div>
                    <div className="d-flex flex-column align-items-center col col-lg-6 col-md-6 col-sm-12 col-12">
                        <div className="d-flex flex-column align-items-start">
                            <h5 className="primary-color-for-text">Контакты</h5>
                            <a href="mailto:buyAndSale@gmail.com" className="text-decoration-none">buyAndSale@gmail.com</a>
                            <a href="tel:+380991234567" className="text-decoration-none">+380991234567</a>
                            <a href="tel:+380991234567" className="text-decoration-none">+380991234567</a>
                            <a href="tel:+380501234567" className="text-decoration-none">+380501234567</a>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Footer;