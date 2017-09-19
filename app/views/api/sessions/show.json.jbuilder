# user
json.set! 'user' do
  json.extract! @user, :id, :name, :email
end

# teams
json.teams do
  @teams.each do |team|
    json.set! team.id do
      json.extract! team, :id, :name, :lead_id
    end
  end
end
