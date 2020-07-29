import React from 'react';
import Loader from './loader'
import PHOTO_GALLERY_W from './wrappers/photo_gallery_w'

class EditAnnouncement extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currencies: [],
            categories: [],
            subCategories: [],
            // -------------------------------
            announcementHeader: '',
            announcementPrice: '',
            announcementText: '',
            currencySymbol: "",
            categoryId: '',
            subCategoryId: '',
            currencyId: '',
            hasDelivery: false,
            photo: '',
            categoryName: '',
            subCategoryName: '',
            // -----------validators---
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
        this.props.onAnnouncementForEdit({ id: this.props.match.params.id, token: this.props.token })
            .then(() => this.setState({
                announcementHeader: this.props.announcement.announcementHeader,
                announcementPrice: this.props.announcement.announcementPrice,
                announcementText: this.props.announcement.announcementText,
                currencyId: this.props.announcement.currency.id,
                currencySymbol: this.props.announcement.currency.currencySymbol,
                photo: this.props.announcement.photo,
                hasDelivery: this.props.announcement.hasDelivery,
                categories: this.props.categories,
                currencies: this.props.currencies,
                categoryName: this.props.announcement.category.categoryName,
                subCategoryName: this.props.announcement.subcategory.subCategoryName,
                categoryId: this.props.announcement.category.id,
                subCategoryId: this.props.announcement.subcategory.id,
            }))
    }

    componentDidUpdate(prevProps) {
        if (prevProps.isChangeInPhoto !== this.props.isChangeInPhoto) {
            this.props.onFindAnnouncementPhotos({ id: this.props.announcement.id })
                .then(() => this.setState({ photo: this.props.updatedPhoto }))
        } else if (prevProps.newPhoto !== this.props.newPhoto) {
            this.props.onFindAnnouncementPhotos({ id: this.props.announcement.id })
                .then(() => this.setState({ photo: this.props.updatedPhoto }))
        } else if (prevProps.setMainPhoto !== this.props.setMainPhoto && this.props.setMainPhoto) {
            console.log("prevProps.setMainPhoto !== this.props.setMainPhoto", prevProps.setMainPhoto, this.props.setMainPhoto)
            this.setState({ photo: this.props.setMainPhoto })
        } else if (prevProps.responseOnEdit !== this.props.responseOnEdit && this.props.responseOnEdit) {
            this.props.history.push(`/announcement-action-result/${this.props.responseOnEdit}`)
        }

    }

    requestHeaderHandler = (e) => {
        if (e.target.value.length && e.target.value.length <= 100) {
            this.setState({
                announcementHeader: e.target.value,
                headerInfo: `Длина заголовка-${e.target.value.length} . Oсталось ${100 - e.target.value.length} символов.`,
                headerWarning: false,
            })

        } else if (e.target.value.length > 100) {
            this.setState({
                headerInfo: `Длина заголовка-${e.target.value.length} максимальная длина 100 символов.`,
                headerWarning: true,
                announcementHeader: '',
            })
        } else {
            this.setState({
                announcementHeader: "",
                headerInfo: "",
                headerWarning: false,
            })
        }
    }

    inputDescriptionHandler = (e) => {
        if (e.target.value.length && e.target.value.length <= 10000) {
            this.setState({
                announcementText: e.target.value,
                descriptionInfo: `Длина описания-${e.target.value.length} . Oсталось ${10000 - e.target.value.length} символов.`,
                descriptionWarning: false,
            })

        } else if (e.target.value.length > 10000) {
            this.setState({
                descriptionInfo: `Длина заголовка-${e.target.value.length} максимальная длина 100 символов.`,
                descriptionWarning: true,
                announcementText: '',
            })
        } else {
            this.setState({
                announcementText: "",
                descriptionInfo: "",
                descriptionWarning: false,
            })
        }
    }

    selectCategoryHandler = (e) => {
        this.searcherIdForOptions(e.target.value, "categoryName", "categoryId", this.state.categories);
        this.setState({ subCategoryId: '', subCategoryName: 'Выберите подкатегорию' })
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
                announcementPrice: '',
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
                announcementPrice: +e.target.value,
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
        this.props.onAddPhoto({
            token: this.props.token,
            announcementId: this.props.announcement.id,
            photoLink: `http://localhost:4000/announcements${photoName}`
        })
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
                id: this.props.announcement.id,
                announcementHeader: this.state.announcementHeader,
                announcementText: this.state.announcementText,
                announcementPrice: +this.state.announcementPrice,
                hasDelivery: this.state.hasDelivery,
                userId: this.props.userId,
                currencyId: this.state.currencyId,
                categoryId: this.state.categoryId,
                subCategoryId: this.state.subCategoryId
            },
            token: this.props.token
        }
        if (obj.body.announcementHeader &&
            obj.body.announcementText &&
            obj.body.announcementPrice >= 0 &&
            obj.body.categoryId &&
            obj.body.subCategoryId) {
            this.props.onEditAnnouncement(obj)
        } else {
            this.setState({ announcementRejectionCause: "Все поля со звездочкой должны быть заполнены." })
        }

    }

    changeVisibilityHandler = () => {
        this.setState({ isVisible: false })
    }

    render() {
        if (this.props.announcement && this.props.categories) {
            return (
                <div className="container mb-5 p-5 ">
                    <div className="row mt-5">
                        <div className="col">
                            <div className="form-group pl-3 pr-3">
                                <label htmlFor="exampleInputEmail1" className="necessaryInput">Заголовок</label>
                                <p className={this.state.headerWarning ? "inputWarning" : "inputSucess "}>{this.state.headerInfo}</p>
                                <input onChange={this.requestHeaderHandler.bind(this)} value={this.state.announcementHeader} type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                                {/* <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small> */}
                            </div>
                            <div className="form-group pl-3 pr-3">
                                <label htmlFor="exampleFormControlTextarea1" className="necessaryInput">Подробное описание объявления</label>
                                <p className={this.state.descriptionWarning ? "inputWarning" : "inputSucess "}>{this.state.descriptionInfo}</p>
                                <textarea onChange={this.inputDescriptionHandler.bind(this)} style={{ height: "300px", width: "100%" }} value={this.state.announcementText} className="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
                            </div>
                            <div className="d-flex flex-wrap" >
                                <div className="col col-lg-6 col-sm-12 col-12">
                                    <label htmlFor="selectCategory" className="necessaryInput">Категория</label>
                                    <select onChange={this.selectCategoryHandler.bind(this)} className="form-control" id="selectCategory">
                                        <option value>{this.state.categoryName}</option>
                                        {this.state.categories ? this.state.categories.map(a => a.categoryName !== this.state.categoryName ? <option id={a.id} key={a.id}>{a.categoryName}</option> : null) : null}

                                    </select>
                                </div>
                                <div className="col col-lg-6 col-sm-12 col-12">
                                    <label htmlFor="selectSubcategory" className="necessaryInput">Подкатегория</label>
                                    <select onChange={this.selectSubCategoryHandler.bind(this)} className="form-control" id="selectSubcategory">
                                        <option value>{this.state.subCategoryName}</option>
                                        {this.state.subCategories ? this.state.subCategories.map(a => a.subCategoryName !== this.state.subCategoryName ? <option key={a.id}>{a.subCategoryName}</option> : null) : null}

                                    </select>
                                </div>
                            </div>
                            {this.state.photo ? <PHOTO_GALLERY_W photo={this.state.photo} token={this.props.token} /> : null}
                            <div className="d-flex mt-3 mb-3 flex-wrap">
                                <div className="col col-lg-3 col-sm-12 col-12">
                                    <label htmlFor="inputSelectCurrency" id="inputMaxPrice">Bалютa</label>
                                    <select className="form-control" onChange={this.selectCurrencyHandler.bind(this)} id="inputSelectCurrency">
                                        <option key={this.state.currencyId} value>{this.state.currencySymbol}</option>
                                        {this.state.currencies ? this.state.currencies.map(a => a.currencySymbol !== this.state.currencySymbol ? <option key={a.id}>{a.currencySymbol}</option> : null) : null}
                                    </select>
                                </div>
                                <div className="col col-lg-3 col-sm-12 col-12">
                                    <label htmlFor="price " className={this.state.priceWarning ? "inputWarning " : "necessaryInput"}>{this.state.priceInfo ? this.state.priceInfo : "Цена"}</label>
                                    <input className="form-control" value={+this.state.announcementPrice} onChange={this.inputPriceHandler} min="0" max="9999999999" type="number" id="inputMinPrice" placeholder="от" />
                                </div>
                                <div className="custom-control custom-checkbox col col-lg-3 col-sm-6 col-12 mt-5">
                                    <input type="checkbox" checked={this.state.hasDelivery} onChange={this.checkHasDeliveryHandler.bind(this)} className="custom-control-input" id="ck1" />
                                    <label className="custom-control-label" htmlFor="ck1">Доставка почтой</label>
                                </div>
                                <div className="col col-lg-3 col-sm-6 col-12 d-flex flex-column justify-space-between">
                                    <label htmlFor="photoInpEdit">Добавить фото</label>
                                    <input type="file" name="file" id="photoInpEdit" onChange={this.inputPhotoHandler.bind(this)} />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        {
                            this.state.announcementRejectionCause ? <p className="inputWarning">{this.state.announcementRejectionCause}</p> : null
                        }
                    </div>
                    <div className="pl-3 pr-3">
                        <button type="button" onClick={this.sendAnnouncementHandler} className="btn btn-primary btn-lg btn-block">Сохранить объявление</button>
                    </div>
                </div>
            )
        } else {
            return <Loader />
        }
    }

}

export default EditAnnouncement;
