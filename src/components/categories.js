import React from 'react'
import Loader from "./loader"



class Categories extends React.Component {

    componentDidMount() {
        this.props.onGetFullCategories()
    }

    searchByCategoryHandler(id) {
        this.props.onSearch({
            requestText: "",
            areaId: "",
            cityId: "",
            categoryId: id,
            subCategoryId: "",
            priceFrom: 0,
            priceTo: 0,
            currencyId: "",
            sort: "",
            hasDelivery: false,
            hasPhoto: false,
            findEverywhere: false,
            limit: 16,
            offset: 0,

        })

    }

    render() {
        if (this.props.fullCategories) {
            return (
                <div className="bg-white p-4">
                    <div className="container mb-5 mx-auto">
                        <h2 className="text-center mb-5">Главные рубрики</h2>
                        <div className="row d-flex flex-wrap align-self-stretch justify-content-center">
                            {
                                this.props.fullCategories.map(a => (
                                    <div key={a.id} className="card border-0 col-lg-2 col-md-3 col-sm-4 cursor-pointer" onClick={() => this.searchByCategoryHandler(a.id)}>
                                        <span className="d-flex flex-column" >
                                            <span className="mx-auto imgWrapper border border-primary rounded-circle d-flex ">
                                                <img src={a.categoryImage} className="card-img-top img-fluid " alt="..." />
                                            </span>
                                            <h5 className="card-title text-center primary-color-for-text">{a.categoryName}</h5>
                                        </span>
                                    </div>))
                            }
                        </div>
                    </div>
                </div>
            )
        } else {
            return <Loader />
        }
    }
}

export default Categories;