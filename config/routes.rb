Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root to: 'static_pages#root'

  namespace :api, defaults: { format: :json } do
    resources :users, only: [:create]

    resources :teams, only: %i(create show index update) do
      resources :projects, only: %i(create update destroy)
    end

    resource :sessions, only: %i(create destroy)

    resources :tasks, only: %i(index show create update destroy)

    resources :user_teams, only: %i(destroy)
  end
end
