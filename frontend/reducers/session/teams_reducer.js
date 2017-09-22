import { RECEIVE_TEAMS, RECEIVE_TEAM } from '../../actions/navigation_actions';
import { RECEIVE_NEW_TEAM } from '../../actions/account_actions';
import merge from 'lodash/merge';

 export const teamsReducer = (state = null, action) => {
   Object.freeze(state);
   switch(action.type){
    case RECEIVE_TEAMS:
      return action.teams;
    case RECEIVE_TEAM:
      const team = action.teamData.team;
      const data = { [team.id]: team };
      return merge({}, state, data);
    case RECEIVE_NEW_TEAM:
      const newState = merge({}, state, action.team );
      return newState;
    default:
     return state;
   }
 };
