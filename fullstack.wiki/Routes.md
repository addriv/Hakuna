# Routes

## API Endpoints

### `users`
+ `POST /api/users` - sign up

### `teams`
+ `POST /api/teams` - returns the team information after creating new team

### `projects`
+ `POST /api/teams/:team_id/projects` - creates a new project
+ `PATCH /api/teams/:team_id/project/:id` - updates project
+ `DELETE /api/teams/:team_id/project/:id` - deletes project

### `tasks`
+ `GET /api/tasks/` - returns all public tasks within a team
+ `GET /api/tasks/:id` - returns a task
+ `POST /api/tasks/` - creates a new task
+ `PATCH /api/tasks/:id` - updates a task
+ `DELETE /api/tasks/:id` - updates a task

---

## Frontend Routes
+ `/#/login`
+ `/#/signup`
+ `/#/newTeam` - new team form only rendered for new user with no teams
+ `/#/dashboard/list` - main dashboard defaults to tasks index
+ `/#/dashboard/list/:taskId` - task form with new or pre-filled data
