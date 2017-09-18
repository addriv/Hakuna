import { connect } from 'react-redux';
import SignupForm from './signup_form';
import { signupUser } from '../../actions/session_actions';

const mapStateToProps = state => ({

});

const mapDispatchToProps = dispatch => ({
  signup: userData =>  dispatch(signupUser(userData))
});

export default connect(null, mapDispatchToProps)(SignupForm);
