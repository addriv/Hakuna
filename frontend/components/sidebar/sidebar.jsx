import React from 'react';
import NewProjectContainer from '../projects/new_project_container';
import EditProjectContainer from '../projects/edit_project_container';

export default class Sidebar extends React.Component {
  constructor(props){
    super(props);
    this.handleProject = this.handleProject.bind(this);
    this.handleMemberClick = this.handleMemberClick.bind(this);
  }

  handleProject(event){
    event.preventDefault();
    const projectId = parseInt(event.target.id);
    this.props.displayProject(projectId);
  }

  handleMemberClick(event){
    event.preventDefault();
    this.props.displayUser(parseInt(event.target.id));
  }

  render(){
    let members, membersList, currentTeam, projects, projectsList;

    if (this.props.entities.team){
      currentTeam = this.props.entities.team.name;
    }

    const memberButton= (initials, i, memberId) => (
      <button className={`member-icon-user-${i}`}
        onClick={ this.handleMemberClick } data-member={memberId}
        key={i} id={memberId} >{initials}</button>
    );

    let membersGrid = [memberButton(this.props.currentUserInitials, 0, this.props.currentUser.id)];
    for (let j = 1; j < 12; j++){
      if (this.props.teamMembers && this.props.teamMembers[j-1]){
        let memberInitials = this.props.teamMembers[j-1].name
             .split(' ')
             .map(name => name[0])
             .join('');

        const memberId = this.props.teamMembers[j-1].id;

        membersGrid.push(memberButton(memberInitials, j, memberId));
      }
      else {
        membersGrid.push(
          <li className='member-icon-blank' key={j} id={j}></li>
        );
      }
    }
    membersList = <ul>{membersGrid}</ul>;
    //Grab projects
    if (this.props.projects){
      const displayProjectId = this.props.uiDisplay.projectDisplay;


      projects = this.props.projects.map((project, i) => {
        let projectClass;
        if (project.id === displayProjectId) {
          projectClass = 'selected';
        }
        else {
          projectClass = 'unselected';
        }
        return (
          <li
            className={ projectClass }
            key={i}>
            <button
              onClick={this.handleProject}
              id={project.id}>{project.name}</button>

            <EditProjectContainer projectId={project.id}/>
          </li>
        );
      });

      projectsList = <ul>{ projects }</ul>;
    }

    return (
      <div className='sidebar-content'>
        <img src='https://res.cloudinary.com/dcl72qrya/image/upload/v1505802948/full_logo_full_yfxljp.png'></img>

        <div className='sidebar-team-members'>
          <div id='team'>{ `${currentTeam} Team Members` }</div>

          { membersList }
        </div>

        <div className='spacer'>

        </div>

        <div className='sidebar-projects'>
          <div id='projects-header'>
            <div id='header'>Projects</div>
            <NewProjectContainer />
          </div>
          { projectsList }
        </div>
      </div>
    );
  }
}
