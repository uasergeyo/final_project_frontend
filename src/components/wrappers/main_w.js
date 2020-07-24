import { connect } from 'react-redux';
import Main from '../Main';
import mapStateToProps from '../../store/mapStateToProps';
import mapDispatchToProps from '../../store/mapDispatchToProps';

const MAIN_W = connect(mapStateToProps("Main"), mapDispatchToProps("Main"))(Main);

export default MAIN_W;
