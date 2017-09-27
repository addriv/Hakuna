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

  private

  def task_params
    params.require(:task).permit(
      :title, :description, :public, :completed, :due_date, :creator_id,
      :assignee_id, :project_id, :parent_task_id, :team_id)
  end
end
