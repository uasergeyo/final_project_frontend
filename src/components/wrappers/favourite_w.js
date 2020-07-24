import { connect } from 'react-redux';
import Favourite from '../favourite';
import mapStateToProps from '../../store/mapStateToProps';
import mapDispatchToProps from '../../store/mapDispatchToProps';

const FAVOURITE_W = connect(mapStateToProps("Favourite"), mapDispatchToProps("Favourite"))(Favourite);

export default FAVOURITE_W;
