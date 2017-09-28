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
    this.tryToggle = this.tryToggle.bind(this);
    this.handleTitle = this.handleTitle.bind(this);
    this.handleOnBlur = this.handleOnBlur.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  tryToggle(event){
    event.preventDefault();
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
    }

    this.setState(newTask);
  }

  handleTitle(event){
    this.props.titleChange(event, 'title');
    const newTitle = { title: event.target.value };
    this.setState(newTitle);
  }

  handleInput(inputType){
    return event => this.setState({ [inputType]: event.target.value });
  }

  handleOnBlur(){
    const updatedTask = {
      id: this.state.id,
      title: this.state.title,
      description: this.state.description,
      due_date: this.state.due_date,
      assignee_id: this.state.assignee_id,
      completed: this.state.completed
    };

    this.props.updateTask(updatedTask);
  }

  handleKeyPress(event){
    if (event.key === 'Enter'){
      event.target.blur();
    }
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
          <button onClick={this.tryToggle}>X</button>
        </div>

        <div id='project-info'>
          { project ? project.name : '' }
        </div>

        <input
          className='title'
          id={ this.state.id }
          value={ this.state.title ? this.state.title : '' }
          onChange={ this.handleTitle }
          onBlur={ this.handleOnBlur }
          onKeyPress={ this.handleKeyPress }
          placeholder='New Task Title'></input>

        <textarea
          id='description'
          value={ this.state.description ? this.state.description : ''}
          onChange={ this.handleInput('description') }
          onBlur={ this.handleOnBlur }
          onKeyPress={ this.handleKeyPress }
          placeholder='Description'></textarea>

        <div id='timestamps'>
          <div id='created'>{ `Created task. ${createdDate}` }</div>
          <div id='updated'>{ `Updated task. ${updatedDate}` }</div>
        </div>

        <div id='subtasks'></div>

      </div>
    );
  }
}
