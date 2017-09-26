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

export default class EditProjectModal extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      editProjectIsOpen: false,
      name: '',
      description: '',
      public: true,
      team_id: null,
      lead_id: null
    };

    this.toggleEditProjectModal = this.toggleEditProjectModal.bind(this);
  }

  handleEditFormInput(inputType){
    return (event) => this.setState({ [inputType]: event.target.value });
  }

  editProjectModal(){
    let project = this.props.entities.projects[this.props.projectId];

    return (
      <Modal
        isOpen={this.state.editProjectIsOpen}
        onAfterOpen={this.toggleEditProjectModal}
        onRequestClose={this.toggleEditProjectModal}
        style={modalStyles}
        contentLabel="Edit Project Modal">

        <div className='edit-project-form'>
          <div className='edit-project-header'>
            <h2>Edit Project</h2>
            <button onClick={this.toggleEditProjectModal}>X</button>
          </div>

          <form>
            <label>PROJECT NAME</label>
            <input
              onChange={this.handleEditFormInput('name')}
              value={project.name}/>

            <label>DESCRIPTION  </label>
            <input
              onChange={this.handleEditFormInput('description')}
              value={project.description}/>
          </form>

          <button onClick={this.newProjectSubmit}>Create Project</button>
        </div>
      </Modal>
    );
  }

  toggleEditProjectModal(event){
    if (event){
      event.preventDefault();
      this.setState({ editProjectIsOpen: !this.state.editProjectIsOpen });
    }
  }

  render(){
    let editProjectModal;
    if (this.state.editProjectIsOpen) {
      editProjectModal = this.editProjectModal();
    }

    return (
      <div>
        { editProjectModal }
        <button onClick={this.toggleEditProjectModal}>...</button>
      </div>
    );
  }
}
