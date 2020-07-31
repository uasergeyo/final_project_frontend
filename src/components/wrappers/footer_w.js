import { connect } from 'react-redux';
import Footer from '../Footer';
import mapStateToProps from '../../store/mapStateToProps';
import mapDispatchToProps from '../../store/mapDispatchToProps';

const FOOTER_W = connect(mapStateToProps("Footer"), mapDispatchToProps("Footer"))(Footer);

export default FOOTER_W;
