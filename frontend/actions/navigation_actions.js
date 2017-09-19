import * as navUtil from '../util/navigation_util';

export const RECEIVE_TEAM = 'RECEIVE_TEAM';

export const receiveTeam = teamData => ({
  type: RECEIVE_TEAM,
  teamData
});

export const fetchTeam = team => dispatch => (
  navUtil.fetchTeam(team).then(
    (response) => dispatch(receiveTeam(response))
  )
);
