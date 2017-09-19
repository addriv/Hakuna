import { connect } from 'react-redux';
import Sidebar from './sidebar';

const mapStateToProps = state => ({
  entities: state.entities
});

const mapDispatchToProps = dispatch => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);
