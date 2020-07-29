import React from 'react';
import Loader from './loader'
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
            redirect: false,
            //-----------------------validators
            announcementRejectionCause: '',
            headerInfo: '',
            headerWarning: false,
            descriptionInfo: '',
            descriptionWarning: false,
            priceInfo: '',
            priceWarning: false,
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

    componentDidUpdate(prevProps) {
        if (prevProps.report !== this.props.report && this.props.report) {
            this.setState({ redirect: true })
            // this.props.history.push(`/announcement-action-result/${this.props.report}`)
        }
    }

    requestHeaderHandler = (e) => {
        if (e.target.value.length && e.target.value.length <= 100) {
            this.setState({
                header: e.target.value,
                headerInfo: `Длина заголовка-${e.target.value.length} . Oсталось ${100 - e.target.value.length} символов.`,
                headerWarning: false,
            })

        } else if (e.target.value.length > 100) {
            this.setState({
                headerInfo: `Длина заголовка-${e.target.value.length} максимальная длина 100 символов.`,
                headerWarning: true,
                header: '',
            })
        } else {
            this.setState({
                header: "",
                headerInfo: "",
                headerWarning: false,
            })
        }
    }

    inputDescriptionHandler = (e) => {
        if (e.target.value.length && e.target.value.length <= 10000) {
            this.setState({
                description: e.target.value,
                descriptionInfo: `Длина описания-${e.target.value.length} . Oсталось ${10000 - e.target.value.length} символов.`,
                descriptionWarning: false,
            })

        } else if (e.target.value.length > 10000) {
            this.setState({
                descriptionInfo: `Длина заголовка-${e.target.value.length} максимальная длина 100 символов.`,
                descriptionWarning: true,
                description: '',
            })
        } else {
            this.setState({
                description: "",
                descriptionInfo: "",
                descriptionWarning: false,
            })
        }
    }

    requestAreaHandler = (e) => {
        if (e.target.value === "true") {
            this.setState({ areaId: '', cityId: '', cities: [] })
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
            this.setState({ categoryId: '', subCategoryId: '', subCategories: [] })
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
        if (e.target.value < 0) {
            this.setState({
                price: '',
                priceInfo: "Цена не может быть отрицательной.",
                priceWarning: true,
            })
        } else if (e.target.value > 9999999) {
            this.setState({
                price: "",
                priceInfo: "Максимальная цена - 9999999.",
                priceWarning: true,
            })
        } else {
            this.setState({
                price: +e.target.value,
                priceInfo: "",
                priceWarning: false,
            })
        }
    }

    selectCurrencyHandler = (e) => {
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
        let obj = {
            body: {
                announcementHeader: this.state.header,
                announcementText: this.state.description,
                announcementPrice: +this.state.price,
                hasDelivery: this.state.hasDelivery,
                userId: this.props.userId,
                areaId: this.state.areaId,
                cityId: this.state.cityId,
                currencyId: this.state.currencyId ? this.state.currencyId : 1,
                categoryId: this.state.categoryId,
                subCategoryId: this.state.subCategoryId,
                photoLink: this.state.photo
            },
            token: this.props.token
        }

        if (obj.body.announcementHeader &&
            obj.body.announcementText &&
            obj.body.announcementPrice >= 0 &&
            obj.body.areaId &&
            obj.body.cityId &&
            obj.body.categoryId &&
            obj.body.subCategoryId) {
            this.props.onCreateAnnouncement(obj)
                .then(() => this.setState({
                    isVisible: this.props.report,
                    photo: [],
                    announcementRejectionCause: "",
                }, () => this.state.redirect ? this.props.history.push(`/announcement-action-result/${this.props.report}`) : null))
        } else {
            this.setState({ announcementRejectionCause: "Все поля помеченные звездочкой должны быть заполнены." })
        }

    }

    render() {
        if (this.props.data) {
            return (
                <div className="container mb-5 p-5">
                    <div className="row mb-5">
                        <div className="col">
                            <div className="form-group pl-3 pr-3">
                                <label htmlFor="exampleInputEmail1" className="necessaryInput">Заголовок</label>
                                <p className={this.state.headerWarning ? "inputWarning" : "inputSucess "}>{this.state.headerInfo}</p>
                                <input onChange={this.requestHeaderHandler.bind(this)} type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                                {/* <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small> */}
                            </div>
                            <div className="form-group pl-3 pr-3">
                                <label htmlFor="exampleFormControlTextarea1" className="necessaryInput">Подробное описание объявления</label>
                                <p className={this.state.descriptionWarning ? "inputWarning" : "inputSucess "}>{this.state.descriptionInfo}</p>
                                <textarea onChange={this.inputDescriptionHandler.bind(this)} className="form-control" style={{ height: "300px", width: "100%" }} id="exampleFormControlTextarea1" rows="3"></textarea>
                            </div>
                            <div className="d-flex flex-wrap" >
                                <div className="col col-lg-6 col-sm-12 col-12">
                                    <label htmlFor="selectCategory" className="necessaryInput">Категория</label>
                                    <select onChange={this.selectCategoryHandler.bind(this)} className="form-control" id="selectCategory">
                                        <option value>Все</option>
                                        {this.state.categories ? this.state.categories.map(a => <option id={a.id} key={a.id}>{a.categoryName}</option>) : null}

                                    </select>
                                </div>
                                <div className="col col-lg-6 col-sm-12 col-12">
                                    <label htmlFor="selectSubcategory" className="necessaryInput">Подкатегория</label>
                                    <select onChange={this.selectSubCategoryHandler.bind(this)} className="form-control" id="selectSubcategory">
                                        <option value>Все</option>
                                        {this.state.subCategories ? this.state.subCategories.map(a => <option key={a.id}>{a.subCategoryName}</option>) : null}
                                    </select>
                                </div>
                            </div>
                            <div className="d-flex mt-3 flex-wrap">
                                <div className="col col-lg-6 col-sm-12 col-12">
                                    <label htmlFor="inputArea" className="necessaryInput">Выберите область</label>
                                    <select onChange={this.requestAreaHandler.bind(this)} className="form-control " id="inputArea">
                                        <option value>Выберите область</option>
                                        {this.state.areas ? this.state.areas.map(a => <option id={a.id} key={a.id}>{a.areaName}</option>) : null}
                                    </select>
                                </div>
                                <div className="col col-lg-6 col-sm-12 col-12">
                                    <label htmlFor="inputCity" className="necessaryInput">Выберите город</label>
                                    <select onChange={this.requestCityHandler.bind(this)} className="form-control" id="inputCity">
                                        <option value>Выберите город</option>
                                        {this.state.cities ? this.state.cities.map(a => <option key={a.id}>{a.cityName}</option>) : null}
                                    </select>
                                </div>
                            </div>
                            {this.state.photo ? <div className="w-50 m-auto p-3 border-"><Slider images={this.state.photo} /></div> : null}
                            <div className="d-flex mt-3 mb-3 flex-wrap">
                                <div className="col col-lg-3 col-sm-12 col-12">
                                    <label htmlFor="inputSelectCurrency" id="inputMaxPrice">Bалютa</label>
                                    <select className="form-control" onChange={this.selectCurrencyHandler.bind(this)} id="inputSelectCurrency">
                                        {this.state.currencies ? this.state.currencies.map(a => <option key={a.id}>{a.currencySymbol}</option>) : null}
                                    </select>
                                </div>
                                <div className="col col-lg-3 col-sm-12 col-12">
                                    <label htmlFor="price pl-0" className={this.state.priceWarning ? "inputWarning " : "necessaryInput"}>{this.state.priceInfo ? this.state.priceInfo : "Цена"}</label>
                                    <input className="form-control" onChange={this.inputPriceHandler} min="0" max="9999999" type="number" id="inputMinPrice" placeholder="от" />
                                </div>
                                <div className="custom-control custom-checkbox col col-lg-3 col-sm-6 col-12 mt-5">
                                    <input type="checkbox" onChange={this.checkHasDeliveryHandler.bind(this)} className="custom-control-input" id="ck1" />
                                    <label className="custom-control-label" htmlFor="ck1">Доставка почтой</label>
                                </div>
                                <div className="col col-lg-3 col-sm-6 col-12 d-flex flex-column justify-space-between">
                                    <label htmlFor="photoInpCreate">Добавить фото</label>
                                    <input type="file" name="file" id="photoInpCreate" onChange={this.inputPhotoHandler.bind(this)} />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        {
                            this.state.announcementRejectionCause ? <p className="inputWarning">{this.state.announcementRejectionCause}</p> : null
                            //  this.state.isVisible ? <AlertMessage click={this.changeVisibilityHandler} text={"Объявление " + this.props.report + " успешно добавлено"} /> : null
                        }
                    </div>
                    <div className="pl-3 pr-3">
                        <button type="button" onClick={this.sendAnnouncementHandler} className="btn btn-primary btn-lg btn-block">Отправить объявление</button>
                    </div>
                </div>
            )
        } else {
            return <Loader />
        }
    }

}

export default CreateAnnouncement;

