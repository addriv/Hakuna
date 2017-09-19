import { connect } from 'react-redux';
import SignupForm from './signup_form';
import { signupUser } from '../../actions/session_actions';
import { clearSessionErrors } from '../../actions/errors_actions';

const mapStateToProps = state => ({
  errors: state.errors
});

const mapDispatchToProps = dispatch => ({
  signup: userData =>  dispatch(signupUser(userData)),
  clearSessionErrors: () => dispatch(clearSessionErrors())
});

export default connect(mapStateToProps, mapDispatchToProps)(SignupForm);
