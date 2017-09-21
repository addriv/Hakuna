import * as accountUtil from '../util/account_util';

export const RECEIVE_NEW_TEAM = 'RECEIVE_NEW_TEAM';

const receiveNewTeam = team => ({
    type: RECEIVE_NEW_TEAM,
    team
  }
);

export const createTeam = team => dispatch => {
  const ajax = accountUtil.createTeam(team);

  ajax
    .then(
      (response) => {
        dispatch(receiveNewTeam(response));
      }
    );
  return ajax;
};

export const removeTeam = team => dispatch => {
};
