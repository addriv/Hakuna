class CreateTasks < ActiveRecord::Migration[5.1]
  def change
    create_table :tasks do |t|
      t.string :title, null: false
      t.string :description
      t.boolean :public, default: true
      t.boolean :completed, default: false
      t.datetime :due_date
      t.integer :creator_id, null: false
      t.integer :assignee_id
      t.integer :project_id, null: false
      t.integer :parent_task_id
      t.integer :team_id, null: false
      t.timestamps
    end

    add_index :tasks, :creator_id
    add_index :tasks, :assignee_id
    add_index :tasks, :project_id
    add_index :tasks, :parent_task_id
    add_index :tasks, :team_id
  end
end
