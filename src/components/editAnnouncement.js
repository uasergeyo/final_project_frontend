import React from 'react';
import Loader from './loader'
// import AlertMessage from './alert_message'
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
            // isVisible: false,
            categoryName: '',
            subCategoryName: '',
            // isOk:false,
            // responseOnEdit:false,
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

    componentDidUpdate(prevProps){
        if(prevProps.isChangeInPhoto !== this.props.isChangeInPhoto){
            this.props.onFindAnnouncementPhotos({ id: this.props.announcement.id })
            .then(()=>this.setState({ photo:this.props.updatedPhoto}))
        }else if(prevProps.newPhoto !== this.props.newPhoto){          
            this.props.onFindAnnouncementPhotos({ id: this.props.announcement.id })
            .then(()=>this.setState({ photo:this.props.updatedPhoto}))
        }else if(prevProps.setMainPhoto !== this.props.setMainPhoto && this.props.setMainPhoto){console.log("prevProps.setMainPhoto !== this.props.setMainPhoto",prevProps.setMainPhoto,this.props.setMainPhoto)
        this.setState({photo:this.props.setMainPhoto})
    }else if(prevProps.responseOnEdit !== this.props.responseOnEdit && this.props.responseOnEdit ){
        this.props.history.push(`/announcement-action-result/${this.props.responseOnEdit}`)
    }
        
    }

    requestHeaderHandler = (e) => {
        this.setState({ announcementHeader: e.target.value })
    }

    inputDescriptionHandler = (e) => {
        this.setState({ announcementText: e.target.value })
    }

    selectCategoryHandler = (e) => {
        // if (e.target.value === "true") {
        //     this.setState({ categoryId: '' })
        // } else {
        this.searcherIdForOptions(e.target.value, "categoryName", "categoryId", this.state.categories);
        this.setState({ subCategoryId: '', subCategoryName: '' })
        // }
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
        this.setState({ announcementPrice: +e.target.value })
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
            token:this.props.token,
            announcementId: this.props.announcement.id,
            photoLink:`http://localhost:4000/announcements${photoName}`
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
                announcementPrice: this.state.announcementPrice,
                hasDelivery: this.state.hasDelivery,
                userId: this.props.userId,
                currencyId: this.state.currencyId,
                categoryId: this.state.categoryId,
                subCategoryId: this.state.subCategoryId
            },
            token: this.props.token
        }

        this.props.onEditAnnouncement(obj)
    //     .then(()=>{ this.setState({
    //         isOk: this.props.report,
    //         photo: []
    //     });
    //     // this.state.isOk?this.props.history.push(`/announcement-action-result/${123}`):null
    //     console.log(this.props.report)
        
    // })

    }

    changeVisibilityHandler = () => {
        this.setState({ isVisible: false })
    }

    // removePhotoHandler = (e) =>{
    //     this.props.onRemovePhoto({
    //       id:e.target.name,
    //       token:this.props.token  
    //     })
    // }
    render() {
        if (this.props.announcement && this.props.categories) {
            return (
                <div className="container mb-5">
                    <div className="row">
                        <div className="col">
                            <div className="form-group">
                                <label htmlFor="exampleInputEmail1">Заголовок</label>
                                <input onChange={this.requestHeaderHandler.bind(this)} value={this.state.announcementHeader} type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                                {/* <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small> */}
                            </div>
                            <div className="form-group">
                                <label htmlFor="exampleFormControlTextarea1">Подробное описание объявления</label>
                                <textarea onChange={this.inputDescriptionHandler.bind(this)} value={this.state.announcementText} className="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
                            </div>
                            <div className="d-flex " >
                                <div className="col pl-0 col-lg-6">
                                    <label htmlFor="selectCategory">Категория</label>
                                    <select onChange={this.selectCategoryHandler.bind(this)} className="form-control" id="selectCategory">
                                        <option value>{this.state.categoryName}</option>
                                        {this.state.categories ? this.state.categories.map(a => a.categoryName !== this.state.categoryName ? <option id={a.id} key={a.id}>{a.categoryName}</option> : null) : null}

                                    </select>
                                </div>
                                <div className="col pr-0 col-lg-6">
                                    <label htmlFor="selectSubcategory">Подкатегория</label>
                                    <select onChange={this.selectSubCategoryHandler.bind(this)} className="form-control" id="selectSubcategory">
                                        <option value>{this.state.subCategoryName}</option>
                                        {this.state.subCategories ? this.state.subCategories.map(a => a.subCategoryName !== this.state.subCategoryName ? <option key={a.id}>{a.subCategoryName}</option> : null) : null}

                                    </select>
                                </div>
                            </div>
                            {this.state.photo?<PHOTO_GALLERY_W photo={this.state.photo} token={this.props.token}/> :null}
                            {/* <div className="row">
                            {this.state.photo ? this.state.photo.map(a =><span key={a.id} className="col col-lg-3 col-md-4 col-sm-6 d-flex flex-column justify-content-between">
                                <img className="img-fluid img-thumbnail w-auto" src={a.photoLink}/>
                                <button name={a.id} onClick = {this.removePhotoHandler.bind(this)}>Удалить</button>
                            </span>) : null}
                            </div> */}
                            <div className="d-flex mt-3 mb-3">
                                <div className="col pl-0 col-lg-3">
                                    <label htmlFor="inputSelectCurrency" id="inputMaxPrice">Bалютa</label>
                                    <select className="form-control" onChange={this.selectCurrencyHandler.bind(this)} id="inputSelectCurrency">
                                        <option key={this.state.currencyId} value>{this.state.currencySymbol}</option>
                                        {this.state.currencies ? this.state.currencies.map(a => a.currencySymbol !== this.state.currencySymbol ? <option key={a.id}>{a.currencySymbol}</option> : null) : null}
                                    </select>
                                </div>
                                <div className="col pl-0 col-lg-3 ml-3">
                                    <label htmlFor="price pl-0">Цена</label>
                                    <input className="form-control" value={+this.state.announcementPrice} onChange={this.inputPriceHandler} min="0" max="9999999999" type="number" id="inputMinPrice" placeholder="от" />
                                </div>
                                <div className="custom-control custom-checkbox mr-3 col col-lg-3 mt-5">
                                    <input type="checkbox" checked={this.state.hasDelivery} onChange={this.checkHasDeliveryHandler.bind(this)} className="custom-control-input" id="ck1" />
                                    <label className="custom-control-label" htmlFor="ck1">Доставка почтой</label>
                                </div>
                                <div className="mt-5">
                                    <input type="file" name="file" onChange={this.inputPhotoHandler.bind(this)} />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        {/* {
                            this.props.responseOnEdit ? <AlertMessage click={this.changeVisibilityHandler} text={"Объявление " + this.props.responseOnEdit + " успешно изменено"} /> : null
                        } */}
                    </div>
                    <button type="button" onClick={this.sendAnnouncementHandler} className="btn btn-primary btn-lg btn-block">Отправить объявление</button>
                </div>
            )
        } else {
            return <Loader />
        }
    }

}

export default EditAnnouncement;
