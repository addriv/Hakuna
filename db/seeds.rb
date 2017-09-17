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

#Seed tables with test data
#users
user1 = User.create!(name: "Adrian Rivero", email: "adrivero89@yahoo.com", password: "testtest")

#teams
team1 = Team.create!(name: "Fullstack", lead_id: user1.id)

#user_teams
user_team1 = UserTeam.create(member_id: user1.id, team_id: team1.id)

#projects
project1 = Project.create!(name: "Proposal", description: "Proposal for project planning", lead_id: user1.id, team_id: team1.id )

#user_projects
user_project1 = UserProject.create(member_id: user1.id, project_id: project1.id)

#tasks
task1 = Task.create!(title: "MVP List", creator_id: user1.id, project_id: project1.id, team_id: team1.id)
task2 = Task.create!(title: "Four Features", creator_id: user1.id, assignee_id: user1.id, project_id: project1.id, team_id: team1.id, parent_task_id: task1.id)
