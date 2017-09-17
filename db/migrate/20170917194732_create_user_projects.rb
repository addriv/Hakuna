class CreateUserProjects < ActiveRecord::Migration[5.1]
  def change
    create_table :user_projects do |t|
      t.integer :member_id, null: false
      t.integer :project_id, null: false
      t.timestamps
    end

    add_index :user_projects, [:member_id, :project_id], unique: true
  end
end
