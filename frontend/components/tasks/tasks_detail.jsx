import React from 'react';

const shortDate = date => {
  let month = date.getMonth() + 1;
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
    this.state.deleteIsOpen = false;
    this.state.assigneeIsOpen = false;
    this.tryToggle = this.tryToggle.bind(this);
    this.handleTitle = this.handleTitle.bind(this);
    this.handleOnBlur = this.handleOnBlur.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.toggleComplete = this.toggleComplete.bind(this);
    this.startDelete = this.startDelete.bind(this);
    this.confirmDelete = this.confirmDelete.bind(this);
    this.cancelDelete = this.cancelDelete.bind(this);
    this.toggleAssignee = this.toggleAssignee.bind(this);
    this.handleAssignee = this.handleAssignee.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
    this.setWrapperRef = this.setWrapperRef.bind(this);
  }

  componentDidMount(){
    document.addEventListener('mousedown', this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside);
  }

  handleClickOutside(event){
    const modalElement = document.getElementsByClassName('ReactModal__Overlay');

    if (
      this.wrapperRef
      && !this.wrapperRef.contains(event.target)
      && modalElement.length === 0) {
        this.setState({ assigneeIsOpen: false });
    }
  }

  setWrapperRef(node) {
    this.wrapperRef = node;
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
    this.setState({ deleteIsOpen: true });
  }

  cancelDelete(event){
    event.preventDefault();
    this.setState({ deleteIsOpen: false });
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

  toggleAssignee(event){
    event.preventDefault();
    this.setState({ assigneeIsOpen: !this.state.assigneeIsOpen });
  }

  assigneeDropdown(){
    const currentUser = this.props.state.session.currentUser;
    const teamMembers = this.props.state.entities.members;
    let membersArr;
    if (teamMembers){
      membersArr = [currentUser].concat(Object.values(teamMembers));
    }
    else {
      membersArr = [currentUser];
    }


    const membersli = membersArr.map((member, i) => (
      <button id={ member.id } key={i}
        onClick={ this.handleAssignee }>{ member.name }</button>
    ));

    membersli.push(
      <button
        id='0' key={-1} onClick={ this.handleAssignee }>Unassign</button>
    );

    return (
      <ul>
        { membersli }
      </ul>
    );
  }

  handleAssignee(event){
    event.preventDefault();
    let assigneeId = parseInt(event.target.id);
    assigneeId = assigneeId === 0 ? null : assigneeId;
    const update = { id: this.state.id, assignee_id: assigneeId };
    this.props.updateTask(update).then(
      () => this.setState({ assigneeIsOpen: false })
    );
  }

  render(){
    let project, projectInfo;
    const projectId = this.state.project_id;
    if (projectId) {
      project = this.props.state.entities.projects[projectId];
      projectInfo = (
        <div id='project-info'>
          <div id='project-name'>{ project.name }</div>
          <div id='project-spacer'></div>
        </div>
      );
    }
    const taskId = this.props.state.ui.taskDisplay;
    const task = this.props.state.entities.tasks[taskId];
    const createdDate = shortDate(new Date(task.created_at));
    const updatedDate = shortDate(new Date(task.updated_at));
    const assigneeId = this.state.assignee_id;
    const currentUserId = this.props.state.session.currentUser.id;
    const allMembers = Object.assign({}, this.props.state.entities.members);
    allMembers[currentUserId] = this.props.state.session.currentUser;
    const assignee = allMembers[assigneeId];

    return (
      <div className='tasks-detail'>
        <div id='header'>
          <div id='assignee' ref={ this.setWrapperRef }>
            <button
              id={ this.state.assigneeIsOpen ? 'opened' : 'closed' }
              onClick={ this.toggleAssignee }>

              { assigneeId ? assignee.name : 'Unassigned' }
            </button>

            { this.state.assigneeIsOpen ? this.assigneeDropdown() : null }
          </div>

          <button id='delete'
            onClick={ this.startDelete }>Delete</button>

          <button id='close' onClick={ this.tryToggle }>x</button>
        </div>

        { this.state.deleteIsOpen ? this.deleteMessageContent() : null }

        { projectInfo }

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
