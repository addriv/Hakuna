# <img src="https://github.com/addriv/Hakuna/blob/master/app/assets/images/favicon.ico" width="48px"> Hakuna

Live version: [Hakuna](https://hakuna-.herokuapp.com)

## Overview

Hakuna is a clone of Asana, a team productivity tool designed to help manage projects and tasks within organizations.

<p align="center">
  <img src="https://github.com/addriv/Hakuna/blob/master/app/assets/images/overview.gif" width="600">
</p>

## Features

* User Authentication
  * Hakuna uses `BCrypt` gem to allow users to create new secure accounts
* Teams
  * Users are able to create teams for other users to join
  <p align="center">
    <img src="https://github.com/addriv/Hakuna/blob/master/app/assets/images/teams.gif" width="600">
  </p>

* Projects
  * Users can create, update, delete projects within a team
  <p align="center">
    <img src="https://github.com/addriv/Hakuna/blob/master/app/assets/images/projects.gif" width="600">
  </p>

* Tasks
  * Users can create, update, delete, assign tasks to other users.
  <p align="center">
    <img src="https://github.com/addriv/Hakuna/blob/master/app/assets/images/tasks.gif" width="600">
  </p>


## Implementation

* Backend: Ruby on Rails
* Database: PostgreSQL
* Frontend: React/Redux

## Future Features

* Mailer to invite other users to team
* Private projects and tasks
* Calendar
* Task comments
