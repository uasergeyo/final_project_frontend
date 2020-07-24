import React from 'react';
import HEADER_W from './wrappers/header_w';
import MAIN_W from './wrappers/main_w';
import Footer from './Footer';




class Body extends React.Component {
    render() {
        
        return (
            <div >
                <HEADER_W history={this.props.history} />
                <MAIN_W />
                <Footer />
            </div>

        )
    }
}
export default Body;