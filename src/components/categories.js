import React from 'react'
import Loader from "./loader"



class Categories extends React.Component {

    componentDidMount() {
        this.props.onGetFullCategories()
    }

    searchByCategoryHandler(id){
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
            limit:16,
            offset:0,
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
                                    <div key={a.id} className="card border-0 col-lg-2 col-md-3 col-sm-4 cursor-pointer" onClick={()=>this.searchByCategoryHandler(a.id)}>
                                        <span className="d-flex flex-column" >
                                            <span className="mx-auto imgWrapper border border-primary rounded-circle d-flex ">
                                                <img src={a.categoryImage} className="card-img-top img-fluid " alt="..." />
                                            </span>
                                            <h5 className="card-title text-center primary-color-for-text">{a.categoryName}</h5>
                                        </span>
                                    </div>))
                            }










                            {/* <div className="card border-0 col-lg-2 col-md-3 col-sm-4">
                                <a href="/l_w" className="text-decoration-none" >
                                    <span className="mx-auto imgWrapper border border-primary rounded-circle d-flex ">
                                        <img src="./images/categories/category_baby.png" className="card-img-top img-fluid " alt="..." />
                                    </span>
                                    <h5 className="card-title">Детский мир</h5>
                                </a>
                            </div>
                            <div className="card border-0 col-lg-2 col-md-3 col-sm-4">
                                <a href="/l_w" className="text-decoration-none">
                                    <span className="mx-auto imgWrapper border border-primary rounded-circle d-flex " >
                                        <img src="./images/categories/category_real_estate.png" className="card-img-top img-fluid " alt="..." />
                                    </span>
                                    <h5 className="card-title">Недвижимость</h5>
                                </a>
                            </div>
                            <div className="card border-0 col-lg-2 col-md-3 col-sm-4">
                                <a href="/l_w" className="text-decoration-none">
                                    <span className="mx-auto imgWrapper border border-primary rounded-circle d-flex " >
                                        <img src="./images/categories/category_vehicles.png" className="card-img-top img-fluid " alt="..." />
                                    </span>
                                    <h5 className="card-title">Транспорт</h5>
                                </a>
                            </div>

                            <div className="card border-0 col-lg-2 col-md-3 col-sm-4">
                                <a href="/l_w" className="text-decoration-none" >
                                    <span className="mx-auto imgWrapper border border-primary rounded-circle d-flex ">
                                        <img src="./images/categories/category_spare_parts.png" className="card-img-top img-fluid " alt="..." />
                                    </span>
                                    <h5 className="card-title">Запчасти для транспорта</h5>
                                </a>
                            </div>
                            <div className="card border-0 col-lg-2 col-md-3 col-sm-4">
                                <a href="/l_w" className="text-decoration-none">
                                    <span className="mx-auto imgWrapper border border-primary rounded-circle d-flex " >
                                        <img src="./images/categories/category_job.png" className="card-img-top img-fluid " alt="..." />
                                    </span>
                                    <h5 className="card-title">Работа</h5>
                                </a>
                            </div>
                            <div className="card border-0 col-lg-2 col-md-3 col-sm-4">
                                <a href="/l_w" className="text-decoration-none">
                                    <span className="mx-auto imgWrapper border border-primary rounded-circle d-flex " >
                                        <img src="./images/categories/category_animals.png" className="card-img-top img-fluid " alt="..." />
                                    </span>
                                    <h5 className="card-title">Животные</h5>
                                </a>
                            </div>
                            <div className="card border-0 col-lg-2 col-md-3 col-sm-4">
                                <a href="/l_w" className="text-decoration-none">
                                    <span className="mx-auto imgWrapper border border-primary rounded-circle d-flex ">
                                        <img src="./images/categories/category_house_and_garden.png" className="card-img-top img-fluid " alt="..." />
                                    </span>
                                    <h5 className="card-title">Дом и сад</h5>
                                </a>
                            </div>
                            <div className="card border-0 col-lg-2 col-md-3 col-sm-4">
                                <a href="/l_w" className="text-decoration-none">
                                    <span className="mx-auto imgWrapper border border-primary rounded-circle d-flex " >
                                        <img src="./images/categories/category_electronics.png" className="card-img-top img-fluid " alt="..." />
                                    </span>
                                    <h5 className="card-title">Электроника</h5>
                                </a>
                            </div>
                            <div className="card border-0 col-lg-2 col-md-3 col-sm-4">
                                <a href="/l_w" className="text-decoration-none">
                                    <span className="mx-auto imgWrapper border border-primary rounded-circle d-flex " >
                                        <img src="./images/categories/category_business_and_services.png" className="card-img-top img-fluid " alt="..." />
                                    </span>
                                    <h5 className="card-title">Бизнес и услуги</h5>
                                </a>
                            </div>
                            <div className="card border-0 col-lg-2 col-md-3 col-sm-4">
                                <a href="/l_w" className="text-decoration-none" >
                                    <span className="mx-auto imgWrapper border border-primary rounded-circle d-flex ">
                                        <img src="./images/categories/category_fashion_and_style.png" className="card-img-top img-fluid " alt="..." />
                                    </span>
                                    <h5 className="card-title">Мода и стиль</h5>
                                </a>
                            </div>
                            <div className="card border-0 col-lg-2 col-md-3 col-sm-4">
                                <a href="/l_w" className="text-decoration-none">
                                    <span className="mx-auto imgWrapper border border-primary rounded-circle d-flex " >
                                        <img src="./images/categories/category_leisure_relax.png" className="card-img-top img-fluid " alt="..." />
                                    </span>
                                    <h5 className="card-title">Хобби, отдых и спорт</h5>
                                </a>
                            </div>
                            <div className="card border-0 col-lg-2 col-md-3 col-sm-4">
                                <a href="/l_w" className="text-decoration-none">
                                    <span className="mx-auto imgWrapper border border-primary rounded-circle d-flex " >
                                        <img src="./images/categories/category_give_for_free.png" className="card-img-top img-fluid " alt="..." />
                                    </span>
                                    <h5 className="card-title">Отдам даром</h5>
                                </a>
                            </div>
                            <div className="card border-0 col-lg-2 col-md-3 col-sm-4">
                                <a href="/l_w" className="text-decoration-none" >
                                    <span className="mx-auto imgWrapper border border-primary rounded-circle d-flex ">
                                        <img src="./images/categories/category_exchange.png" className="card-img-top img-fluid " alt="..." />
                                    </span>
                                    <h5 className="card-title">Обмен</h5>
                                </a>
                            </div> */}
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