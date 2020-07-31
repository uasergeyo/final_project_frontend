import React from 'react';
import Loader from './loader'

class SearchParams extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            categoryId: '',
            subCategoryId: '',
            priceFrom: '',
            priceTo: '',
            currencyId: '',
            sort: '',
            hasDelivery: false,
            hasPhoto: false,
            findEverywhere: false,
            // subcategory: '',
            categories: [],
            subCategories: [],
            currencies: []
        };
    }

    componentDidMount() {
        if (this.props.data) {
            this.setState({
                categories: this.props.categories,
                currencies: this.props.currencies
            })
        } else {
            this.props.onAnnouncementParams()
                .then(() => this.setState({
                    categories: this.props.categories,
                    currencies: this.props.currencies
                }))
        }
    }

    selectCategoryHandler = (e) => {
        if (e.target.value === "true") {
            this.setState({ categoryId: '',subCategories: [], subCategoryId: '' },()=>this.props.updateCategory(this.state.categoryId))
        } else {
            this.setState({ categoryId: e.target.value, subCategoryId: '' },()=>this.props.updateCategory(this.state.categoryId))
        }
        this.state.categories.forEach(i => {
            if (i.id === e.target.value) {
                this.setState({ subCategories: i.subcategories })
            }
        })
    }

    selectSubCategoryHandler = (e) => {
        if (e.target.value === "true") {
            this.setState({ subCategoryId: '' },()=>this.props.updateSubCategory(this.state.subCategoryId))
        } else {
            this.setState({ subCategoryId: e.target.value },()=>this.props.updateSubCategory(this.state.subCategoryId))
        }
    }

    inputPriceMinHandler = (e) => {
        this.setState({ priceFrom: +e.target.value }, () => this.props.updatePriceFrom(this.state.priceFrom))
    }

    inputPriceMaxHandler = (e) => {
        this.setState({ priceTo: +e.target.value }, () => this.props.updatePriceTo(this.state.priceTo))
    }

    selectCurrencyHandler = (e) => {
        if (e.target.value === "true") {
            this.setState({ currencyId: '' },()=>this.props.updateCurrency(this.state.currencyId))
        } else {
            this.setState({ currencyId: e.target.value },()=>this.props.updateCurrency(this.state.currencyId))
        }
    }

    selectSortBy = (e) => {
        this.setState({ sort: e.target.value }, () => this.props.updateSort(this.state.sort))
    }

    checkHasPhotoHandler = (e) => {
        this.setState({ hasPhoto: !this.state.hasPhoto }, () => this.props.updateHasPhoto(this.state.hasPhoto))
    }

    checkHasDeliveryHandler = (e) => {
        this.setState({ hasDelivery: !this.state.hasDelivery }, () => this.props.updateHasDelivery(this.state.hasDelivery))
    }
    checkFindEverywhereHandler = (e) => {
        this.setState({ findEverywhere: !this.state.findEverywhere }, () => this.props.updateFindEverywhere(this.state.findEverywhere))
    }
    render() {
        if (this.props.data) {
            return (
                <div className="input-group input-group-lg mt-3 ">
                    <div className="col pl-0 col-lg-3 col-md-6 col-sm-12 col-12 mb-3 mb-lg-0 mb-md-3 mb-sm-3 pr-lg-3 pr-md-3 pr-sm-0 pr-0">
                        <label htmlFor="inputSelectCategory">Категория</label>
                        <select value={this.state.categoryId} onChange={this.selectCategoryHandler.bind(this)} className="form-control" id="inputSelectCategory">
                            <option >Все</option>
                            {this.state.categories ? this.state.categories.map(a => <option key={a.id} value={a.id}>{a.categoryName}</option>) : null}
                        </select>
                    </div>
                    <div className="col pl-0 col-lg-3 col-md-6 col-sm-12 col-12 mb-3 mb-lg-0 mb-md-3 mb-sm-3 pr-lg-3 pr-md-0 pr-sm-0 pr-0">
                        <label htmlFor="inputSelectSubcategory">Подкатегория</label>
                        <select onChange={this.selectSubCategoryHandler.bind(this)} className="form-control" id="inputSelectSubcategory">
                            <option value>Все</option>
                            {this.state.subCategories ? this.state.subCategories.map(a => <option key={a.id} value={a.id} >{a.subCategoryName}</option>) : null}
                        </select>
                    </div>
                    <div className="col col-lg-2 col-md-6 col-sm-12 col-12 mb-3 mb-lg-0 mb-md-3 mb-sm-3 pr-lg-3 pr-md-3 pr-sm-0 pr-0">
                        <label htmlFor="inputsPrice pl-0">Цена</label>
                        <div className="row" id="inputsPrice">
                            <div className="col pl-0">
                                <input className="form-control" value={this.state.priceFrom} onChange={this.inputPriceMinHandler.bind(this)} type="number" min="0" max="9999999999" id="inputMinPrice" placeholder="от" />
                            </div>
                            <div className="col pl-0 ">
                                <input className="form-control" value={this.state.priceTo} onChange={this.inputPriceMaxHandler.bind(this)} type="number" min="0" max="9999999999" id="inputMaxPrice" placeholder="до" />
                            </div>
                        </div>
                    </div>
                    <div className="col pl-0 col-lg-1 ">
                        <label htmlFor="inputSelectCurrency" id="inputMaxPrice">Bалютa</label>
                        <select className="form-control" onChange={this.selectCurrencyHandler.bind(this)} id="inputSelectCurrency">
                            <option value>Валюта</option>
                            {this.state.currencies ? this.state.currencies.map(a => <option key={a.id} value={a.id}>{a.currencySymbol}</option>) : null}
                        </select>
                    </div>
                    <div className="col pl-0 col-lg-2 pr-0">
                        <label htmlFor="inputSelectSortingType" id="inputMaxPrice">Cортировать по</label>
                        <select className="form-control" onChange={this.selectSortBy.bind(this)} id="inputSelectSortingType">
                            <option value="">Новые</option>
                            <option value="1">Дешевые</option>
                        </select>
                    </div>
                    <div className="input-group input-group-lg mt-3 ">
                        <div className="custom-control custom-checkbox col col-lg-2 col-md-2 col-sm-12 col-12 mb-3 mb-lg-0 mb-md-3 mb-sm-3 pr-lg-3 pr-md-3 pr-sm-0 pr-0">
                            <input type="checkbox" checked={this.state.hasPhoto} onChange={this.checkHasPhotoHandler.bind(this)} className="custom-control-input" id="Ck1" />
                            <label className="custom-control-label" htmlFor="Ck1">С фото</label>
                        </div>
                        <div className="custom-control custom-checkbox col col-lg-2 col-md-3 col-sm-12 col-12 mb-3 mb-lg-0 mb-md-3 mb-sm-3 pr-lg-3 pr-md-3 pr-sm-0 pr-0">
                            <input type="checkbox" checked={this.state.hasDelivery} onChange={this.checkHasDeliveryHandler.bind(this)} className="custom-control-input" id="ck1" />
                            <label className="custom-control-label" htmlFor="ck1">C доставкой</label>
                        </div>
                        <div className="custom-control custom-checkbox col col-lg-4 col-md-5 col-sm-12 col-12 mb-3 mb-lg-0 mb-md-3 mb-sm-3 pr-lg-3 pr-md-3 pr-sm-0 pr-0">
                            <input type="checkbox" checked={this.state.findEverywhere} onChange={this.checkFindEverywhereHandler.bind(this)} className="custom-control-input" id="ctomCheck1" />
                            <label className="custom-control-label" htmlFor="ctomCheck1">Поиск в заголовке и в описании</label>
                        </div>
                    </div>
                </div >
            )
        } else {
            return <Loader />
        }
    }
}

export default SearchParams;