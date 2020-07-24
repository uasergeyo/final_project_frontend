import { connect } from 'react-redux';
import PhotoGallery from '../photoGallery';
import mapStateToProps from '../../store/mapStateToProps';
import mapDispatchToProps from '../../store/mapDispatchToProps';

const PHOTO_GALLERY_W = connect(mapStateToProps("PhotoGallery"), mapDispatchToProps("PhotoGallery"))(PhotoGallery);

export default PHOTO_GALLERY_W;
