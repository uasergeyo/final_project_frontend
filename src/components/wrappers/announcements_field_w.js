import { connect } from 'react-redux';
import AnnouncementsField from '../announcements_field';
import mapStateToProps from '../../store/mapStateToProps';
import mapDispatchToProps from '../../store/mapDispatchToProps';

const ANNOUNCEMENTS_FIELD_W = connect(mapStateToProps("AnnouncementsField"), mapDispatchToProps("AnnouncementsField"))(AnnouncementsField);

export default ANNOUNCEMENTS_FIELD_W;
