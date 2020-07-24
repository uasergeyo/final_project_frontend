import { connect } from 'react-redux';
import EditAnnouncement from '../editAnnouncement';
import mapStateToProps from '../../store/mapStateToProps';
import mapDispatchToProps from '../../store/mapDispatchToProps';

const EDIT_ANNOUNCEMENT_W = connect(mapStateToProps("EditAnnouncement"), mapDispatchToProps("EditAnnouncement"))(EditAnnouncement);

export default EDIT_ANNOUNCEMENT_W;