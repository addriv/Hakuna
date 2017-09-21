class Api::UserTeamsController < ApplicationController
  def destroy
    @user_team = current_user.user_teams.find_by_team_id(params[:id])
    if @user_team
      @user_team.destroy
      render :destroy
    else
      render json: [ 'No team found for user' ], status: 404
    end
  end

  private

  def user_team_params
    params.require(:team).permit(:id, :name, :lead_id)
  end
end
