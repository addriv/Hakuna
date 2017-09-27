import React from 'react';

export default class TasksDetail extends React.Component{
  constructor(props){
    super(props);

    this.tryToggle = this.tryToggle.bind(this);
  }

  tryToggle(event){
    event.preventDefault();
    this.props.toggle();
  }

  render(){
    return (
      <div className='tasks-detail'>
        <div id='header'>
          <button onClick={this.tryToggle}>X</button>
        </div>
      </div>
    );
  }
}
