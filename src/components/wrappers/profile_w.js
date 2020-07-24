import { connect } from 'react-redux';
import Profile from '../profile';
import mapStateToProps from '../../store/mapStateToProps';
import mapDispatchToProps from '../../store/mapDispatchToProps';

const Profile_W = connect(mapStateToProps("Profile"), mapDispatchToProps("Profile"))(Profile);

export default Profile_W;
