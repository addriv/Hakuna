import * as sessionApiUtil from '../util/session_api_util';

export const RECEIVE_CURRENT_USER = 'RECEIEVE_USER';
export const RECEIVE_SESSION_ERRORS = 'RECEIVE_SESSION_ERRORS';

export const receiveCurrentUser = currentUser => ({
  type: RECEIVE_CURRENT_USER,
  currentUser
});

export const receiveSessionErrors = errors => ({
  type: RECEIVE_SESSION_ERRORS,
  errors
});

export const signupUser = (userData) => dispatch => {
  sessionApiUtil.signup(userData)
    .then(
      (response) => dispatch(receiveCurrentUser(response)),
      (response) => dispatch(receiveSessionErrors(response.responseJSON))
    );
};

export const loginUser = (userData) => dispatch => {
  sessionApiUtil.login(userData)
    .then(
      (response) => dispatch(receiveCurrentUser(response)),
      (response) => dispatch(receiveSessionErrors(response.responseJSON))
    );
};

export const logoutUser = () => dispatch => {
  sessionApiUtil.logout()
    .then(
      (response) => dispatch(receiveCurrentUser(null)),
      (response) => dispatch(receiveSessionErrors(response.responseJSON))
    );
};
