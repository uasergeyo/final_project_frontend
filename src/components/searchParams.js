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

    searcherIdForOption(value, key, fieldNameInState, valueParentElement, callback) {
        valueParentElement.forEach(i => {
            if (i[key] === value) {
                this.setState({ [fieldNameInState]: i.id }, () => callback(this.state[fieldNameInState]))

            }
        })
    }

    selectCategoryHandler = (e) => {
        if (e.target.value === "true") {
            this.setState({ categoryId: '' })
        } else {
            this.searcherIdForOption(e.target.value, "categoryName", "categoryId", this.state.categories, this.props.updateCategory);
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
            this.searcherIdForOption(e.target.value, "subCategoryName", "subCategoryId", this.state.subCategories, this.props.updateSubCategory);
        }
    }

    inputPriceMinHandler = (e) => {
        this.setState({ priceFrom: e.target.value }, () => this.props.updatePriceFrom(this.state.priceFrom))
    }

    inputPriceMaxHandler = (e) => {
        this.setState({ priceTo: e.target.value }, () => this.props.updatePriceTo(this.state.priceTo))
    }

    selectCurrencyHandler = (e) => {
        if (e.target.value === "true") {
            this.setState({ currencyId: '' })
        } else {
            this.searcherIdForOption(e.target.value, "currencySymbol", "currencyId", this.state.currencies, this.props.updateCurrency);
        }
    }

    selectSortBy = (e) => {
        console.log("======>>>>>>", e.target.value)
        this.setState({ sort: e.target.value }, () => this.props.updateSort(this.state.sort))
    }

    checkHasPhotoHandler = (e) => {
        this.setState({ hasPhoto: e.target.checked }, () => this.props.updateHasPhoto(this.state.hasPhoto))
    }

    checkHasDeliveryHandler = (e) => {
        this.setState({ hasDelivery: e.target.checked }, () => this.props.updateHasDelivery(this.state.hasDelivery))
    }
    checkFindEverywhereHandler = (e) => {
        this.setState({ findEverywhere: e.target.checked }, () => this.props.updateFindEverywhere(this.state.findEverywhere))
    }
    render() {
        if (this.props.data) {
            return (
                <div className="input-group input-group-lg mt-3 ">
                    <div className="col pl-0 col-lg-3">
                        <label htmlFor="inputSelectCategory">Категория</label>
                        <select onChange={this.selectCategoryHandler.bind(this)} className="form-control" id="inputSelectCategory">
                            <option value>Все</option>
                            {this.state.categories ? this.state.categories.map(a => <option key={a.id}>{a.categoryName}</option>) : null}
                        </select>
                    </div>
                    <div className="col pl-0 col-lg-3">
                        <label htmlFor="inputSelectSubcategory">Подкатегория</label>
                        <select onChange={this.selectSubCategoryHandler.bind(this)} className="form-control" id="inputSelectSubcategory">
                            <option value>Все</option>
                            {this.state.subCategories ? this.state.subCategories.map(a => <option key={a.id}>{a.subCategoryName}</option>) : null}
                        </select>
                    </div>
                    <div className="col pl-0 col-lg-2 ml-3">
                        <label htmlFor="inputsPrice pl-0">Цена</label>
                        <div className="row" id="inputsPrice">
                            <div className="col pl-0">
                                <input className="form-control" onChange={this.inputPriceMinHandler.bind(this)} type="number" min="0" max="9999999999" id="inputMinPrice" placeholder="от" />
                            </div>
                            <div className="col pl-0 ">
                                {/* <label for="inputMaxPrice" ></label> */}
                                <input className="form-control" onChange={this.inputPriceMaxHandler.bind(this)} type="number" min="0" max="9999999999" id="inputMaxPrice" placeholder="до" />
                            </div>
                        </div>
                    </div>
                    <div className="col pl-0 col-lg-1">
                        <label htmlFor="inputSelectCurrency" id="inputMaxPrice">Bалютa</label>
                        <select className="form-control" onChange={this.selectCurrencyHandler.bind(this)} id="inputSelectCurrency">
                            <option value>Валюта</option>
                            {this.state.currencies ? this.state.currencies.map(a => <option key={a.id}>{a.currencySymbol}</option>) : null}
                        </select>
                    </div>
                    <div className="col pl-0 col-lg-2">
                        <label htmlFor="inputSelectSortingType" id="inputMaxPrice">Cортировать по</label>
                        <select className="form-control" onChange={this.selectSortBy.bind(this)} id="inputSelectSortingType">
                            <option value="">Новые</option>
                            <option value="1">Дешевые</option>
                        </select>
                    </div>
                    <div className="input-group input-group-lg mt-3">
                        <div className="custom-control custom-checkbox mr-3">
                            <input type="checkbox" onChange={this.checkHasPhotoHandler.bind(this)} className="custom-control-input" id="Ck1" />
                            <label className="custom-control-label" htmlFor="Ck1">С фото</label>
                        </div>
                        <div className="custom-control custom-checkbox mr-3">
                            <input type="checkbox" onChange={this.checkHasDeliveryHandler.bind(this)} className="custom-control-input" id="ck1" />
                            <label className="custom-control-label" htmlFor="ck1">C доставкой</label>
                        </div>
                        <div className="custom-control custom-checkbox mr-3">
                            <input type="checkbox" onChange={this.checkFindEverywhereHandler.bind(this)} className="custom-control-input" id="ctomCheck1" />
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