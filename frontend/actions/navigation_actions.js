import * as navUtil from '../util/navigation_util';

export const RECEIVE_TEAM = 'RECEIVE_TEAM';
export const RECEIVE_TEAMS = 'RECEIVE_TEAMS';
export const RECEIVE_USER_DISPLAY = 'RECEIVE_USER_DISPLAY';

export const receiveTeams = teams => ({
  type: RECEIVE_TEAMS,
  teams
});

export const receiveTeam = teamData => ({
  type: RECEIVE_TEAM,
  teamData
});

export const receiveUserDisplay = user => ({
  type: RECEIVE_USER_DISPLAY,
  user
});

export const fetchTeam = team => dispatch => (
  navUtil.fetchTeam(team).then(
    (response) => dispatch(receiveTeam(response))
  )
);

export const fetchTeams = () => dispatch => (
  navUtil.fetchTeams().then(
    (response) => dispatch(receiveTeams(response))
  )
);
