import React from 'react'
import Alert from 'react-bootstrap/Alert'

class AlertMessage extends React.Component {
    render() {
        return (
            <Alert onClick={this.props.click} variant="success">
                {this.props.text}
            </Alert>
        )
    }
}

export default AlertMessage;