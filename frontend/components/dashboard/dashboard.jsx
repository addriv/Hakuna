import React from 'react';
import Modal from 'react-modal';
import { Route, Redirect } from 'react-router-dom';
import SidebarContainer from '../sidebar/sidebar_container';
import SettingsMenuContainer from './settings_menu_container';

export default class Dashboard extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      settingsMenuIsOpen: false,
     };

    this.toggleSettingsMenu = this.toggleSettingsMenu.bind(this);
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

  toggleSettingsMenu(event){
    event.preventDefault();
    this.setState({ settingsMenuIsOpen: !this.state.settingsMenuIsOpen });
  }

  render(){
    const entitiesExist = Object.keys(this.props.entities).length > 0;
    const teams = this.props.teams;
    const tasks = this.props.tasks;

    //Declare variables to be rendered
    let teamDisplay, teamsList, teamsUl, tasksList, tasksUl, settingsMenu;

    //Grab team being displayed
    if (entitiesExist){
      teamDisplay = this.props.entities.team.name;
    }

    //Grab teams if they exist
    if (teams){
      teamsList = teams.map((team, i) => {
        if (team.name !== teamDisplay){
          return <button
            onClick={this.handleTeamSelect}
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

    //
    if (this.state.settingsMenuIsOpen){
      settingsMenu = <SettingsMenuContainer />;
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

                <div className='settings-menu'>

                  <button
                    className='settings-menu-btn'
                    onClick={this.toggleSettingsMenu}>

                    <div className='current-team'>{teamDisplay}</div>

                    <div className='current-user-icon'>
                      <div>{this.props.userInitials}</div>
                    </div>
                  </button>

                  { settingsMenu }

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

// <button onClick={this.toggleModal}>Open Modal</button>
// <Modal
//   isOpen={this.state.modalIsOpen}
//  onAfterOpen={this.toggleModal}
//  onRequestClose={this.toggleModal}
//  style={customStyles}
//  contentLabel="Example Modal">
//
//   <h2>Hello</h2>
//   <button onClick={this.toggleModal}>close</button>
//   <div>I am a modal</div>
//   <form>
//     <input />
//     <button>tab navigation</button>
//     <button>stays</button>
//     <button>inside</button>
//     <button>the modal</button>
//   </form>
//
// </Modal>
