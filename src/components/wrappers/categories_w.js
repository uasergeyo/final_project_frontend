import { connect } from 'react-redux';
import Categories from '../categories';
import mapStateToProps from '../../store/mapStateToProps';
import mapDispatchToProps from '../../store/mapDispatchToProps';

const CATEGORIES_W = connect(mapStateToProps("Categories"), mapDispatchToProps("Categories"))(Categories);

export default CATEGORIES_W;
