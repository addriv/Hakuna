class Api::TeamsController < ApplicationController
  def show
    @team = Team.find_by_id(params[:id])
    render :team
  end

  private

  def team_params
    params.require(:team).permit(:id)
  end
end
