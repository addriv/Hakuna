import * as sessionApiUtil from '../util/session_api_util';
import { receiveSessionErrors } from './errors_actions';
import { receiveTeams } from './navigation_actions';

export const RECEIVE_CURRENT_USER = 'RECEIVE_USER';

export const receiveCurrentUser = currentUser => ({
  type: RECEIVE_CURRENT_USER,
  currentUser
});

export const signupUser = (userData) => dispatch => {
  sessionApiUtil.signup(userData)
    .then(
      (response) => dispatch(receiveCurrentUser(response)),
      (response) => dispatch(receiveSessionErrors(response.responseJSON))
    );
};

export const loginUser = (userData) => dispatch => {
  const ajax = sessionApiUtil.login(userData);
  let responseObj;
    ajax.then(
      (response) => {
        responseObj = response;
       return dispatch(receiveCurrentUser(response.user));
     },
      (response) => dispatch(receiveSessionErrors(response.responseJSON))
    );
  return ajax;
};

export const logoutUser = () => dispatch => {
  sessionApiUtil.logout()
    .then(
      (response) => dispatch(receiveCurrentUser(null)),
      (response) => dispatch(receiveSessionErrors(response.responseJSON))
    );
};
