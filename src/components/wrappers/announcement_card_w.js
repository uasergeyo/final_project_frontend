import { connect } from 'react-redux';
import AnnouncementCard from '../announcement_card';
import mapStateToProps from '../../store/mapStateToProps';
import mapDispatchToProps from '../../store/mapDispatchToProps';

const ANNOUNCEMENT_CARD_W = connect(mapStateToProps("AnnouncementCard"), mapDispatchToProps("AnnouncementCard"))(AnnouncementCard);

export default ANNOUNCEMENT_CARD_W;
