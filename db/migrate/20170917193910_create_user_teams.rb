class CreateUserTeams < ActiveRecord::Migration[5.1]
  def change
    create_table :user_teams do |t|
      t.integer :member_id, null: false
      t.integer :team_id, null: false
      t.timestamps
    end

    add_index :user_teams, [:member_id, :team_id], unique: true
  end
end
