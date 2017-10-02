class Api::UsersController < ApplicationController
  def create
    @user = User.new(user_params)
    if @user.save
      # REMOVE ALL THIS AFTER IMPLEMENTING FORCED TEAM MODAL
      @team = Team.create(name: 'New Team', lead_id: @user.id)
      UserTeam.create(member_id: @user.id, team_id: @team.id)
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
end
