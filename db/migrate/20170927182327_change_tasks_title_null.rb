class ChangeTasksTitleNull < ActiveRecord::Migration[5.1]
  def change
    change_column_null :tasks, :title, :true
  end
end
