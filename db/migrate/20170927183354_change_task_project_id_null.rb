class ChangeTaskProjectIdNull < ActiveRecord::Migration[5.1]
  def change
    change_column_null :tasks, :project_id, :true
  end
end
