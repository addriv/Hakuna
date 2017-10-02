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
    this.handleFocus = this.handleFocus.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.handleOnChangeBlur = this.handleOnChangeBlur.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.toggleComplete = this.toggleComplete.bind(this);
  }

  componentWillReceiveProps(newProps){
    const tasks = newProps.state.entities.tasks;
    const oldTeam = this.props.state.entities.team;
    const newTeam = newProps.state.entities.team;
    const oldProject = this.props.state.ui.projectDisplay;
    const newProject = newProps.state.ui.projectDisplay;
    const oldUser = this.props.state.ui.userDisplay;
    const newUser = newProps.state.ui.userDisplay;

    if (tasks){
      this.setState(tasks);
    }
    else if (!tasks && oldTeam && newTeam && oldTeam.id !== newTeam.id){
      this.setState(initialState);
    }

    if (oldTeam && newTeam && oldTeam.id !== newTeam.id
        || oldProject !== newProject || oldUser !== newUser){
      this.setState({ taskDetailIsOpen: false});
    }
  }

  newTask(event){
    event.preventDefault();
    debugger;
    const projects = this.props.state.entities.projects;
    const team = this.props.state.entities.team;
    let task;

    if (projects){
      const projectDisplayId = this.props.state.ui.projectDisplay;
      const firstProjectId = parseInt(Object.keys(projects)[0]);
      const projectId = projectDisplayId ? projectDisplayId : firstProjectId;
      task = {
        team_id: team.id,
        project_id: projectId
      };

      this.props.createTask(task).then(
        () => this.setState({ taskDetailIsOpen: true })
      );
    }
    // This section is to create new project if user doesn't have any
    else {
      const newProject = {
        name: 'New Project',
        team_id: team.id
      };

      this.props.createProject(newProject).then(response => {
        console.log(response.projects.id);
        task = {
          team_id: team.id,
          project_id: response.projects.id
        };

        this.props.createTask(task).then(
          () => this.setState({ taskDetailIsOpen: true })
        );
      });
    }
  }

  closeDetail(event){
    if (event){
      event.preventDefault();
    }
    this.setState({ taskDetailIsOpen: false });
  }

  handleFocus(event){
    const taskId = parseInt(event.target.id);
    const task = this.props.state.entities.tasks[taskId];
    const parentli = event.target.parentElement;
    parentli.className = 'focused';

    this.props.receiveTaskDisplay({ tasks: { [task.id]: task }});
    this.setState({ taskDetailIsOpen: true });
  }

  handleInput(event, inputType){
    event.target.onblur = this.handleOnChangeBlur;

    const taskId = event.target.id;
    const newState = merge(
      {}, this.state, { [taskId]: { [inputType]: event.target.value }}
    );
    this.setState(newState);
  }

  handleOnChangeBlur(event){
    const taskId = parseInt(event.target.id);
    const update = { id: taskId, title: event.target.value };

    const newState = merge(
      {}, this.state, { [taskId]: { title: event.target.value }}
    );

    this.props.updateTask(update).then(() => this.setState(newState));

    event.target.onblur = null;
  }

  handleOnBlur(event){
    const parentli = event.target.parentElement;
    parentli.className = 'unfocused';
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

  toggleComplete(event){
    event.preventDefault();
    const taskId = parseInt(event.currentTarget.id);
    const currentStatus = this.state[taskId].completed;
    const update = { id: taskId, completed: !currentStatus };
    const newState = merge(
      {}, this.state, { [taskId]: { completed: !currentStatus }}
    );

    this.props.updateTask(update);
  }

  tasksIndexContent(){
    const tasks = this.props.tasks;
    const projectDisplay = this.props.state.ui.projectDisplay;
    const userDisplay = this.props.state.ui.userDisplay;

    if (tasks){
      const taskList = tasks.map((task, i) => {
        if (task.parent_task_id) {
          return;
        }
        else if (userDisplay > 0 && task.assignee_id !== userDisplay){
          return;
        }
        else if (projectDisplay > 0 && task.project_id !== projectDisplay) {
          return;
        }
        else {
          const title = this.state[task.id].title;
          return (
            <li
              className='unfocused'
              id={ task.id }
              key={i}>

              <button id={ task.id } onClick={ this.toggleComplete }>
                <div className={ task.completed ?
                    'checkmark-done' : 'checkmark-not-done'}>L</div>
              </button>

              <input
                id={ task.id }
                onFocus={ this.handleFocus }
                onKeyPress={ this.handleKeyPress }
                onKeyDown={ this.handleKeyDown }
                onBlur={ this.handleOnBlur }
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
            toggleComplete={this.toggleComplete}
            indexState={this.state}
            titleChange={this.handleInput} /> : null }
      </div>
    );
  }
}
