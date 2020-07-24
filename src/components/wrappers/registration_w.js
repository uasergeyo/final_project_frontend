import { connect } from 'react-redux';
import Registration from '../registration';
import mapStateToProps from '../../store/mapStateToProps';
import mapDispatchToProps from '../../store/mapDispatchToProps';

const REGISTRATON_W = connect(mapStateToProps("Registration"), mapDispatchToProps("Registration"))(Registration);

export default REGISTRATON_W;