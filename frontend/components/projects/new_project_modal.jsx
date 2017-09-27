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
      name: '',
      description: '',
      public: true,
      team_id: null,
      lead_id: null
    };

    this.toggleNewProject = this.toggleNewProject.bind(this);
    this.handleProjectFormInput = this.handleProjectFormInput.bind(this);
    this.newProjectSubmit = this.newProjectSubmit.bind(this);
  }

  toggleNewProject(event){
    if (event){
      event.preventDefault();
      this.setState({ newProjectIsOpen: !this.state.newProjectIsOpen});
    }
  }

  handleProjectFormInput(inputType){
    return (event) => this.setState({ [inputType]: event.target.value });
  }

  newProjectSubmit(event){
    event.preventDefault();
    const newProject = {
      name: this.state.name,
      description: this.state.description,
      public: this.state.public,
      team_id: this.props.entities.team.id,
    };
    this.props.createProject(newProject)
      .then(
        this.setState({
          newProjectIsOpen: false,
          name: '',
          description: '',
          public: true,
          team_id: null,
          lead_id: null
        })
      );
  }

  newProjectModal(){
    return (
      <Modal
        isOpen={this.state.newProjectIsOpen}
        onAfterOpen={this.toggleNewProject}
        onRequestClose={this.toggleNewProject}
        style={modalStyles}
        contentLabel="New Project Modal">

        <div className='new-project-form'>
          <div className='new-project-header'>
            <h2>Create Your Project</h2>
            <button onClick={this.toggleNewProject}>X</button>
          </div>

          <form>
            <label>PROJECT NAME</label>
            <input
              onChange={this.handleProjectFormInput('name')}
              value={this.state.name} placeholder='Required'/>

            <label>DESCRIPTION  </label>
            <input
              onChange={this.handleProjectFormInput('description')}
              value={this.state.description} placeholder='Optional'/>
          </form>

          <button onClick={this.newProjectSubmit}>Create Project</button>
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
      <div id='new-project-btn'>
        <button onClick={this.toggleNewProject}>+</button>
        { newProjectModal }
      </div>
    );
  }
}
