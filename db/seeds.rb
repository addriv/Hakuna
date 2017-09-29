# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

#Clear all records
User.destroy_all
Team.destroy_all
Project.destroy_all
Task.destroy_all

#Restart indexing on tables
ActiveRecord::Base.connection.execute("TRUNCATE TABLE users RESTART IDENTITY")
ActiveRecord::Base.connection.execute("TRUNCATE TABLE teams RESTART IDENTITY")
ActiveRecord::Base.connection.execute("TRUNCATE TABLE user_teams RESTART IDENTITY")
ActiveRecord::Base.connection.execute("TRUNCATE TABLE projects RESTART IDENTITY")
ActiveRecord::Base.connection.execute("TRUNCATE TABLE user_projects RESTART IDENTITY")
ActiveRecord::Base.connection.execute("TRUNCATE TABLE tasks RESTART IDENTITY")

User.create!([
  {name: "Andrew Reynolds", email: "demo@email.com", password: 'demo333'},
  {name: "John Smith", email: "demo1@email.com", password: 'demo000'},
  {name: "Cathy Foster", email: "demo2@email.com", password: 'demo111'},
  {name: "Rebecca Lee", email: "demo3@email.com", password: 'demo222'},
  {name: "Daniel Reed", email: "demo4@email.com", password: 'demo4'}
])

Team.create!([
  {name: "Engineering", lead_id: 1},
  {name: "Marketing", lead_id: 1},
  {name: "Recruiting", lead_id: 1},
  {name: "Sales", lead_id: 1}
])

