import { RECEIVE_TEAMS } from '../../actions/navigation_actions';
import { RECEIVE_NEW_TEAM } from '../../actions/account_actions';
import merge from 'lodash/merge';

 export const teamsReducer = (state = null, action) => {
   Object.freeze(state);
   switch(action.type){
     case RECEIVE_TEAMS:
       return action.teams;
     case RECEIVE_NEW_TEAM:
       const newState = merge({}, state, action.team );
       return newState;
     default:
       return state;
   }
 };
