import React from 'react';
import Modal from 'react-modal';

const modalStyles = {
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

export default class NewProjectModal extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      newProjectIsOpen: false,
      name: ''
    };
    this.toggleNewProject = this.toggleNewProject.bind(this);
  }

  toggleNewProject(event){
    if (event){
      event.preventDefault();
      this.setState({ newProjectIsOpen: !this.state.newProjectIsOpen});
      console.log(this.state.newProjectIsOpen);
    }
  }

  newProjectModal(){
    return (
      <Modal
        isOpen={this.state.newProjectIsOpen}
        onAfterOpen={this.toggleNewProject}
        onRequestClose={this.toggleNewProject}
        style={modalStyles}
        contentLabel="New Team Modal">

        <div className='new-team-form'>
          <div className='new-team-header'>
            <h2>Create a New Project!</h2>
            <button onClick={this.toggleNewProject}>X</button>
          </div>

          <form>
            <label>PROJECT NAME</label>
            <input
              value={this.state.name} placeholder='Team Name'/>
          </form>

          <button onClick={this.teamFormSubmit}>Create Workspace</button>
        </div>
      </Modal>
    );
  }

  render(){
    let newProjectModal;
    if (this.state.newProjectIsOpen) {
      newProjectModal = this.newProjectModal();
    }

    return (
      <div>
        <button onClick={this.toggleNewProject}>+</button>
        { newProjectModal }
      </div>
    );
  }
}
