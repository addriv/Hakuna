import React from 'react';

export default class Sidebar extends React.Component {
  constructor(props){
    super(props);

    this.handleProject = this.handleProject.bind(this);
  }

  handleProject(event){
    event.preventDefault();
    const projectId = parseInt(event.target.id);
    this.props.displayProject(projectId);
  }

  render(){
    let members, membersList, currentTeam, projects, projectsList;

    const memberButton= (initials, i) => (
      <button className={`member-icon-user-${i}`} key={i} id={i} ><div>{initials}</div></button>
    );

    let membersGrid = [memberButton(this.props.currentUserInitials, 0)];
    for (let j = 1; j < 8; j++){
      if (this.props.teamMembers && this.props.teamMembers[j-1]){
        let memberInitials = this.props.teamMembers[j-1].name
             .split(' ')
             .map(name => name[0])
             .join('');

        membersGrid.push(memberButton(memberInitials, j));
      }
      else {
        membersGrid.push(<li className='member-icon-blank' key={j} id={j}></li>);
      }
    }
    membersList = <ul>{membersGrid}</ul>;
    //Grab projects
    if (this.props.projects){
      projects = this.props.projects.map((project, i) => {
        return (
          <button
            onClick={this.handleProject}
            key={i}
            id={project.id}>{project.name}</button>
        );
      });

      projectsList = <ul>{ projects }</ul>;
    }

    return (
      <div>
        <img src='http://res.cloudinary.com/dcl72qrya/image/upload/v1505802948/full_logo_full_yfxljp.png'></img>

        <div className='sidebar-team-members'>
          <h1>{ currentTeam }</h1>
          <div>
            { membersList }
          </div>
        </div>

        <div className='spacer'>

        </div>

        <div className='sidebar-projects'>
          <h2>Projects</h2>
          { projectsList }
        </div>
      </div>
    );
  }
}

//Grab team members
// if (this.props.teamMembers){
//   members = this.props.teamMembers.map((member, i) => {
//     const memberInitials = member.name
//       .split(' ')
//       .map(name => name[0]);
//     return (
//       <li
//         key={i}
//         id={member.id}><div className='member'>{memberInitials}</div></li>
//     );
//   });
//
//   membersList = <ul>{members}</ul>;
//
//   currentTeam = this.props.entities.team.name;
// }
