import { connect } from 'react-redux';
import OwnAnnouncements from '../ownAnnouncements';
import mapStateToProps from '../../store/mapStateToProps';
import mapDispatchToProps from '../../store/mapDispatchToProps';

const OWN_ANNOUNCEMENTS_W = connect(mapStateToProps("OwnAnnouncements"), mapDispatchToProps("OwnAnnouncements"))(OwnAnnouncements);

export default OWN_ANNOUNCEMENTS_W;
