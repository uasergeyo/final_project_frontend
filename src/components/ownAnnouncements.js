import React from 'react';
import Loader from './loader'
import ANNOUNCEMENT_CARD_W from './wrappers/announcement_card_w'

class OwnAnnouncements extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            announcements:'',
            favourite:'',
        }
    }

    componentDidMount() {
            this.props.onSearchLikes({id:this.props.userId,token: this.props.token})
            .then(()=>this.setState({favourite:this.props.favourite.map(a=>a.announcement?a.announcement.id:null)}))
        this.props.onFindOwnAnnouncements({ id: this.props.userId, token: this.props.token })
        .then(()=>this.setState({announcements:this.props.announcements}))

    }

    componentDidUpdate(prevState) {
        if (prevState.responseRemoveAnnouncement !== this.props.responseRemoveAnnouncement) {
            this.props.onFindOwnAnnouncements({ id: this.props.userId, token: this.props.token })
        }
    }



    render() {
        if (this.props.announcements && this.props.favourite) {
            return (
                <>
                    {
                        this.props.announcements ? this.props.announcements.map(a => {
                            // console.log(a)
                            let identifier = a.id;
                            return <ANNOUNCEMENT_CARD_W key={a.id}
                                announcement={a}
                                identifier={identifier}
                                history={this.props.history}
                                userLikes={this.state.favourite}
                            />
                        }) : <h3>Нет объявлений</h3>
                    }
                </>
            )
        } else {
            return <Loader />
        }
    }
}

export default OwnAnnouncements;