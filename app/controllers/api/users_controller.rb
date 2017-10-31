class Api::UsersController < ApplicationController
  def create
    @user = User.new(user_params)
    if @user.save
      # REMOVE ALL THIS AFTER IMPLEMENTING FORCED TEAM MODAL
      @team = Team.create(name: 'New Team', lead_id: @user.id)
      UserTeam.create(member_id: @user.id, team_id: @team.id)
      UserTeam.create(member_id: 2, team_id: @team.id)
      UserTeam.create(member_id: 3, team_id: @team.id)
      UserTeam.create(member_id: 4, team_id: @team.id)
      UserTeam.create(member_id: 5, team_id: @team.id)
      @project = Project.create(name: 'New Project', lead_id: @user.id, team_id: @team.id)
      UserProject.create(member_id: @user.id, project_id: @project.id)
      Task.create(title: 'This is the tasks list', creator_id: @user.id, completed: true, project_id: @project.id, team_id: @team.id)
      Task.create(title: 'Click Add Task to Add More', creator_id: @user.id, project_id: @project.id , team_id: @team.id)
      Task.create(title: 'New Tasks Go Here', creator_id: @user.id, completed: true, project_id: @project.id , team_id: @team.id)
      Task.create(title: '<---- Click Check to Mark Complete', creator_id: @user.id, project_id: @project.id , team_id: @team.id)
      Task.create(title: 'Click each task to view details', creator_id: @user.id, completed: true, project_id: @project.id , team_id: @team.id)
      Task.create(title: 'You can assign other users to each task', creator_id: @user.id, project_id: @project.id , team_id: @team.id)
      Task.create(title: 'Add a Task Description in the Details', creator_id: @user.id, completed: true, project_id: @project.id , team_id: @team.id)
      # REMOVE ALL THIS AFTER IMPLEMENTING FORCED TEAM MODAL

      login(@user)
      render :show
    else
      render json: @user.errors.full_messages, status: 422
    end
  end

  private

  def user_params
    params.require(:user).permit(:email, :name, :password)
  end

  def create_demo_team

  end
end
