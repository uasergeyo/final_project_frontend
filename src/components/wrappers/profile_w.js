import { connect } from 'react-redux';
import Profile from '../profile';
import mapStateToProps from '../../store/mapStateToProps';
import mapDispatchToProps from '../../store/mapDispatchToProps';

const PROFILE_W = connect(mapStateToProps("Profile"), mapDispatchToProps("Profile"))(Profile);

export default PROFILE_W;