Project.create!([
  {name: "Teams Feature", description: "Implementing Teams for Hakuna App", public: true, lead_id: 1, team_id: 1},
  {name: "Projects Feature", description: "Implementing Projects feature for Hakuna App", public: true, lead_id: 1, team_id: 1},
  {name: "Tasks Feature", description: "Implement Tasks feature for Hakuna App", public: true, lead_id: 1, team_id: 1},
  {name: "Dashboard Feature", description: "Implement Dashboard feature for Hakuna App", public: true, lead_id: 1, team_id: 1},
  {name: "User Authentication", description: "Implement User Authentication", public: true, lead_id: 1, team_id: 1},
  {name: "Additional Features", description: "Implement new features after finishing MVP", public: true, lead_id: 1, team_id: 1},
  {name: "Production Readiness", description: "Checklist to get app in production state", public: true, lead_id: 1, team_id: 1},
  {name: "Project 1", description: "", public: true, lead_id: 1, team_id: 2},
  {name: "Project 2", description: "", public: true, lead_id: 1, team_id: 2},
  {name: "Project 3", description: "", public: true, lead_id: 1, team_id: 2},
  {name: "Test Auth", description: "", public: true, lead_id: 2, team_id: 3},
  {name: "Test Team", description: "Proposal for project planning", public: true, lead_id: 2, team_id: 3},
  {name: "Test Dashboard", description: "Proposal for project planning", public: true, lead_id: 2, team_id: 3}
])
Task.create!([
  {title: "Team 2 Project 4 Task 1", description: nil, public: true, completed: false, due_date: nil, creator_id: 2, assignee_id: nil, project_id: 8, parent_task_id: nil, team_id: 2},
  {title: "Team 2 Project 4 Task 2", description: nil, public: true, completed: false, due_date: nil, creator_id: 2, assignee_id: nil, project_id: 8, parent_task_id: nil, team_id: 2},
  {title: "Team 2 Project 4 Task 3", description: nil, public: true, completed: false, due_date: nil, creator_id: 2, assignee_id: nil, project_id: 8, parent_task_id: nil, team_id: 2},
  {title: "Team 2 Project 4 Task 4", description: nil, public: true, completed: false, due_date: nil, creator_id: 2, assignee_id: nil, project_id: 8, parent_task_id: nil, team_id: 2},
  {title: "Team 2 Project 4 Task 5", description: nil, public: true, completed: false, due_date: nil, creator_id: 2, assignee_id: nil, project_id: 8, parent_task_id: nil, team_id: 2},
  {title: "Team 2 Project 5 Task 1", description: nil, public: true, completed: false, due_date: nil, creator_id: 2, assignee_id: nil, project_id: 9, parent_task_id: nil, team_id: 2},
  {title: "Team 2 Project 5 Task 2", description: nil, public: true, completed: false, due_date: nil, creator_id: 2, assignee_id: nil, project_id: 9, parent_task_id: nil, team_id: 2},
  {title: "Team 2 Project 5 Task 3", description: nil, public: true, completed: false, due_date: nil, creator_id: 2, assignee_id: nil, project_id: 9, parent_task_id: nil, team_id: 2},
  {title: "Team 2 Project 6 Task 1", description: nil, public: true, completed: false, due_date: nil, creator_id: 2, assignee_id: nil, project_id: 9, parent_task_id: nil, team_id: 2},
  {title: "Team 3 Project 7 Task 1", description: nil, public: true, completed: false, due_date: nil, creator_id: 1, assignee_id: nil, project_id: 9, parent_task_id: nil, team_id: 3},
  {title: "Team 3 Project 8 Task 1", description: nil, public: true, completed: false, due_date: nil, creator_id: 1, assignee_id: nil, project_id: 10, parent_task_id: nil, team_id: 3},
  {title: "Team 3 Project 9 Task 1", description: nil, public: true, completed: false, due_date: nil, creator_id: 1, assignee_id: nil, project_id: 10, parent_task_id: nil, team_id: 3},
  {title: "Tasks backend", description: nil, public: true, completed: false, due_date: nil, creator_id: 1, assignee_id: nil, project_id: 3, parent_task_id: nil, team_id: 1},
  {title: "Push to Heroku", description: nil, public: true, completed: true, due_date: nil, creator_id: 1, assignee_id: nil, project_id: 7, parent_task_id: nil, team_id: 1},
  {title: "New Team creation", description: nil, public: true, completed: true, due_date: nil, creator_id: 1, assignee_id: 1, project_id: 1, parent_task_id: nil, team_id: 1},
  {title: "Demo login", description: nil, public: true, completed: false, due_date: nil, creator_id: 1, assignee_id: 1, project_id: 5, parent_task_id: nil, team_id: 1},
  {title: "Update Team functionality", description: nil, public: true, completed: true, due_date: nil, creator_id: 1, assignee_id: 2, project_id: 1, parent_task_id: nil, team_id: 1},
  {title: "React routing", description: nil, public: true, completed: false, due_date: nil, creator_id: 1, assignee_id: 4, project_id: 5, parent_task_id: nil, team_id: 1},
  {title: "Projects Redux Loop", description: nil, public: true, completed: true, due_date: nil, creator_id: 1, assignee_id: 1, project_id: 2, parent_task_id: nil, team_id: 1},
  {title: "Projects backend", description: nil, public: true, completed: true, due_date: nil, creator_id: 1, assignee_id: 1, project_id: 2, parent_task_id: nil, team_id: 1},
  {title: "Projects smooth navigation", description: nil, public: true, completed: true, due_date: nil, creator_id: 1, assignee_id: 4, project_id: 2, parent_task_id: nil, team_id: 1},
  {title: "Sidebar component with Projects display", description: nil, public: true, completed: true, due_date: nil, creator_id: 1, assignee_id: nil, project_id: 4, parent_task_id: nil, team_id: 1},
  {title: "Filter by team member assigned tasks", description: nil, public: true, completed: true, due_date: nil, creator_id: 1, assignee_id: nil, project_id: 4, parent_task_id: nil, team_id: 1},
  {title: "Delete Task functionality", description: nil, public: true, completed: true, due_date: nil, creator_id: 1, assignee_id: 3, project_id: 3, parent_task_id: nil, team_id: 1},
  {title: "Update Task onBlur", description: nil, public: true, completed: true, due_date: nil, creator_id: 1, assignee_id: 2, project_id: 3, parent_task_id: nil, team_id: 1},
  {title: "New Task creation", description: nil, public: true, completed: true, due_date: nil, creator_id: 1, assignee_id: 1, project_id: 3, parent_task_id: nil, team_id: 1},
  {title: "Tasks Redux loop", description: nil, public: true, completed: true, due_date: nil, creator_id: 1, assignee_id: 4, project_id: 3, parent_task_id: nil, team_id: 1},
  {title: "Styling", description: nil, public: true, completed: true, due_date: nil, creator_id: 1, assignee_id: nil, project_id: 5, parent_task_id: nil, team_id: 1},
  {title: "Single page Dashboard", description: nil, public: true, completed: true, due_date: nil, creator_id: 1, assignee_id: nil, project_id: 4, parent_task_id: nil, team_id: 1},
  {title: "Comments", description: nil, public: true, completed: true, due_date: nil, creator_id: 1, assignee_id: nil, project_id: 6, parent_task_id: nil, team_id: 1},
  {title: "Signup component", description: nil, public: true, completed: true, due_date: nil, creator_id: 1, assignee_id: 1, project_id: 5, parent_task_id: nil, team_id: 1},
  {title: "Datepicker to set due date", description: nil, public: true, completed: false, due_date: nil, creator_id: 1, assignee_id: nil, project_id: 3, parent_task_id: nil, team_id: 1},
  {title: "Chat System", description: nil, public: true, completed: true, due_date: nil, creator_id: 1, assignee_id: nil, project_id: 6, parent_task_id: nil, team_id: 1},
  {title: "Calendar", description: nil, public: true, completed: true, due_date: nil, creator_id: 1, assignee_id: nil, project_id: 6, parent_task_id: nil, team_id: 1},
  {title: "Display Team members and icons", description: nil, public: true, completed: false, due_date: nil, creator_id: 1, assignee_id: nil, project_id: 4, parent_task_id: nil, team_id: 1},
  {title: "Login component", description: nil, public: true, completed: true, due_date: nil, creator_id: 1, assignee_id: nil, project_id: 5, parent_task_id: nil, team_id: 1},
  {title: "My Tasks button", description: nil, public: true, completed: false, due_date: nil, creator_id: 1, assignee_id: nil, project_id: 4, parent_task_id: nil, team_id: 1},
  {title: "Delete Team functionality", description: nil, public: true, completed: false, due_date: nil, creator_id: 1, assignee_id: 3, project_id: 1, parent_task_id: nil, team_id: 1},
  {title: "React component for menu dropdown", description: nil, public: true, completed: true, due_date: nil, creator_id: 1, assignee_id: 4, project_id: 1, parent_task_id: nil, team_id: 1},
  {title: "Subtasks", description: nil, public: true, completed: false, due_date: nil, creator_id: 1, assignee_id: nil, project_id: 6, parent_task_id: nil, team_id: 1},
  {title: "Remove loggers and debuggers", description: nil, public: true, completed: false, due_date: nil, creator_id: 1, assignee_id: nil, project_id: 7, parent_task_id: nil, team_id: 1},
  {title: "Exclude redux-loggger", description: nil, public: true, completed: false, due_date: nil, creator_id: 1, assignee_id: nil, project_id: 7, parent_task_id: nil, team_id: 1},
  {title: "Teams React modal components", description: nil, public: true, completed: false, due_date: nil, creator_id: 1, assignee_id: 1, project_id: 1, parent_task_id: nil, team_id: 1},
  {title: "Teams Redux loop", description: nil, public: true, completed: false, due_date: nil, creator_id: 1, assignee_id: 2, project_id: 1, parent_task_id: nil, team_id: 1},
  {title: "Teams styling", description: nil, public: true, completed: false, due_date: nil, creator_id: 1, assignee_id: 3, project_id: 1, parent_task_id: nil, team_id: 1},
  {title: "Teams backend ", description: nil, public: true, completed: true, due_date: nil, creator_id: 1, assignee_id: 4, project_id: 1, parent_task_id: nil, team_id: 1},
  {title: "Update Project functionality", description: nil, public: true, completed: true, due_date: nil, creator_id: 1, assignee_id: 4, project_id: 2, parent_task_id: nil, team_id: 1},
  {title: "New Project creation", description: nil, public: true, completed: false, due_date: nil, creator_id: 1, assignee_id: 4, project_id: 2, parent_task_id: nil, team_id: 1},
  {title: "Projects styling", description: nil, public: true, completed: false, due_date: nil, creator_id: 1, assignee_id: 3, project_id: 2, parent_task_id: nil, team_id: 1},
  {title: "Delete Project functionality", description: nil, public: true, completed: false, due_date: nil, creator_id: 1, assignee_id: 3, project_id: 2, parent_task_id: nil, team_id: 1},
  {title: "Projects React modal components ", description: nil, public: true, completed: false, due_date: nil, creator_id: 1, assignee_id: 1, project_id: 2, parent_task_id: nil, team_id: 1},
  {title: "Tasks Index React component", description: nil, public: true, completed: false, due_date: nil, creator_id: 1, assignee_id: 1, project_id: 3, parent_task_id: nil, team_id: 1},
  {title: "Tasks Detail React component", description: nil, public: true, completed: false, due_date: nil, creator_id: 1, assignee_id: 1, project_id: 3, parent_task_id: nil, team_id: 1},
  {title: "Remove minification warnings", description: nil, public: true, completed: true, due_date: nil, creator_id: 1, assignee_id: nil, project_id: 7, parent_task_id: nil, team_id: 1}
])

UserProject.create!([
  {member_id: 1, project_id: 1},
  {member_id: 1, project_id: 2},
  {member_id: 1, project_id: 3},
  {member_id: 1, project_id: 4},
  {member_id: 1, project_id: 5},
  {member_id: 1, project_id: 6},
  {member_id: 2, project_id: 1},
  {member_id: 2, project_id: 3},
  {member_id: 2, project_id: 5},
  {member_id: 3, project_id: 6},
  {member_id: 3, project_id: 1},
  {member_id: 1, project_id: 7},
  {member_id: 1, project_id: 8},
  {member_id: 1, project_id: 9},
  {member_id: 1, project_id: 10},
  {member_id: 1, project_id: 11},
  {member_id: 1, project_id: 12},
  {member_id: 1, project_id: 13}
])

UserTeam.create!([
  {member_id: 1, team_id: 1},
  {member_id: 1, team_id: 2},
  {member_id: 1, team_id: 3},
  {member_id: 1, team_id: 4},
  {member_id: 2, team_id: 1},
  {member_id: 3, team_id: 1},
  {member_id: 4, team_id: 1},
  {member_id: 3, team_id: 2},
  {member_id: 4, team_id: 2},
  {member_id: 5, team_id: 1}
])
