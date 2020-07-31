import React from 'react';
import HEADER_W from './wrappers/header_w';
import MAIN_W from './wrappers/main_w';
import FOOTER_W from './wrappers/footer_w';




class Body extends React.Component {
    render() {
        
        return (
            <div>
                <HEADER_W history={this.props.history} />
                <MAIN_W />
                <FOOTER_W history={this.props.history} />
            </div>

        )
    }
}
export default Body;