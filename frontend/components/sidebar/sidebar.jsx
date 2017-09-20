import React from 'react';

export default class Sidebar extends React.Component {
  constructor(props){
    super(props);
  }

  render(){
    let members, membersList, currentTeam;
    if (this.props.teamMembers){
      members = this.props.teamMembers.map((member, i) => {
        return (
          <li
            key={i}
            id={member.id}>{member.name}</li>
        );
      });

      membersList = <ul>{members}</ul>;

      currentTeam = this.props.entities.team.name;
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
      </div>
    );
  }
}
