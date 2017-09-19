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
user1 = User.create!(name: "John Doe", email: "demo@email.com", password: "demo123")
user2 = User.create!(name: "Jane Doe", email: "demo1@email.com", password: "demo123")
user3 = User.create!(name: "Jonathan Doe", email: "demo2@email.com", password: "demo123")
user4 = User.create!(name: "Janine Doe", email: "demo3@email.com", password: "demo123")

#teams
team1 = Team.create!(name: "Fullstack", lead_id: user1.id)
team2 = Team.create!(name: "Flex", lead_id: user1.id)
team3 = Team.create!(name: "JavaScript", lead_id: user1.id)
team4 = Team.create!(name: "Portfolio", lead_id: user1.id)

#user_teams
user_team1 = UserTeam.create(member_id: user1.id, team_id: team1.id)
user_team2 = UserTeam.create(member_id: user1.id, team_id: team2.id)
user_team3 = UserTeam.create(member_id: user1.id, team_id: team3.id)
user_team4 = UserTeam.create(member_id: user1.id, team_id: team4.id)
user_team5 = UserTeam.create(member_id: user2.id, team_id: team1.id)
user_team6 = UserTeam.create(member_id: user3.id, team_id: team1.id)
user_team7 = UserTeam.create(member_id: user4.id, team_id: team1.id)
user_team8 = UserTeam.create(member_id: user3.id, team_id: team2.id)
user_team9 = UserTeam.create(member_id: user4.id, team_id: team2.id)

#projects
project1 = Project.create!(name: "Proposal", description: "Proposal for project planning", lead_id: user1.id, team_id: team1.id )
project2 = Project.create!(name: "User Auth", description: "Do auth", lead_id: user1.id, team_id: team1.id )
project3 = Project.create!(name: "Dashboard", description: "Setup dashboard and styling", lead_id: user1.id, team_id: team1.id )
project4 = Project.create!(name: "Team", description: "Finish team add features", lead_id: user1.id, team_id: team2.id )
project5 = Project.create!(name: "Projects", description: "Proposal for project planning", lead_id: user1.id, team_id: team2.id )
project6 = Project.create!(name: "Tasks", description: "Proposal for project planning", lead_id: user1.id, team_id: team2.id )

#user_projects
user_project1 = UserProject.create(member_id: user1.id, project_id: project1.id)
user_project2 = UserProject.create(member_id: user1.id, project_id: project2.id)
user_project3 = UserProject.create(member_id: user1.id, project_id: project3.id)
user_project4 = UserProject.create(member_id: user1.id, project_id: project4.id)
user_project5 = UserProject.create(member_id: user1.id, project_id: project5.id)
user_project6 = UserProject.create(member_id: user1.id, project_id: project6.id)
user_project7 = UserProject.create(member_id: user2.id, project_id: project1.id)
user_project8 = UserProject.create(member_id: user2.id, project_id: project3.id)
user_project9 = UserProject.create(member_id: user2.id, project_id: project5.id)
user_project10 = UserProject.create(member_id: user3.id, project_id: project6.id)
user_project11 = UserProject.create(member_id: user3.id, project_id: project1.id)

#tasks
task1 = Task.create!(title: "Project 1 Task 1", creator_id: user1.id, project_id: project1.id, team_id: project1.team_id)
task2 = Task.create!(title: "Project 1 Task 2", creator_id: user1.id, project_id: project1.id, team_id: project1.team_id)
task3 = Task.create!(title: "Project 1 Task 3", creator_id: user1.id, project_id: project1.id, team_id: project1.team_id)
task4 = Task.create!(title: "Project 1 Task 4", creator_id: user1.id, project_id: project1.id, team_id: project1.team_id)
task5 = Task.create!(title: "Project 1 Task 5", creator_id: user1.id, project_id: project1.id, team_id: project1.team_id)
task6 = Task.create!(title: "Project 2 Task 1", creator_id: user1.id, project_id: project2.id, team_id: project2.team_id)
task7 = Task.create!(title: "Project 2 Task 2", creator_id: user1.id, project_id: project2.id, team_id: project2.team_id)
task8 = Task.create!(title: "Project 2 Task 3", creator_id: user1.id, project_id: project2.id, team_id: project2.team_id)
task9 = Task.create!(title: "Project 3 Task 1", creator_id: user1.id, project_id: project3.id, team_id: project1.team_id)
task10 = Task.create!(title: "Project 1 Task 1", creator_id: user2.id, project_id: project4.id, team_id: project4.team_id)
task11 = Task.create!(title: "Project 1 Task 2", creator_id: user2.id, project_id: project4.id, team_id: project4.team_id)
task12 = Task.create!(title: "Project 1 Task 3", creator_id: user2.id, project_id: project4.id, team_id: project4.team_id)
task13 = Task.create!(title: "Project 1 Task 4", creator_id: user2.id, project_id: project4.id, team_id: project4.team_id)
task14 = Task.create!(title: "Project 1 Task 5", creator_id: user2.id, project_id: project4.id, team_id: project4.team_id)
task15 = Task.create!(title: "Project 2 Task 1", creator_id: user2.id, project_id: project5.id, team_id: project5.team_id)
task16 = Task.create!(title: "Project 2 Task 2", creator_id: user2.id, project_id: project5.id, team_id: project5.team_id)
task17 = Task.create!(title: "Project 2 Task 3", creator_id: user2.id, project_id: project5.id, team_id: project5.team_id)
task18 = Task.create!(title: "Project 3 Task 1", creator_id: user2.id, project_id: project6.id, team_id: project6.team_id)
