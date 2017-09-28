import React from 'react';

const shortDate = date => {
  let month = date.getMonth();
  let day = date.getDate();
  let year = date.getFullYear();

  month = month.length === 1 ? `0${month}` : month;
  day = day.length === 1 ? `0${day}` : day;
  year = year.toString().slice(2);

  return `${month}/${day}/${year}`;
};

export default class TasksDetail extends React.Component{
  constructor(props){
    super(props);

    const taskId = this.props.state.ui.taskDisplay;
    const task = this.props.state.entities.tasks[taskId];
    this.state = task;
    this.state.deleteMessage = false;
    this.tryToggle = this.tryToggle.bind(this);
    this.handleTitle = this.handleTitle.bind(this);
    this.handleOnBlur = this.handleOnBlur.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.toggleComplete = this.toggleComplete.bind(this);
    this.startDelete = this.startDelete.bind(this);
    this.confirmDelete = this.confirmDelete.bind(this);
    this.cancelDelete = this.cancelDelete.bind(this);
  }

  tryToggle(event){
    if (event){
      event.preventDefault();
    }
    this.props.toggle();
  }

  componentWillReceiveProps(newProps){
    const oldTaskId = this.props.state.ui.taskDisplay;
    const newTaskId = newProps.state.ui.taskDisplay;

    let newTask;
    if (oldTaskId !== newTaskId){
      newTask = newProps.state.entities.tasks[newTaskId];
    }
    else {
      newTask = newProps.state.entities.tasks[newTaskId];
      newTask.title = newProps.indexState[newTaskId].title;
      newTask.completed = newProps.indexState[newTaskId].completed;
    }

    this.setState(newTask);
  }

  handleTitle(event){
    this.props.titleChange(event, 'title');
    const newTitle = { title: event.target.value };
    this.setState(newTitle);
  }

  handleInput(inputType){
    return event => {
      event.target.onblur = this.handleOnBlur;
      this.setState({ [inputType]: event.target.value });
    };
  }

  handleOnBlur(event){
    const updatedTask = {
      id: this.state.id,
      title: this.state.title,
      description: this.state.description,
      due_date: this.state.due_date,
      assignee_id: this.state.assignee_id,
      completed: this.state.completed
    };

    this.props.updateTask(updatedTask);
    event.target.onblur = null;
  }

  handleKeyPress(event){
    if (event.key === 'Enter'){
      event.target.blur();
    }
  }

  toggleComplete(event){
    event.preventDefault();
    this.props.toggleComplete(event);
  }

  startDelete(event){
    event.preventDefault();
    this.setState({ deleteMessage: true });
  }

  cancelDelete(event){
    event.preventDefault();
    this.setState({ deleteMessage: false });
  }

  confirmDelete(event){
    event.preventDefault();
    this.props.deleteTask(this.state).then(this.tryToggle);
  }

  deleteMessageContent(){
    return (
      <div id='delete-message'>
        <p>Deleting this tasks will also delete all subtasks.
          Are you sure you want to delete?</p>

        <div id='buttons'>
          <button id='cancel' onClick={this.cancelDelete}>Cancel</button>

          <button id='confirm-delete'
            onClick={this.confirmDelete}>Delete</button>
        </div>
      </div>
    );
  }

  render(){
    let project;
    const projectId = this.state.project_id;
    if (projectId) project = this.props.state.entities.projects[projectId];
    const taskId = this.props.state.ui.taskDisplay;
    const task = this.props.state.entities.tasks[taskId];
    const createdDate = shortDate(new Date(task.created_at));
    const updatedDate = shortDate(new Date(task.updated_at));

    return (
      <div className='tasks-detail'>
        <div id='header'>
          <button id='delete'
            onClick={ this.startDelete }>Delete</button>

          <button id='close' onClick={ this.tryToggle }>x</button>
        </div>

        { this.state.deleteMessage ? this.deleteMessageContent() : null }

        <div id='project-info'>
          <div id='project-name'>{ project ? project.name : '' }</div>
          <div id='project-spacer'></div>
        </div>

        <div className='title'>
          <button id={ this.state.id } onClick={ this.toggleComplete }>
            <div className={ this.state.completed ?
                'checkmark-done' : 'checkmark-not-done'}>L</div>
          </button>

          <input
            id={ this.state.id }
            value={ this.state.title ? this.state.title : '' }
            onChange={ this.handleTitle }
            onKeyPress={ this.handleKeyPress }
            placeholder='New Task Title'></input>
        </div>

        <textarea
          id='description'
          value={ this.state.description ? this.state.description : ''}
          onChange={ this.handleInput('description') }
          onKeyPress={ this.handleKeyPress }
          placeholder='Description'></textarea>

        <div id='divider'></div>

        <div id='timestamps'>
          <div id='created'>{ `Created task. ${createdDate}` }</div>
          <div id='updated'>{ `Updated task. ${updatedDate}` }</div>
        </div>

        <div id='subtasks'></div>

      </div>
    );
  }
}
