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

  def update
    @project = current_user.projects_led.find_by_id(params[:id])

    if @project && @project.update_attributes(project_params)
      render :show
    elsif !@project
      render json: [ 'No project found' ], status: 404
    else
      render json: @project.errors.full_messages, status: 422
    end
  end

  def destroy
    @project = current_user.projects_led.find_by_id(params[:id])

    if @project && @project.destroy
      render :show
    else
      render json: [ 'No project found' ], status: 404
    end
  end

  private

  def project_params
    params.require(:project).permit(
      :name, :description, :public, :lead_id, :team_id)
  end
end
