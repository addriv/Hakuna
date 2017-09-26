class Api::ProjectsController < ApplicationController
  def create
    @project = Project.new(project_params)
    @project.lead_id = current_user.id

    if @project.save
      UserProject.create(member_id: current_user.id, project_id: @project.id)

      render :show
    else
      render json: @project.errors.full_messages, status: 422
    end
  end

  private

  def project_params
    params.require(:project).permit(
      :name, :description, :public, :lead_id, :team_id)
  end
end
