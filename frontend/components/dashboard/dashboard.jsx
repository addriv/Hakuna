import React from 'react';
import Modal from 'react-modal';
import { Route, Redirect } from 'react-router-dom';
import SidebarContainer from '../sidebar/sidebar_container';
import SettingsMenuContainer from './settings_menu_container';
import TasksIndexContainer from '../tasks/tasks_index_container';
import { objectComparisonByKeys } from '../../util/navigation_util';

export default class Dashboard extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      settingsMenuIsOpen: false,
     };

    this.toggleSettingsMenu = this.toggleSettingsMenu.bind(this);
    this.setWrapperRef = this.setWrapperRef.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
    this.handleMyTasks = this.handleMyTasks.bind(this);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside);
  }

  handleClickOutside(event){
    const modalElement = document.getElementsByClassName('ReactModal__Overlay');

    if (
      this.wrapperRef
      && !this.wrapperRef.contains(event.target)
      && modalElement.length === 0) {
        this.setState({ settingsMenuIsOpen: false });
    }
  }

  setWrapperRef(node) {
    this.wrapperRef = node;
  }

  componentWillReceiveProps(newProps){
    const oldTeam = newProps.entities.team;
    const newTeam = this.props.entities.team;
    if (oldTeam && newTeam && oldTeam.id !== newTeam.id){
      this.setState({ settingsMenuIsOpen: false});
    }

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

    document.addEventListener('mousedown', this.handleClickOutside);
  }

  toggleSettingsMenu(event){
    if (event){
      event.preventDefault();
    }
    this.setState({ settingsMenuIsOpen: !this.state.settingsMenuIsOpen });
  }

  handleMyTasks(event){
    event.preventDefault();
    const currentUserId = this.props.currentUser.id;
    this.props.receiveUserDisplay(currentUserId);
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

    //Get list display name
    const projectDisplay = this.props.uiDisplay.projectDisplay;
    const userDisplay = this.props.uiDisplay.userDisplay;

    if (userDisplay > 0){
      if (userDisplay === this.props.currentUser.id){
        listDisplay = `All My Tasks in ${teamDisplay}`;
      }
      else {
        const member = this.props.entities.members[userDisplay];
        listDisplay = `${member.name}'s Tasks in ${teamDisplay}`;
      }
    }
    else if (projectDisplay === 0) {
      listDisplay = `All Tasks in ${teamDisplay}`;
    }
    else if (projectDisplay !== 0 && projectDisplay !== -1 ) {
      const project = this.props.entities.projects[projectDisplay];
      listDisplay = `${project.name}`;
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
                  onClick={ this.handleMyTasks }
                  className='view-user-tasks'
                  >My Tasks</button>

                <div>
                  <div className='settings-menu' ref={this.setWrapperRef}>

                    <button
                      className='settings-menu-btn'
                      onClick={this.toggleSettingsMenu}>

                      <div className='current-team'>{teamDisplay}</div>

                      <div className='member-icon-user-0'>
                        <div>{this.props.userInitials}</div>
                      </div>

                    </button>
                    
                    { this.state.settingsMenuIsOpen ?
                      <SettingsMenuContainer toggleMenu={this.toggleSettingsMenu}/> : null }


                  </div>
                </div>

              </nav>

              <nav className='bottom-bar'>
                <div>
                  <h1>{listDisplay}</h1>
                </div>
              </nav>

            </nav>

            <TasksIndexContainer />

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

//Tasks render
// <div className='tasks-ui'>
//
//   <div className='tasks-list'>
//     { tasksUl }
//   </div>
//
// </div>
//
//Render tasks continued
//Grab tasks if they exist
// const projectDisplay = this.props.uiDisplay.projectDisplay;
// const userDisplay = this.props.uiDisplay.userDisplay;
//
// //If userDisplay !== -1, grab tasks for specified user
// if (userDisplay !== -1){
//   const userTasks = [];
//   this.props.tasks.forEach(task => {
//     if (task.assignee_id === userDisplay){
//       userTasks.push(task);
//     }
//   });
//
//   tasksList = userTasks.map((task, i) => {
//     return (
//       <li
//         id={ task.id }
//         key={i}>{ task.title }</li>
//     );
//   });
//
//   tasksUl = <ul>{ tasksList }</ul>;
//   const memberSelected = this.entities.members[userDisplay].name;
//
//   if (userDisplay === 0){
//     listDisplay = `My Tasks in ${teamDisplay}`;
//   }
//   else listDisplay = `${memberSelected}'s Assigned Tasks`;
// }
// //If projectDisplay === 0, get all public tasks for the Team
// else if (tasks && projectDisplay === 0){
//   tasksList = tasks.map((task, i) => {
//     return (
//       <li
//         id={ task.id }
//         key={i}>{ task.title }</li>
//     );
//   });
//
//   tasksUl = <ul>{ tasksList }</ul>;
//   listDisplay = `All Tasks in ${teamDisplay}`;
// }
// //If projectDisplay !== 0 or !== -1 filter specific tasks by project selected
// else if (projectDisplay !== 0 && projectDisplay !== -1){
//   const projectTasks = [];
//   this.props.tasks.forEach(task => {
//     if (task.project_id === projectDisplay) {
//       projectTasks.push(task);
//     }
//   });
//
//   tasksList = projectTasks.map((task, i) => {
//     return (
//       <li
//         id={ task.id }
//         key={i}>{ task.title }</li>
//     );
//   });
//
//   tasksUl = <ul>{ tasksList }</ul>;
//   const project = this.props.entities.projects[projectDisplay];
//   listDisplay = `${project.name}`;
// }
