import React from 'react';
import Modal from 'react-modal';
import { Route, Redirect } from 'react-router-dom';
import SidebarContainer from '../sidebar/sidebar_container';
import SettingsMenuContainer from './settings_menu_container';
import { objectComparisonByKeys } from '../../util/navigation_util';

export default class Dashboard extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      settingsMenuIsOpen: false,
     };

    this.toggleSettingsMenu = this.toggleSettingsMenu.bind(this);
  }

  componentWillReceiveProps(newProps){
    this.setState({ settingsMenuIsOpen: false });
    if (newProps.teams && this.props.teams){
      const newTeams = Object.values(newProps.teams);
      const oldTeams = Object.values(this.props.teams);
      if (newTeams.length < oldTeams.length){
        this.props.fetchTeam(parseInt(newTeams[0].id));
      }
    }
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
    let teamDisplay, listDisplay, tasksList, tasksUl, settingsMenu;

    //Grab team being displayed
    if (entitiesExist){
      teamDisplay = this.props.entities.team.name;
    }

    //Grab tasks if they exist
    const projectDisplay = this.props.uiDisplay.projectDisplay;
    const userDisplay = this.props.uiDisplay.userDisplay;

    //If userDisplay !== -1, grab tasks for specified user
    if (userDisplay !== -1){
      const userTasks = [];
      this.props.tasks.forEach(task => {
        if (task.assignee_id === userDisplay){
          userTasks.push(task);
        }
      });

      tasksList = userTasks.map((task, i) => {
        return (
          <li
            id={ task.id }
            key={i}>{ task.title }</li>
        );
      });

      tasksUl = <ul>{ tasksList }</ul>;
      const memberSelected = this.entities.members[userDisplay].name;

      if (userDisplay === 0){
        listDisplay = `My Tasks in ${teamDisplay}`;
      }
      else listDisplay = `${memberSelected}'s Assigned Tasks`;
    }
    //If projectDisplay === 0, get all public tasks for the Team
    else if (tasks && projectDisplay === 0){
      tasksList = tasks.map((task, i) => {
        return (
          <li
            id={ task.id }
            key={i}>{ task.title }</li>
        );
      });

      tasksUl = <ul>{ tasksList }</ul>;
      listDisplay = `All Tasks in ${teamDisplay}`;
    }
    //If projectDisplay !== 0 or !== -1 filter specific tasks by project selected
    else if (projectDisplay !== 0 && projectDisplay !== -1){
      const projectTasks = [];
      this.props.tasks.forEach(task => {
        if (task.project_id === projectDisplay) {
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
      const project = this.props.entities.projects[projectDisplay];
      listDisplay = `${project.title}`;
    }

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

                    <div className='member-icon-user-0'>
                      <div>{this.props.userInitials}</div>
                    </div>
                  </button>

                  { settingsMenu }

                </div>

              </nav>

              <nav className='bottom-bar'>
                <div>
                  <h1>{listDisplay}</h1>
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

///Conditional for deleting teams
// if (this.props.teams && newProps.teams){
//   console.log(objectComparisonByKeys(newProps.teams, this.props.teams));
//   if (!objectComparisonByKeys(newProps.teams, this.props.teams)){
//     this.props.fetchTeam(Object.keys(newProps.teams)[0].id);
//   }
// }
