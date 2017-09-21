import * as accountUtil from '../util/account_util';
import { fetchTeams } from './navigation_actions';

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

export const leaveTeam = team => dispatch => {
  accountUtil.leaveTeam(team).then(
    (response) => {
      dispatch(fetchTeams());
    }
  );
};
