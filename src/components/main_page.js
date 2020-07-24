import React from 'react';
import SELECT_W from './wrappers/select_w';
import Categories from './categories';
import ANNOUNCEMENTS_FIELD_W from './wrappers/announcements_field_w';


class Main_page extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            areCategoriesViewable: true,
        }
    }

    render() {
        return (
            <div>
                <SELECT_W categoriesDisplayHandler={this.categoriesDisplayHandler} history={this.props.history} />
                {this.props.location.pathname === "/" ? <Categories /> : null}
                <ANNOUNCEMENTS_FIELD_W 
                history={this.props.history}
                // announcements={this.props.announcements}
                // count={this.props.count}  
                />
            </div>
        )
    }
}

export default Main_page;