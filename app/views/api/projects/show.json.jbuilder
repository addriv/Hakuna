json.set! 'projects' do
  json.set! @project.id do
    json.extract! @project, :id, :name, :description, :public, :lead_id, :team_id
  end
end
