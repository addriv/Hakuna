import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import SidebarContainer from '../sidebar/sidebar_container';

export default class Dashboard extends React.Component{
  constructor(props){
    super(props);
    this.handleTeam = this.handleTeam.bind(this);
  }

  componentDidMount(){
    const getFirstTeam = (ajaxResponse) => {
      const teams = ajaxResponse.teams;
      const teamsKeys = Object.keys(teams);
      return teams[teamsKeys[0]].id;
    };

    this.props.fetchTeams().then(
      (response) => this.props.fetchTeam(getFirstTeam(response))
    );
  }

  handleTeam(event){
    event.preventDefault();
    const teamId = parseInt(event.target.id);
    this.props.fetchTeam(teamId);
  }

  render(){
    const entitiesExist = Object.keys(this.props.entities).length > 0;
    const teams = this.props.teams;
    const tasks = this.props.tasks;

    //Declare variables to be rendered
    let teamDisplay, teamsList, teamsUl;
    let tasksList, tasksUl;

    //Grab team being displayed
    if (entitiesExist){
      teamDisplay = this.props.entities.team.name;
    }

    //Grab teams if they exist
    if (teams){
      teamsList = teams.map((team, i) => {
        return <button
          onClick={this.handleTeam}
          id={team.id}
          key={i}>{team.name}</button>;
      });

      teamsUl = <ul>{ teamsList }</ul>;
    }

    //Grab tasks if they exist
    if (tasks && this.props.projectDisplay === 0){
      tasksList = tasks.map((task, i) => {
        return (
          <li
            id={ task.id }
            key={i}>{ task.title }</li>
        );
      });

      tasksUl = <ul>{ tasksList }</ul>;
    }
    else if (this.props.projectDisplay !== 0){
      const projectTasks = [];
      this.props.tasks.forEach(task => {
        if (task.project_id === this.props.projectDisplay) {
          projectTasks.push(task);
        }
      });

      tasksList = projectTasks.map((task, i) => {
        return (
          <li
            id={ task.id }
            key={i}>{ task.title }</li>
        );
      });

      tasksUl = <ul>{ tasksList }</ul>;
    }

    return (
      <div>
        <div className='hakuna-ui'>
          <div className='sidebar'>
            <SidebarContainer />
          </div>

          <div className='dashboard-ui'>
            <nav className='dashboard-nav'>

              <nav className='top-bar'>

                <div className='user-teams'>
                  { teamsUl }
                </div>

              </nav>

              <nav className='bottom-bar'>
                <div>
                  <h1>Welcome! This is {teamDisplay} Dashboard</h1>

                  <button onClick={this.props.logout}>Log Out</button>
                </div>
              </nav>
            </nav>

            <div className='tasks-ui'>

              <div className='tasks-list'>
                { tasksUl }
              </div>

            </div>

          </div>

        </div>
      </div>
    );
  }

}
