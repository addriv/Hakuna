import { connect } from 'react-redux';
import SignupForm from './signup_form';
import { signup } from '../actions/session_actions';

const mapStateToProps = state => ({

});

const mapDispatchToProps = dispatch => ({
  signup: userData =>  dispatch(signup(userData))
});

export default connect(mapStateToProps, mapDispatchToProps)(SignupForm);
