import React from 'react';

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
  }

  newTeamModalContent(){
    return (
      <Modal
        isOpen={this.state.modalIsOpen}
        onAfterOpen={this.toggleModal}
        onRequestClose={this.toggleModal}
        style={customStyles}
        contentLabel="Example Modal">

        <h2>Hello</h2>
        <button onClick={this.toggleModal}>close</button>
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
}
