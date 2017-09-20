import { connect } from 'react-redux';
import Sidebar from './sidebar';
import { teamMembersSelector } from '../../reducers/selectors';

const mapStateToProps = state => ({
  entities: state.entities,
  teamMembers: teamMembersSelector(state),
  team
});

const mapDispatchToProps = dispatch => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);
