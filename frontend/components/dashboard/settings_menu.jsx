import React from 'react';
import Modal from 'react-modal';

const newTeamModalStyles = {
  overlay: {
    backgroundColor: 'rgba(95, 95, 95, 0.75)'
  },
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
      updateName: this.props.entities.team.name,
      updateId: this.props.entities.team.id,
      teamModalIsOpen: false,
      settingsModalIsOpen: false,
      leaveTeamModalIsOpen: false };

    this.handleTeamSelect = this.handleTeamSelect.bind(this);
    this.toggleNewTeamModal = this.toggleNewTeamModal.bind(this);
    this.toggleSettingsModal = this.toggleSettingsModal.bind(this);
    this.teamFormSubmit = this.teamFormSubmit.bind(this);
    this.handleLeaveTeam = this.handleLeaveTeam.bind(this);
    this.toggleLeaveTeamModal = this.toggleLeaveTeamModal.bind(this);
    this.handleTeamUpdate = this.handleTeamUpdate.bind(this);
  }

  handleTeamSelect(event){
    event.preventDefault();
    const teamId = parseInt(event.currentTarget.id);
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
        teamModalIsOpen: false,
        updateName: this.props.entities.team.name } );
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

  toggleLeaveTeamModal(event){
    if (event){
      event.preventDefault();
      this.setState({ leaveTeamModalIsOpen: !this.state.leaveTeamModalIsOpen });
    }
  }

  handleLeaveTeam(event){
    event.preventDefault();
    const team = this.props.entities.team;
    this.props.leaveTeam({ team });
  }

  handleTeamUpdate(event){
    event.preventDefault();
    const updatedData = { id: this.state.updateId, name: this.state.updateName };
    this.props.updateTeam(updatedData).then(
      () => this.props.toggleMenu()
    );
  }

  confirmLeaveTeamModal(){
    return (
      <Modal
        isOpen={this.state.leaveTeamModalIsOpen}
        onAfterOpen={this.toggleLeaveTeamModal}
        onRequestClose={this.toggleLeaveTeamModal}
        style={newTeamModalStyles}
        contentLabel="Leave Team Modal">

        <div className='leave-team-modal'>
          <div id='header'>Remove Yourself from the Workspace?</div>
          <div id='content'>
            If you remove yourself, you won't be able to access any of the projects or task.
          </div>
          <div id='buttons'>
            <button id='cancel-btn'
              onClick={this.toggleLeaveTeamModal}>Cancel</button>
            <button id='confirm-leave'
              onClick={this.handleLeaveTeam}>Remove Me</button>
          </div>
        </div>
      </Modal>
    );
  }

  newTeamModalContent(){
    return (
      <Modal
        isOpen={this.state.teamModalIsOpen}
        onAfterOpen={this.toggleNewTeamModal}
        onRequestClose={this.toggleNewTeamModal}
        style={newTeamModalStyles}
        contentLabel="New Team Modal">

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
        contentLabel="Team Settings Modal">

        <div className='edit-team-form'>
          <div className='edit-team-header'>
            <h2>Workspace Settings</h2>
            <button onClick={this.toggleSettingsModal}>X</button>
          </div>

          <form>
            <label>WORKSPACE NAME</label>
            <input onChange={this.handleTeamFormInput('updateName')}
              value={this.state.updateName}/>
          </form>

          <button onClick={this.handleTeamUpdate}>Update Workspace</button>
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
        onClick={this.toggleLeaveTeamModal}>Remove me from this Workspace</button>
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
            key={i}>

            <div>{team.name}</div>
          </button>;
        }
      });
    }

    return (
      <div className='settings-dropdown'>
        { this.newTeamModalContent() }
        { this.teamSettingsModalContent() }
        { this.confirmLeaveTeamModal() }
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

// toggleSettingsMenu passed from parent
//
// toggleSettingsMenu(){
//   console.log('testing');
//   this.props.toggleMenu();
//   debugger;
// }
