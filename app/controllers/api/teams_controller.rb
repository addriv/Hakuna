class Api::TeamsController < ApplicationController
  def show
    @team = current_user.teams.find_by_id(params[:id])
    if @team
      render :team
    else
      render json: @team.errors.full_messages, status: 404
    end
  end

  def index
    @teams = current_user.teams
    render :index
  end

  private

  def team_params
    params.require(:team).permit(:id)
  end
end
