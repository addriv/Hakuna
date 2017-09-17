# Database Schema

## `users`
| column name       | data type | details                   |
|:------------------|:---------:|:--------------------------|
| `id`              | integer   | not null, primary key     |
| `name`            | string    | not null                  |
| `email`           | string    | not null, indexed, unique |
| `password_digest` | string    | not null                  |
| `session_token`   | string    | not null, indexed, unique |
| `created_at`      | datetime  | not null                  |
| `updated_at`      | datetime  | not null                  |

## `teams`
| column name          | data type | details                        |
|:---------------------|:---------:|:-------------------------------|
| `id`                 | integer   | not null, primary key          |
| `name`               | string    | not null                       |
| `lead_id`            | integer   | not null, indexed, foreign key |                      |
| `created_at`         | datetime  | not null                       |
| `updated_at`         | datetime  | not null                       |

+ `lead_id` references `users`  
+ index on `[:name, :lead_id], unique: true`

## `user_teams`
| column name       | data type | details                        |
|:------------------|:---------:|:-------------------------------|
| `id`              | integer   | not null, primary key          |
| `member_id`       | integer   | not null, indexed, foreign key |
| `team_id`         | integer   | not null, indexed, foreign key |
| `created_at`      | datetime  | not null                       |
| `updated_at`      | datetime  | not null                       |

+ `member_id` references `users`  
+ `team_id` references `teams`
+ index on `[:member_id, :team_id], unique: true`

## `projects`
| column name          | data type | details                        |
|:---------------------|:---------:|:-------------------------------|
| `id`                 | integer   | not null, primary key          |
| `name`               | string    | not null                       |
| `description`        | string    |                                |
| `public`             | boolean   | not null, default true         |
| `lead_id`            | integer   | not null, indexed, foreign key |
| `team_id`            | integer   | not null, indexed, foreign key |
| `created_at`         | datetime  | not null                       |
| `updated_at`         | datetime  | not null                       |

+ `lead_id` references `users`  
+ `team_id` references `teams`
+ index on `:team_id, :lead_id`
+ index on `[:name, :team_id, :lead_id], unique: true`


## `user_projects`
| column name       | data type | details                        |
|:------------------|:---------:|:-------------------------------|
| `id`              | integer   | not null, primary key          |
| `member_id`       | integer   | not null, indexed, foreign key |
| `project_id`      | integer   | not null, indexed, foreign key |
| `created_at`      | datetime  | not null                       |
| `updated_at`      | datetime  | not null                       |

+ `member_id` references `users`  
+ `project_id` references `projects`
+ index on `[:member_id, :project_id], unique: true`


## `tasks`
| column name          | data type | details                        |
|:---------------------|:---------:|:-------------------------------|
| `id`                 | integer   | not null, primary key          |
| `title`              | string    | not null                       |
| `description`        | string    |                                |
| `public`             | boolean   | default: true                  |
| `completed`          | boolean   | default: false                 |
| `due_date`           | datetime  |                                |
| `creator_id`         | integer   | not null, indexed, foreign key |
| `assignee_id`        | integer   | indexed, foreign key           |
| `project_id`         | integer   | not null, indexed, foreign key |
| `parent_task_id`     | integer   | indexed, foreign key           |
| `team_id`            | integer   | not null, indexed, foreign key |
| `created_at`         | datetime  | not null                       |
| `updated_at`         | datetime  | not null                       |

+ `creator_id` references `users`
+ `assignee_id` references `users`
+ `project_id` references `projects`
+ `parent_task_id` references `tasks`
+ `team_id` references `teams`
+ index on `:creator_id, :assignee_id, :project_id, :parent_task_id, :team_id`
