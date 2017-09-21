json.set! @team.id do
  json.extract! @team, :id, :name, :lead_id
end
