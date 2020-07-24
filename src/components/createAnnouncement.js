import React from 'react';
import Loader from './loader'
import AlertMessage from './alert_message'
import Slider from './slider'
class CreateAnnouncement extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            areas: [],
            cities: [],
            currencies: [],
            categories: [],
            subCategories: [],
            // -------------------------------
            header: '',
            description: '',
            ireaId: '',
            cityId: '',
            categoryId: '',
            subCategoryId: '',
            price: '',
            currencyId: '',
            hasDelivery: false,
            photo: [],
            isVisible: false,
        }
    }

    componentDidMount() {
        if (this.props.data) {
            this.setState({
                areas: this.props.areas,
                categories: this.props.categories,
                currencies: this.props.currencies,
            })
        } else {
            this.props.onAnnouncementParams().then(() =>
                this.setState({
                    areas: this.props.areas,
                    categories: this.props.categories,
                    currencies: this.props.currencies,
                })
            )
        }
    }

    requestHeaderHandler = (e) => {
        this.setState({ header: e.target.value })
    }

    inputDescriptionHandler = (e) => {
        this.setState({ description: e.target.value })
    }

    requestAreaHandler = (e) => {
        if (e.target.value === "true") {
            this.setState({ areaId: '' })
        } else {
            this.searcherIdForOptions(e.target.value, "areaName", "areaId", this.state.areas)
            this.setState({ cityId: '' })
        }
        this.state.areas.forEach(element => {
            if (element.areaName === e.target.value) {
                this.setState({
                    cities: element.cities
                })
            }
        });
    }

    requestCityHandler = (e) => {
        if (e.target.value === "true") {
            this.setState({ cityId: '' })
        } else {
            this.searcherIdForOptions(e.target.value, "cityName", "cityId", this.state.cities)
        }
    }

    selectCategoryHandler = (e) => {
        if (e.target.value === "true") {
            this.setState({ categoryId: '' })
        } else {
            this.searcherIdForOptions(e.target.value, "categoryName", "categoryId", this.state.categories);
            this.setState({ subCategoryId: '' })
        }
        this.state.categories.forEach(i => {
            if (i.categoryName === e.target.value) {
                this.setState({ subCategories: i.subcategories })
            }
        })
    }

    selectSubCategoryHandler = (e) => {
        if (e.target.value === "true") {
            this.setState({ subCategoryId: '' })
        } else {
            this.searcherIdForOptions(e.target.value, "subCategoryName", "subCategoryId", this.state.subCategories);
        }
    }

    inputPriceHandler = (e) => {
        this.setState({ price: +e.target.value })
    }

    selectCurrencyHandler = (e) => {console.log("currency",e.target.value)
            this.searcherIdForOptions(e.target.value, "currencySymbol", "currencyId", this.state.currencies);
    }

    inputPhotoHandler = async (e) => {
        let photoName = "/" + await (await fetch('http://localhost:4000/upload/announcements', {
            method: "POST",
            body: e.target.files[0]
        })).text()
        let arr = this.state.photo
        arr.push("http://localhost:4000/announcements" + photoName)
        this.setState({ photo: arr })
    }

    checkHasDeliveryHandler = (e) => {
        this.setState({ hasDelivery: e.target.checked })
    }


    searcherIdForOptions(value, key, fieldNameInState, valueParentElement) {
        valueParentElement.forEach(i => {
            if (i[key] === value) {
                this.setState({ [fieldNameInState]: i.id })
            }
        })
    }

    sendAnnouncementHandler = () => {
        let obj ={
            body: {
                announcementHeader: this.state.header,
                announcementText: this.state.description,
                announcementPrice: this.state.price,
                hasDelivery: this.state.hasDelivery,
                userId: this.props.userId,
                areaId: this.state.areaId,
                cityId: this.state.cityId,
                currencyId: this.state.currencyId,
                categoryId: this.state.categoryId,
                subCategoryId: this.state.subCategoryId,
                photoLink: this.state.photo
            },
            token: this.props.token
        }
        

        if(!obj.body.currencyId){
            obj.body.currencyId = 1
        }
        this.props.onCreateAnnouncement(obj)
        .then(res => this.setState({ isVisible: this.props.report,
                                       photo:[]
                                     }))


    }

    changeVisibilityHandler = () => {
        this.setState({ isVisible: false })
    }

    render() {
        if (this.props.data) {
            return (
                <div className="container mb-5">
                    <div className="row">
                        <div className="col">
                            <div className="form-group">
                                <label htmlFor="exampleInputEmail1">Заголовок</label>
                                <input onChange={this.requestHeaderHandler.bind(this)} type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                                {/* <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small> */}
                            </div>
                            <div className="form-group">
                                <label htmlFor="exampleFormControlTextarea1">Подробное описание объявления</label>
                                <textarea onChange={this.inputDescriptionHandler.bind(this)} className="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
                            </div>
                            <div className="d-flex " >
                                <div className="col pl-0 col-lg-6">
                                    <label htmlFor="selectCategory">Категория</label>
                                    <select onChange={this.selectCategoryHandler.bind(this)} className="form-control" id="selectCategory">
                                        <option value>Все</option>
                                        {this.state.categories ? this.state.categories.map(a => <option id={a.id} key={a.id}>{a.categoryName}</option>) : null}

                                    </select>
                                </div>
                                <div className="col pr-0 col-lg-6">
                                    <label htmlFor="selectSubcategory">Подкатегория</label>
                                    <select onChange={this.selectSubCategoryHandler.bind(this)} className="form-control" id="selectSubcategory">
                                        <option value>Все</option>
                                        {this.state.subCategories ? this.state.subCategories.map(a => <option key={a.id}>{a.subCategoryName}</option>) : null}

                                    </select>
                                </div>
                            </div>
                            <div className="d-flex ">
                                <div className="col pr-0 col-lg-6 pl-0 pr-3">
                                    <label htmlFor="inputArea">Выберите область</label>
                                    <select onChange={this.requestAreaHandler.bind(this)} className="form-control " id="inputArea">
                                        <option value>Выберите область</option>
                                        {this.state.areas ? this.state.areas.map(a => <option id={a.id} key={a.id}>{a.areaName}</option>) : null}
                                    </select>
                                </div>
                                <div className="col pr-0 col-lg-6">
                                    <label htmlFor="inputCity">Выберите город</label>
                                    <select onChange={this.requestCityHandler.bind(this)} className="form-control" id="inputCity">
                                        <option value>Выберите город</option>
                                        {this.state.cities ? this.state.cities.map(a => <option key={a.id}>{a.cityName}</option>) : null}
                                    </select>
                                </div>
                            </div>
                            {this.state.photo?<div className="w-50 m-auto p-3 border-"><Slider images={this.state.photo}/></div>:null}
                            <div className="d-flex mt-3 mb-3">
                                <div className="col pl-0 col-lg-3">
                                    <label htmlFor="inputSelectCurrency" id="inputMaxPrice">Bалютa</label>
                                    <select className="form-control" onChange={this.selectCurrencyHandler.bind(this)} id="inputSelectCurrency">
                                        {this.state.currencies ? this.state.currencies.map(a => <option key={a.id}>{a.currencySymbol}</option>) : null}
                                    </select>
                                </div>
                                <div className="col pl-0 col-lg-3 ml-3">
                                    <label htmlFor="price pl-0">Цена</label>
                                    <input className="form-control" onChange={this.inputPriceHandler} min="0" max="9999999999" type="number" id="inputMinPrice" placeholder="от" />
                                </div>
                                <div className="custom-control custom-checkbox mr-3 col col-lg-3 mt-5">
                                    <input type="checkbox" onChange={this.checkHasDeliveryHandler.bind(this)} className="custom-control-input" id="ck1" />
                                    <label className="custom-control-label" htmlFor="ck1">Доставка почтой</label>
                                </div>
                                <div className="mt-5">
                                    <input type="file" name="file" onChange={this.inputPhotoHandler.bind(this)} />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        {
                            this.state.isVisible ? <AlertMessage click={this.changeVisibilityHandler} text={"Объявление " + this.props.report+" успешно добавлено"} /> : null
                        }
                    </div>
                    <button type="button" onClick={this.sendAnnouncementHandler} className="btn btn-primary btn-lg btn-block">Отправить объявление</button>
                </div>
            )
        } else {
            return <Loader />
        }
    }

}

export default CreateAnnouncement;
