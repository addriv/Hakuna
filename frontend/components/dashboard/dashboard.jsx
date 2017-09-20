import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import SidebarContainer from '../sidebar/sidebar_container';

export default class Dashboard extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      teamMenuToggled: false,
      teamModalIsOpen: false
     };

    this.handleTeam = this.handleTeam.bind(this);
    this.handleTeamMenuToggle = this.handleTeamMenuToggle.bind(this);
    this.handleTeamModalToggle = this.handleTeamModalToggle.bind(this);
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


  handleTeamMenuToggle(event){
    event.preventDefault();
    this.setState({ teamToggled: !this.state.teamToggled });
  }

  handleTeamModalToggle(event){
    event.preventDefault();
    const teamModal = document.getElementById('team-modal');
    if (teamModal.style.display === 'none'){
      teamModal.style.display = 'block';
    }
    else {
     teamModal.style.display = 'none';
    }
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
        if (team.name !== teamDisplay){
          return <button
            onClick={this.handleTeam}
            id={team.id}
            key={i}>{team.name}</button>;
        }
      });

      if (this.state.teamToggled){
        teamsUl = <ul>{ teamsList }</ul>;
      }
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
                <button
                  className='view-user-tasks'
                  >My Tasks</button>

                <div className='user-teams'>
                  <button
                    className='settings-menu'
                    onClick={this.handleTeamMenuToggle}>

                    <div className='current-team'>{teamDisplay}</div>

                    <div className='current-user'>
                      <div>{this.props.userInitials}</div>
                    </div>
                  </button>

                  { teamsUl }

                </div>

              </nav>

              <nav className='bottom-bar'>
                <div>
                  <h1>Welcome! This is {teamDisplay} Dashboard</h1>


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
