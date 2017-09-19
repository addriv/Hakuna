import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import SidebarContainer from '../sidebar/sidebar_container';

export default class Dashboard extends React.Component{
  constructor(props){
    super(props);
  }

  componentWillReceiveProps(newProps){
    const firstTeamId = parseInt(Object.keys(newProps.teams)[0]);
    const firstTeam = newProps.teams[firstTeamId];
    this.props.fetchTeam(firstTeam);
  }

  render(){

    return (
      <div>
        <div className='hakuna-ui'>
          <div className='sidebar'>
            <SidebarContainer />
          </div>

          <nav className='dashboard-nav'>
            <h1>Welcome! This is the Dashboard</h1>
            <button onClick={this.props.logout}>Log Out</button>
          </nav>
        </div>
      </div>
    );
  }

}
