import { connect } from 'react-redux';
import Header from '../Header';
import mapStateToProps from '../../store/mapStateToProps';
import mapDispatchToProps from '../../store/mapDispatchToProps';

const HEADER_W = connect(mapStateToProps("Header"), mapDispatchToProps("Header"))(Header);

export default HEADER_W;