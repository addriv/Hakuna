import React from 'react';
import TasksDetailContainer from './tasks_detail_container';

export default class TasksIndex extends React.Component{
  constructor(props){
    super(props);

    this.state = { taskDetailIsOpen: false };
    this.newTask = this.newTask.bind(this);
    this.closeDetail = this.closeDetail.bind(this);
    this.handleTaskClick = this.handleTaskClick.bind(this);
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
    event.preventDefault();

    const taskId = parseInt(event.target.id);
    const task = this.props.state.entities.tasks[taskId];

    this.props.receiveTask({ tasks: { [task.id]: { task } }});
    this.setState({ taskDetailIsOpen: true });
  }

  tasksIndexContent(){
    let tasksList, tasksUl;
    const tasks = this.props.tasks;

    //Grab tasks if they exist
    const projectDisplay = this.props.state.ui.projectDisplay;
    const userDisplay = this.props.state.ui.userDisplay;

    //If userDisplay !== -1, grab tasks for specified user
    if (userDisplay !== -1){
      const userTasks = [];
      this.props.tasks.forEach(task => {
        if (task.assignee_id === userDisplay){
          userTasks.push(task);
        }
      });

      tasksList = userTasks.map((task, i) => {
        return (
          <li
            id={ task.id }
            key={i}>{ task.title }</li>
        );
      });

      return <ul>{ tasksList }</ul>;
    }
    //If projectDisplay === 0, get all public tasks for the Team
    else if (tasks && projectDisplay === 0){
      tasksList = tasks.map((task, i) => {
        if (task.parent_task_id) {
          return;
        }
        else{
          return (
            <li
              id={ task.id }
              key={i}>

              <div className={ task.completed ?
                  'checkmark-done' : 'checkmark-not-done'}>L</div>
              <input
                id={ task.id }
                onClick={ this.handleTaskClick }
                value={ this.state[task.id] }></input>
            </li>
          );
        }
      });

      return <ul>{ tasksList }</ul>;
    }
    //If projectDisplay !== 0 or !== -1 filter specific tasks by
    //project selected
    else if (projectDisplay !== 0 && projectDisplay !== -1){
      const projectTasks = [];
      this.props.tasks.forEach(task => {
        if (task.project_id === projectDisplay) {
          projectTasks.push(task);
        }
      });

      tasksList = projectTasks.map((task, i) => {
        if (task.parent_task_id) {
          return;
        }
        else {
          return (
            <li
              id={ task.id }
              key={i}>

              <div className={ task.completed ?
                  'checkmark-done' : 'checkmark-not-done'}>L</div>
              <input
                id={ task.id }
                onClick={ this.handleTaskClick }
                value={ task.title ? task.title : '' }></input>
            </li>
          );
        }

      });

      return <ul>{ tasksList }</ul>;
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

        { this.state.taskDetailIsOpen ? <TasksDetailContainer toggle={this.closeDetail} /> : null }
      </div>
    );
  }
}
