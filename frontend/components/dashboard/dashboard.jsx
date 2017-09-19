import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import SidebarContainer from '../sidebar/sidebar_container';

export default class Dashboard extends React.Component{
  constructor(props){
    super(props);
  }

  componentDidMount(){
    const getFirstTeam = (ajaxResponse) => {
      const teams = ajaxResponse.teams;
      const teamsKeys = Object.keys(teams);
      return teams[teamsKeys[0]];
    };

    this.props.fetchTeams().then(
      (response) => this.props.fetchTeam(getFirstTeam(response))
    );
  }

  render(){
    const entitiesExist = Object.keys(this.props.entities).length > 0;
    let teamDisplay, teams;
    if (entitiesExist){
      teamDisplay = this.props.entities.team.name;
    }

    if (this.props.teams){
      teams = this.props.teams.map((team, i) => {
        return <li key={i}>{team.name}</li>;
      });
    }

    return (
      <div>
        <div className='hakuna-ui'>
          <div className='sidebar'>
            <SidebarContainer />
          </div>

          <nav className='dashboard-nav'>

            <nav className='top-bar'>

              <div className='user-teams'>
                {teams}
              </div>

            </nav>

            <nav className='bottom-bar'>

              <h1>Welcome! This is {teamDisplay} Dashboard</h1>

              <button onClick={this.props.logout}>Log Out</button>

            </nav>

          </nav>

        </div>
      </div>
    );
  }

}




// debugger;
// const entitiesExist = Object.keys(this.props.entities).length > 0;
// const firstTeam = newProps.teams[0];
// debugger;
// if (!entitiesExist || (entitiesExist && firstTeam.id !== this.props.entities.team.id)){
//   this.props.fetchTeam(firstTeam);
// }
