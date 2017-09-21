import React from 'react';
import Modal from 'react-modal';

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};

export default class SettingsMenu extends React.Component{
  constructor(props){
    super(props);
    this.state = { teamModalIsOpen: false };

    this.handleTeamSelect = this.handleTeamSelect.bind(this);
    this.toggleNewTeamModal = this.toggleNewTeamModal.bind(this);
  }

  handleTeamSelect(event){
    event.preventDefault();
    const teamId = parseInt(event.target.id);
    this.props.fetchTeam(teamId);
  }

  toggleNewTeamModal(event){
    event.preventDefault();
    this.setState({ teamModalIsOpen: !this.state.teamModalIsOpen });
  }

  newTeamModalContent(){
    return (
      <Modal
        isOpen={this.state.teamModalIsOpen}
        onAfterOpen={this.toggleNewTeamModal}
        onRequestClose={this.toggleNewTeamModal}
        style={customStyles}
        contentLabel="Example Modal">

        <h2>Hello</h2>
        <button onClick={this.toggleNewTeamModal}>close</button>
        <div>I am a modal</div>
        <form>
          <input />
          <button>tab navigation</button>
          <button>stays</button>
          <button>inside</button>
          <button>the modal</button>
        </form>
      </Modal>
    );
  }

  render(){
    let teamsList, teamsUl;
    const teams = this.props.teams;
    const currentTeam = this.props.entities.team;

    const newTeamButton = (
      <button className='create-team-btn'
        onClick={this.toggleNewTeamModal}>Create New Team</button>
    );

    const logoutButton = (
      <button className='menu-logout-btn'
        onClick={this.props.handleTeamSelect}>Log Out</button>
    );

    if (this.props.teams){
      teamsList = teams.map((team, i) => {
        if (team.name !== currentTeam.name){
          return <button
            className='team-btn'
            onClick={this.handleTeamSelect}
            id={team.id}
            key={i}>{team.name}</button>;
        }
      });
    }

    return (
      <div>
        { this.newTeamModalContent() }

        <ul>
          { teamsList }
          { newTeamButton }
          { logoutButton }
        </ul>

      </div>
    );
  }
}
