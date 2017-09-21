class Api::UserTeamsController < ApplicationController
  def destroy
    @user_team = current_user.user_teams.find_by_id(params[:id])
    if @user_team
      
    else

    end
  end


end
