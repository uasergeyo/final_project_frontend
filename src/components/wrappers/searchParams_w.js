import { connect } from 'react-redux';
import SearchParams from '../searchParams';
import mapStateToProps from '../../store/mapStateToProps';
import mapDispatchToProps from '../../store/mapDispatchToProps';

const SearchParams_W = connect(mapStateToProps("SearchParams"), mapDispatchToProps("SearchParams"))(SearchParams);

export default SearchParams_W;
