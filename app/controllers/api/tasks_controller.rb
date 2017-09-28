class Api::TasksController < ApplicationController
  def create
    @task = Task.new(task_params)
    @task.creator_id = current_user.id

    if @task.save
      render :show
    else
      render json: @task.errors.full_messages, status: 422
    end
  end

  def update
    @task = Task.find_by_id(params[:id])
    @team = current_user.teams.find_by_id(@task.team_id)
    @project = current_user.projects.find_by_id(@task.project_id)

    # If task is public and the user is on the team
    # Or if the task isn't public but the user is on the project
    if (@task.public && @team) || (!@task.public && @project)
      if @task.update_attributes(task_params)
        render :show
      else
        render json: @task.errors.full_messages, status: 422
      end
    else
      render json: [ 'Task not found' ], status: 404
    end
  end

  def destroy
    # Allow user to destroy only if the task is either created by them,
    # or they are in that team and task is public
    # or task is not public but they are on that project
    @task = Task.find_by_id(params[:id])
    @team = current_user.teams.find_by_id(@task.id)
    @project = current_user.projects.find_by_id(@task.project_id)

    if @task.creator == current_user || (@task.public && @team) || @project
      @task.destroy
      render :show
    else
      render json: [ 'Task not found' ], status: 404
    end
  end

  private

  def task_params
    params.require(:task).permit(
      :title, :description, :public, :completed, :due_date, :creator_id,
      :assignee_id, :project_id, :parent_task_id, :team_id)
  end
end
