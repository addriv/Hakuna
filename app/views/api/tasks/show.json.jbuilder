json.set! 'tasks' do
  json.set! @task.id do
    json.extract! @task, :id, :title, :description, :assignee_id,
      :due_date, :parent_task_id, :project_id, :completed, :team_id,
      :created_at, :updated_at
  end
end
