import React from 'react';
import Modal from 'react-modal';

const newTeamModalStyles = {
  content : {
    top                   : '40%',
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
    this.state = {
      name: '',
      teamModalIsOpen: false,
      settingsModalIsOpen: false };

    this.handleTeamSelect = this.handleTeamSelect.bind(this);
    this.toggleNewTeamModal = this.toggleNewTeamModal.bind(this);
    this.toggleSettingsModal = this.toggleSettingsModal.bind(this);
    this.teamFormSubmit = this.teamFormSubmit.bind(this);
    this.handleLeaveTeam = this.handleLeaveTeam.bind(this);
  }

  handleTeamSelect(event){
    event.preventDefault();
    const teamId = parseInt(event.target.id);
    this.props.fetchTeam(teamId);
  }

  toggleNewTeamModal(event){
    if (event){
      event.preventDefault();
      this.setState({ teamModalIsOpen: !this.state.teamModalIsOpen,
        settingsModalIsOpen: false });
    }
  }

  toggleSettingsModal(event){
    if (event){
      event.preventDefault();
      this.setState({ settingsModalIsOpen: !this.state.settingsModalIsOpen,
        teamModalIsOpen: false });
    }
  }

  handleTeamFormInput(inputType){
    return (event) => this.setState({ [inputType]: event.target.value });
  }

  teamFormSubmit(event){
    event.preventDefault();
    const newTeam = { team: { name: this.state.name } };
    this.props.createTeam(newTeam).then(
      response => {
        const teamId = Object.keys(response)[0];
        this.props.fetchTeam(teamId);
    });
  }

  handleLeaveTeam(event){
    event.preventDefault();
    const team = this.props.entities.team;
    this.props.leaveTeam({ team });
  }

  newTeamModalContent(){
    return (
      <Modal
        isOpen={this.state.teamModalIsOpen}
        onAfterOpen={this.toggleNewTeamModal}
        onRequestClose={this.toggleNewTeamModal}
        style={newTeamModalStyles}
        contentLabel="Example Modal">

        <div className='new-team-form'>
          <div className='new-team-header'>
            <h2>Create Your Workspace</h2>
            <button onClick={this.toggleNewTeamModal}>X</button>
          </div>

          <form>
            <label>WORKSPACE NAME</label>
            <input onChange={this.handleTeamFormInput('name')}
              value={this.state.name} placeholder='Team Name'/>
          </form>

          <button onClick={this.teamFormSubmit}>Create Workspace</button>
        </div>
      </Modal>
    );
  }

  teamSettingsModalContent(){
    return (
      <Modal
        isOpen={this.state.settingsModalIsOpen}
        onAfterOpen={this.toggleSettingsModal}
        onRequestClose={this.toggleSettingsModal}
        style={newTeamModalStyles}
        contentLabel="Example Modal">

        <div className='new-team-form'>
          <div className='new-team-header'>
            <h2>Workspace Settings</h2>
            <button onClick={this.toggleSettingsModal}>X</button>
          </div>

          <form>
            <label>WORKSPACE NAME</label>
            <input onChange={this.handleTeamFormInput('name')}
              value={this.state.name} placeholder='Team Name'/>
          </form>

          <button onClick={this.teamFormSubmit}>Create Workspace</button>
        </div>
      </Modal>
    );
  }

  render(){
    let teamsList, teamsUl;
    const teams = this.props.teams;
    const currentTeam = this.props.entities.team;

    const newTeamButton = (
      <button className='create-team-btn'
        onClick={this.toggleNewTeamModal}>Create New Workspace</button>
    );

    const leaveTeamButton = (
      <button className='leave-team-btn'
        onClick={this.handleLeaveTeam}>Remove me from this Workspace</button>
    );

    const logoutButton = (
      <button className='menu-logout-btn'
        onClick={this.props.logout}>Log Out</button>
    );

    const teamSettingsButton = (
      <button className='team-settings-btn'
        onClick={this.toggleSettingsModal}>
        {`${currentTeam.name} Settings`}</button>
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
      <div className='settings-dropdown'>
        { this.newTeamModalContent() }
        { this.teamSettingsModalContent() }
        <ul>
          { teamsList }
          { newTeamButton }
          { teamSettingsButton }
          { leaveTeamButton }
          { logoutButton }
        </ul>

      </div>
    );
  }
}
