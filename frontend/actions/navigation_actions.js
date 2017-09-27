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

export const receiveUserDisplay = userId => ({
  type: RECEIVE_USER_DISPLAY,
  userId
});

export const fetchTeam = teamId => dispatch => (
  navUtil.fetchTeam(teamId).then(
    (response) => dispatch(receiveTeam(response))
  )
);

export const fetchTeams = () => dispatch => (
  navUtil.fetchTeams().then(
    (response) => dispatch(receiveTeams(response))
  )
);

export const updateTeam = team => dispatch => (
  navUtil.updateTeam(team).then(
    (response) => dispatch(receiveTeam(response))
  )
);
