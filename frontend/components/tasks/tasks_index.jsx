import React from 'react';
import TasksDetailContainer from './tasks_detail_container';
import merge from 'lodash/merge';

const initialState = { taskDetailIsOpen: false };

export default class TasksIndex extends React.Component{
  constructor(props){
    super(props);

    this.state = initialState;
    this.newTask = this.newTask.bind(this);
    this.closeDetail = this.closeDetail.bind(this);
    this.handleTaskClick = this.handleTaskClick.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.handleOnBlur = this.handleOnBlur.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }

  componentWillReceiveProps(newProps){
    const tasks = newProps.state.entities.tasks;
    const oldTeam = this.props.state.entities.team;
    const newTeam = newProps.state.entities.team;
    const oldProject = this.props.state.ui.projectDisplay;
    const newProject = newProps.state.ui.projectDisplay;

    if (tasks && (!this.props.state.entities.tasks
      || (oldTeam && newTeam && oldTeam.id !== newTeam.id))){
      this.setState(tasks, () => console.log(this.state));
    }
    else if (!tasks && oldTeam && newTeam && oldTeam.id !== newTeam.id){
      this.setState(initialState);
    }

    if (oldTeam && newTeam && oldTeam.id !== newTeam.id
        || oldProject !== newProject){
      this.setState({ taskDetailIsOpen: false});
    }
  }

  newTask(event){
    event.preventDefault();

    const team = this.props.state.entities.team;
    const projectDisplayId = this.props.state.ui.projectDisplay;
    const projectId = projectDisplayId ? projectDisplayId : null;

    const task = {
      team_id: team.id,
      project_id: projectId
    };

    this.props.createTask(task).then(
      () => this.setState({ taskDetailIsOpen: true })
    );
  }

  closeDetail(event){
    if (event){
      event.preventDefault();
    }
    this.setState({ taskDetailIsOpen: false });
  }

  handleTaskClick(event){
    const taskId = parseInt(event.target.id);
    const task = this.props.state.entities.tasks[taskId];

    this.props.receiveTaskDisplay({ tasks: { [task.id]: task }});
    this.setState({ taskDetailIsOpen: true });
  }

  handleInput(event, inputType){
    const taskId = event.target.id;
    const newState = merge(
      {}, this.state, { [taskId]: { [inputType]: event.target.value }}
    );
    this.setState(newState);
  }

  handleOnBlur(event){
    const taskId = parseInt(event.target.id);
    const updatedTask = {
      id: taskId,
      title: event.target.value
    };

    const newState = merge(
      {}, this.state, { [taskId]: { title: event.target.value }}
    );

    this.props.updateTask(updatedTask).then(
      () => this.setState(newState)
    );
  }

  handleKeyPress(event){
    if (event.key === 'Enter'){
      event.target.blur();
    }
  }

  handleKeyDown(event){
    if (event.key === 'ArrowDown' && event.target.parentElement.nextSibling) {
      event.target.parentElement.nextSibling.childNodes[1].focus();
    }
    if (event.key === 'ArrowUp' && event.target.parentElement.previousSibling) {
      event.target.parentElement.previousSibling.childNodes[1].focus();
    }
  }

  tasksIndexContent(){
    const tasks = this.props.tasks;
    const projectDisplay = this.props.state.ui.projectDisplay;

    if (tasks){
      const taskList = tasks.map((task, i) => {
        if (task.parent_task_id) {
          return;
        }
        else if (projectDisplay > 0 && task.project_id !== projectDisplay) {
          return;
        }
        else {
          const title = this.state[task.id].title;
          return (
            <li
              id={ task.id }
              key={i}>

              <button>
                <div className={ task.completed ?
                    'checkmark-done' : 'checkmark-not-done'}>L</div>
              </button>

              <input
                id={ task.id }
                onClick={ this.handleTaskClick }
                onBlur={ this.handleOnBlur }
                onKeyPress={ this.handleKeyPress }
                onKeyDown={ this.handleKeyDown }
                onChange= { event => this.handleInput(event, 'title') }
                value={ title ? title : '' }></input>
            </li>
          );
        }
      });

      return <ul>{ taskList }</ul>;
    }
  }

  render(){
    return (
      <div className='tasks-ui'>
        <div className='tasks-index'>
          <div id='header'>
            <button onClick={this.newTask}>Add Task</button>
          </div>

          { this.tasksIndexContent() }
        </div>

        { this.state.taskDetailIsOpen ?
          <TasksDetailContainer
            toggle={this.closeDetail}
            indexState={this.state}
            titleChange={this.handleInput} /> : null }
      </div>
    );
  }
}
