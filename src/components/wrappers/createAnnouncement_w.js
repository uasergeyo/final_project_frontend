import { connect } from 'react-redux';
import CreateAnnouncement from '../createAnnouncement';
import mapStateToProps from '../../store/mapStateToProps';
import mapDispatchToProps from '../../store/mapDispatchToProps';

const CREATE_ANNOUNCEMENT_W = connect(mapStateToProps("CreateAnnouncement"), mapDispatchToProps("CreateAnnouncement"))(CreateAnnouncement);

export default CREATE_ANNOUNCEMENT_W;
