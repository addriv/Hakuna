# <img src="https://github.com/addriv/Hakuna/blob/master/app/assets/images/favicon.ico" width="48px"> Hakuna

Live version: [Hakuna](https://hakuna-app.herokuapp.com)

## Overview

Hakuna is a clone of Asana, a team productivity tool designed to help manage projects and tasks within organizations.

**Technologies**
* **Frontend**: React, Redux, JavaScript
* **Backend**: Ruby on Rails
* **Database**: PostgreSQL

<p align="center">
  <img src="https://github.com/addriv/Hakuna/blob/master/app/assets/images/overview.gif" width="600">
</p>

## Features

* **User Authentication**
  * Hakuna uses `BCrypt` gem to allow users to create new secure accounts

* **Teams**
  * Users are able to create teams for other users to join
  <p align="center">
    <img src="https://github.com/addriv/Hakuna/blob/master/app/assets/images/teams.gif" width="600">
  </p>

* **Projects**
  * Users can create, update, delete projects within a team
  <p align="center">
    <img src="https://github.com/addriv/Hakuna/blob/master/app/assets/images/projects.gif" width="600">
  </p>

* **Tasks**
  * Users can create, update, delete, assign tasks to other users.
  <p align="center">
    <img src="https://github.com/addriv/Hakuna/blob/master/app/assets/images/tasks.gif" width="600">
  </p>

* **Filters**
  * Tasks can be filtered by assignee by clicking the team member's icon in the sidebar.
  <p align="center">
    <img src="https://github.com/addriv/Hakuna/blob/master/app/assets/images/filters.gif" width="600">
  </p>

## Implementation

One of the challenges faced when creating Hakuna was keeping the Tasks Detail(tasks_detail.jsx) component in sync with the Tasks Index component(tasks_index.jsx). 

To keep the two components synced with controlled React inputs, the event handlers and the local state of the Tasks Index component was passed down to the Tasks Detail's props. This ensured that the Tasks Detail component's task title and task completion status always matched the index component. 

````js
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
````
To limit minimize the amount of AJAX requests to the API when selecting tasks, update requests are only sent after an input is changed within the tasks components. 

To do this, the update function which sent the request to the application API was added as an onBlur event. This event was only added after an input is changed and then removed after the onBlur event occurs.

````js
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
````

## Future Features

* Mailer to invite other users to team
* Private projects and tasks
* Calendar
* Task comments
