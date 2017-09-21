class Api::TeamsController < ApplicationController
  def show
    @team = current_user.teams.find_by_id(params[:id])
    if @team
      render :team
    else
      render json: [ 'No team found' ], status: 404
    end
  end

  def index
    @teams = current_user.teams
    render :index
  end

  def create
    @team = Team.new(team_params)
    @team.lead_id = current_user.id

    if @team.save
      @user_team = UserTeam.create!(member_id: current_user.id, team_id: @team.id)
      render :create
    else
      render json: @team.errors.full_messages, status: 422
    end

  end

  private

  def team_params
    params.require(:team).permit(:id, :name)
  end
end
