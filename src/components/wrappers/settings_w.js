import { connect } from 'react-redux';
import Settings from '../settings';
import mapStateToProps from '../../store/mapStateToProps';
import mapDispatchToProps from '../../store/mapDispatchToProps';

const SETTINGS_W = connect(mapStateToProps("Settings"), mapDispatchToProps("Settings"))(Settings);

export default SETTINGS_W;