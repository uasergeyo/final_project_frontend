import { connect } from 'react-redux';
import Select from '../select';
import mapStateToProps from '../../store/mapStateToProps';
import mapDispatchToProps from '../../store/mapDispatchToProps';

const SELECT_W = connect(mapStateToProps("Select"), mapDispatchToProps("Select"))(Select);

export default SELECT_W;