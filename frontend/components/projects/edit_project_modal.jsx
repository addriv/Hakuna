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
      id: parseInt(project.id),
      name: project.name,
      description: project.description,
      team_id: parseInt(project.team_id),
      lead_id: parseInt(project.lead_id)
    };

    this.toggleEditProjectModal = this.toggleEditProjectModal.bind(this);
    this.editProjectSubmit = this.editProjectSubmit.bind(this);
  }

  handleEditFormInput(inputType){
    return (event) => this.setState({ [inputType]: event.target.value });
  }

  editProjectModal(){
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
              value={this.state.name}/>

            <label>DESCRIPTION  </label>
            <input
              onChange={this.handleEditFormInput('description')}
              value={this.state.description}/>
          </form>

          <button onClick={this.editProjectSubmit}>Update Project</button>
        </div>
      </Modal>
    );
  }

  toggleEditProjectModal(event){
    if (event){
      event.preventDefault();

      const project = this.props.entities.projects[this.props.projectId];
      const _defaultState = {
        editProjectIsOpen: !this.state.editProjectIsOpen,
        id: parseInt(project.id),
        name: project.name,
        description: project.description,
        team_id: parseInt(project.team_id),
        lead_id: parseInt(project.lead_id)
      };

      this.setState(_defaultState);
    }
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
