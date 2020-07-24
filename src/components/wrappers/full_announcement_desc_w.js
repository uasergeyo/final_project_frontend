import { connect } from 'react-redux';
import FullAnnouncement from '../fullAnnouncementDesc';
import mapStateToProps from '../../store/mapStateToProps';
import mapDispatchToProps from '../../store/mapDispatchToProps';

const FULL_ANNOUNCEMENT_W = connect(mapStateToProps("FullAnnouncement"), mapDispatchToProps("FullAnnouncement"))(FullAnnouncement);

export default FULL_ANNOUNCEMENT_W;
