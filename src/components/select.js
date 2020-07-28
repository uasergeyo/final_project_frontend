import React from 'react'
import SEARCH_PARAMS_W from './wrappers/searchParams_w'
import { Switch, Route } from 'react-router-dom';
import Loader from './loader'

class Select extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            requestText: '',
            areaName: '',
            areaId: '',
            cityId: '',
            areas: [],
            isLoaded: false,
            error: null,
            cities: [],
            searchDetailsDisplay: false,
            // search request
            categoryId: '',
            subCategoryId: '',
            priceFrom: 0,
            priceTo: 0,
            currencyId: '',
            sort: '',
            hasDelivery: false,
            hasPhoto: false,
            findEverywhere: false,

        }
    }
    componentDidMount() {
        if (this.props.areas) {
            this.setState({
                areas: this.props.areas,
            })
        } else {
            this.props.onAnnouncementParams().then(()=>
            this.setState({
                areas: this.props.areas,
            }))
        }


    }

    requestTextHandler = (e) => {
        this.setState({ requestText: e.target.value })
    }

    requestAreaHandler = (e) => {
        if(e.target.value === "true"){
            this.setState({areaId:'',cities: [],cityId: ''})
        }else{
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
        if(e.target.value === "true"){
            this.setState({cityId:''})
        }else{
            this.searcherIdForOptions(e.target.value, "cityName", "cityId", this.state.cities)
        }
    }

    searcherIdForOptions(value, key, fieldNameInState, valueParentElement) {
        valueParentElement.forEach(i => {
            if (i[key] === value) {
                this.setState({ [fieldNameInState]: i.id })
            }
        })
    }

    searchRequestHandler = () => {
        this.setState({
            searchDetailsDisplay: true,
            areCategoriesViewable: false
        })

        this.props.history.push('/advanced_search')
        this.props.onSearch({
            requestText: this.state.requestText,
            areaId: this.state.areaId,
            cityId: this.state.cityId,
            categoryId: this.state.categoryId,
            subCategoryId: this.state.subCategoryId,
            priceFrom: this.state.priceFrom,
            priceTo: this.state.priceTo,
            currencyId: this.state.currencyId,
            sort: this.state.sort,
            hasDelivery: this.state.hasDelivery,
            hasPhoto: this.state.hasPhoto,
            findEverywhere: this.state.findEverywhere,
            limit:16,
            offset:0,
        })

    }

    // search params

    updateCategory = (v) => {
        this.setState({ categoryId: v, subCategoryId: '' })
    }

    updateSubCategory = (v) => {
        this.setState({ subCategoryId: v })
    }

    updatePriceFrom = (v) => {
        this.setState({ priceFrom: v })
    }

    updatePriceTo = (v) => {
        this.setState({ priceTo: v })
    }

    updateCurrency = (v) => {
        this.setState({ currencyId: v })
    }

    updateSort = (v) => {
        this.setState({ sort: v })
    }

    updateHasDelivery = (v) => {
        this.setState({ hasDelivery: v })
    }

    updateHasPhoto = (v) => {
        this.setState({ hasPhoto: v })
    }

    updateFindEverywhere = (v) => {
        this.setState({ findEverywhere: v })
    }


    render() {
        if(this.props.areas){
        return (
            <div className="jumbotron jumbotron-fluid mb-0">
                <div className="container ">
                    <div className="row">
                        <div className="col">
                            <div className="input-group input-group-lg ">
                                <input type="text" onChange={this.requestTextHandler} className="form-control" placeholder="Введите текст запроса" aria-label="Recipient's username" aria-describedby="button-addon2" />
                                <select onChange={this.requestAreaHandler.bind(this)} className="form-control " id="inputSelectArea">
                                    <option value>Выберите область</option>
                                    {this.props.areas?this.props.areas.map(a => <option id={a.id} key={a.id}>{a.areaName}</option>):null}
                                </select>
                                <select onChange={this.requestCityHandler.bind(this)} className="form-control" id="inputSelectCity">
                                    <option value>Выберите город</option>
                                    {this.state.cities?this.state.cities.map(a => <option key={a.id}>{a.cityName}</option>):null}
                                </select>
                                <div className="input-group-append">
                                    <button onClick={this.searchRequestHandler} className="btn btn-outline-secondary bg-primary" type="button" id="button-addon2">Поиск</button>
                                </div>
                                <Switch>
                                    <Route render={() => <SEARCH_PARAMS_W updateCategory={this.updateCategory}
                                        updateSubCategory={this.updateSubCategory}
                                        updatePriceFrom={this.updatePriceFrom}
                                        updatePriceTo={this.updatePriceTo}
                                        updateCurrency={this.updateCurrency}
                                        updateSort={this.updateSort}
                                        updateHasDelivery={this.updateHasDelivery}
                                        updateHasPhoto={this.updateHasPhoto}
                                        updateFindEverywhere={this.updateFindEverywhere}
                                    />} path='/advanced_search' />
                                </Switch>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }else{
            return <Loader/>
        }
    }
}

export default Select;