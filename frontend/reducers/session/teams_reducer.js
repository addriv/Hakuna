import { RECEIVE_TEAMS } from '../../actions/navigation_actions';
import { RECEIVE_NEW_TEAM } from '../../actions/account_actions';
import merge from 'lodash/merge';

 export const teamsReducer = (state = null, action) => {
   Object.freeze(state);
   switch(action.type){
     case RECEIVE_TEAMS:
       return action.teams;
     case RECEIVE_NEW_TEAM:
       return merge({}, state, { teams: action.team });
     default:
       return state;
   }
 };
