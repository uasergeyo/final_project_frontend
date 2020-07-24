import { connect } from 'react-redux';
import LogIn from '../logIn';
import mapStateToProps from '../../store/mapStateToProps';
import mapDispatchToProps from '../../store/mapDispatchToProps';

const LogIn_W = connect(mapStateToProps("LogIn"), mapDispatchToProps("LogIn"))(LogIn);

export default LogIn_W;
