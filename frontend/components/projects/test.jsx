import Modal from 'react-modal';

const NewProjectModal = (stateVariable, toggleFn, styles) => {
  return (
    <Modal
      isOpen={stateVariable}
      onAfterOpen={toggleFn}
      onRequestClose={toggleFn}
      style={styles}
      contentLabel="New Team Modal">

      <div className='new-team-form'>
        <div className='new-team-header'>
          <h2>Create Your Workspace</h2>
          <button onClick={toggleFn}>X</button>
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
};

export default NewProjectModal;
