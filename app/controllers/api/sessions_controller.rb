class Api::SessionsController < ApplicationController
  def create
    @user = User.find_by_credentials(
      user_params[:email],
      user_params[:password]
    )
    if @user
      login(@user)
      render :show
    else
      render json: ['Invalid credentials'], status: 404
    end
  end

  def destroy
    if current_user
      logout!
      render json: {}
    else
      render json: ['Not logged in'], status: 404
    end
  end

  private

  def user_params
    params.require(:user).permit(:email, :password)
  end
end
