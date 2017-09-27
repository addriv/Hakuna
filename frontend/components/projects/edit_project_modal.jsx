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

    const project = this.props.entities.projects[this.props.projectId];

    this.state = {
      editProjectIsOpen: false,
      confirmDeleteIsOpen: false,
      id: parseInt(project.id),
      name: project.name,
      description: project.description,
      team_id: parseInt(project.team_id),
      lead_id: parseInt(project.lead_id)
    };

    this.toggleEditProjectModal = this.toggleEditProjectModal.bind(this);
    this.editProjectSubmit = this.editProjectSubmit.bind(this);
    this.deleteProject = this.deleteProject.bind(this);
    this.toggleConfirmDelete = this.toggleConfirmDelete.bind(this);
  }

  handleEditFormInput(inputType){
    return (event) => this.setState({ [inputType]: event.target.value });
  }

  editProjectModal(){
    return (
      <Modal
        isOpen={this.state.editProjectIsOpen}
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
              value={this.state.name}/>

            <label>DESCRIPTION  </label>
            <input
              onChange={this.handleEditFormInput('description')}
              value={this.state.description}/>
          </form>

          <div id='buttons'>
            <button id='delete-btn'
              onClick={this.toggleConfirmDelete(true)}>Delete Project</button>
            <button id='update-btn'
              onClick={this.editProjectSubmit}>Update Project</button>
          </div>

          { this.state.confirmDeleteIsOpen ?
            this.confirmDeleteContent() : null }

        </div>
      </Modal>
    );
  }

  toggleEditProjectModal(event){
    if (event && event.currentTarget){
      event.preventDefault();
    }

    const project = this.props.entities.projects[this.props.projectId];
    const _defaultState = {
      editProjectIsOpen: !this.state.editProjectIsOpen,
      confirmDeleteIsOpen: false,
      id: parseInt(project.id),
      name: project.name,
      description: project.description,
      team_id: parseInt(project.team_id),
      lead_id: parseInt(project.lead_id)
    };

    this.setState(_defaultState);
  }

  toggleConfirmDelete(isOpen){
    if (isOpen){
      return event => {
        event.preventDefault();
        this.setState({ confirmDeleteIsOpen: true });
      };
    }
    else {
      return event => {
        event.preventDefault();
        this.setState({ confirmDeleteIsOpen: !this.state.confirmDeleteIsOpen });
      };
    }

  }

  deleteProject(event){
    event.preventDefault();

    const project = {
      id: this.state.id,
      team_id: this.state.team_id
    };

    this.props.deleteProject(project)
      .then(this.toggleEditProjectModal);
  }

  confirmDeleteContent(){
    return (
      <div className='project-delete'>
        <p>All tasks in this project will also be deleted.
          Are you sure you want to delete this project?</p>

        <div id='buttons'>
          <button id='cancel'
            onClick={this.toggleConfirmDelete(false)}>Cancel</button>

          <button id='delete-project'
            onClick={this.deleteProject}>Delete</button>
        </div>
      </div>
    );
  }

  editProjectSubmit(event){
    event.preventDefault();

    const updatedProject = {
      id: this.state.id,
      name: this.state.name,
      description: this.state.description,
      team_id: this.state.team_id,
      lead_id: this.state.lead_id
    };

    this.props.updateProject(updatedProject)
      .then(() => this.setState({ editProjectIsOpen: false }));
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
