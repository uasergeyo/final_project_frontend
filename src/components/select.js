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

    componentDidUpdate(prevProps){
        if(prevProps.requestData !== this.props.requestData){console.log(this.props.history.location.pathname ==="/")
            this.setState({...this.props.requestData})
            
        }
    }

    requestTextHandler = (e) => {
        this.setState({ requestText: e.target.value })
    }

    requestAreaHandler = (e) => {
        this.setState({ areaId: e.target.value, cityId: '',cities:[]},()=>this.state.areas.forEach(element => {
            if (element.id === this.state.areaId) {
                this.setState({
                    cities: element.cities,
                })
            }
        }))
    }

    requestCityHandler = (e) => {
            this.setState({ cityId: e.target.value  })
    }

    roundToTwo(num) {    
        return +(Math.floor(num + "e+2")  + "e-2");
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
            priceFrom:this.roundToTwo(+this.state.priceFrom),
            priceTo: this.roundToTwo(+this.state.priceTo),
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
                                <div className="input-group input-group-lg col mb-lg-0 col-lg-5 mb-md-3 col-md-12 mb-sm-3 col-sm-12 mb-3 col-12 m-0 p-0">
                                <input type="text" value={this.state.requestText} onChange={this.requestTextHandler} className="form-control rounded-0" placeholder="Введите текст запроса" aria-label="Recipient's username" aria-describedby="button-addon2" />
                                </div>
                                <div className="input-group input-group-lg col mb-lg-0 col-lg-3 mb-md-3 col-md-5 mb-sm-3 col-sm-12 mb-3 col-12 m-0 p-0">
                                <select value={this.state.areaId} onChange={this.requestAreaHandler.bind(this)} className="form-control rounded-0" id="inputSelectArea">
                                <option value="">Выберите область</option>
                                    {this.props.areas?this.props.areas.map(a =><option key={a.id} value={a.id}>{a.areaName}</option>):null}
                                </select>
                                </div>
                                <div className="input-group input-group-lg col mb-lg-0 col-lg-3 mb-md-3 col-md-5 mb-sm-3 col-sm-12 mb-3 col-12 m-0 p-0">
                                <select value={this.state.cityId} onChange={this.requestCityHandler.bind(this)} className="form-control rounded-0" id="inputSelectCity">
                                <option value="">Выберите город</option>
                                    {this.state.cities?this.state.cities.map(a => <option key={a.id} value={a.id}>{a.cityName}</option>):null}
                                </select>
                                </div>
                                <div className="input-group-append col mb-lg-0 col-lg-1 mb-md-3 col-md-2 mb-sm-3 col-sm-12 mb-3 col-12 m-0 p-0">
                                    <button onClick={this.searchRequestHandler} className="w-100 btn btn-outline-secondary bg-primary rounded-0" type="button" id="button-addon2">Поиск</button>
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