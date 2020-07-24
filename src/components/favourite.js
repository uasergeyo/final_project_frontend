import React from 'react';
import ANNOUNCEMENT_CARD_W from './wrappers/announcement_card_w'

class Favourite extends React.Component {
  constructor(props){
    super(props);
    this.state={
      announcements:''
    }
  }

  componentDidMount (){
    this.props.onSearchFavourite({id:this.props.userId,token: this.props.token})
    .then(()=>this.setState({announcements:this.props.announcements}))
    
  }

  componentDidUpdate(prevProps){
    if(prevProps.responseCreateLike !== this.props.responseCreateLike){
      this.props.onSearchFavourite({id:this.props.userId,token: this.props.token})
      .then(()=>this.setState({announcements:this.props.announcements}))
    }
  }


    render() {
      console.log("favourite",this.props)
      if(this.state.announcements.length>0){
        return (
            <div className="bg-light mb-5">
                <div className="container mt-5">
                    <h2 className="text-center mb-5">Избранные объявления</h2>
                    <div className="row d-flex ">
                        {
                           this.state.announcements.length>0? this.state.announcements.map(a =>
                             a.announcement?
                            // let identifier = a.announcement.id;
                           (<ANNOUNCEMENT_CARD_W key={a.announcement.id}
                                                        announcement={a.announcement} 
                                                        identifier={a.announcement.id}
                                                        history = {this.props.history}
                                                        />):null
                                                        )
                                                        :<h3>Нет избранных</h3>  
                        }
                    </div>
                </div>
            </div>
        )}else{
          return<div>Пока пусто</div>
        }
    }
}

export default Favourite;