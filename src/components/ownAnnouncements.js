import React from 'react';
import Loader from './loader'
import ANNOUNCEMENT_CARD_W from './wrappers/announcement_card_w'

class OwnAnnouncements extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    componentDidMount(){
        this.props.onFindOwnAnnouncements({id:this.props.userId,token: this.props.token})
    }

    componentDidUpdate(prevState){
        if(prevState.responseRemoveAnnouncement !== this.props.responseRemoveAnnouncement){
            this.props.onFindOwnAnnouncements({id:this.props.userId,token: this.props.token})
        }
    }



    render() {
        if(this.props.announcements){
        return (
            <>
                            {
                                    this.props.announcements? this.props.announcements.map(a =>{
                                        // console.log(a)
                                     let identifier = a.id;
                                    return <ANNOUNCEMENT_CARD_W key={a.id}
                                                                 announcement={a} 
                                                                 identifier={identifier}
                                                                 history = {this.props.history}
                                                                 />
                                                                }):<h3>Нет объявлений</h3>     
                            }
                </>
        )
    }else{
            return <Loader/>
        }
    }
}

export default OwnAnnouncements;