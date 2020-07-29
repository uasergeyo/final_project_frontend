import React from 'react';
import Carousel from 'react-bootstrap/Carousel'

class Slider extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            images:[]
        }
    }

    componentDidMount(){
        this.setState({images:this.props.images})
    }

    render() {
        if(this.state.images.length>0 ){
        return (
            <Carousel className="mt-3 mb-3 border border-primary mw-100" style={{maxWidth:"520px"}}>
                {
                this.state.images.map((a,index) => {
                        return (
                            <Carousel.Item key={index+1}>
                                <img 
                                    className="d-block d-flex flex-grow-0 flex-shrink-0" 
                                    // style={{width:"320px",height:"320px", objectFit:"cover"}}
                                    src={a}
                                    alt={a}
                                />
                            </Carousel.Item>
                        )
                    })
                }
            </Carousel>
        )}else{
            return null
        }
    }
}

export default Slider;