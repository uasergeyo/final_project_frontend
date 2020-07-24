import { connect } from 'react-redux';
import Main_page from '../main_page';
import mapStateToProps from '../../store/mapStateToProps';
import mapDispatchToProps from '../../store/mapDispatchToProps';

const MAIN_PAGE_W = connect(mapStateToProps("Main_page"), mapDispatchToProps("Main_page"))(Main_page);

export default MAIN_PAGE_W;
