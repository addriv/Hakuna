# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20170927183354) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "projects", force: :cascade do |t|
    t.string "name", null: false
    t.string "description"
    t.boolean "public", default: true, null: false
    t.integer "lead_id", null: false
    t.integer "team_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["lead_id"], name: "index_projects_on_lead_id"
    t.index ["name", "team_id", "lead_id"], name: "index_projects_on_name_and_team_id_and_lead_id", unique: true
    t.index ["team_id"], name: "index_projects_on_team_id"
  end

  create_table "tasks", force: :cascade do |t|
    t.string "title"
    t.string "description"
    t.boolean "public", default: true
    t.boolean "completed", default: false
    t.datetime "due_date"
    t.integer "creator_id", null: false
    t.integer "assignee_id"
    t.integer "project_id"
    t.integer "parent_task_id"
    t.integer "team_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["assignee_id"], name: "index_tasks_on_assignee_id"
    t.index ["creator_id"], name: "index_tasks_on_creator_id"
    t.index ["parent_task_id"], name: "index_tasks_on_parent_task_id"
    t.index ["project_id"], name: "index_tasks_on_project_id"
    t.index ["team_id"], name: "index_tasks_on_team_id"
  end

  create_table "teams", force: :cascade do |t|
    t.string "name", null: false
    t.integer "lead_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["name", "lead_id"], name: "index_teams_on_name_and_lead_id", unique: true
  end

  create_table "user_projects", force: :cascade do |t|
    t.integer "member_id", null: false
    t.integer "project_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["member_id", "project_id"], name: "index_user_projects_on_member_id_and_project_id", unique: true
  end

  create_table "user_teams", force: :cascade do |t|
    t.integer "member_id", null: false
    t.integer "team_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["member_id", "team_id"], name: "index_user_teams_on_member_id_and_team_id", unique: true
  end

  create_table "users", force: :cascade do |t|
    t.string "name", null: false
    t.string "email", null: false
    t.string "password_digest", null: false
    t.string "session_token", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["session_token"], name: "index_users_on_session_token", unique: true
  end

end
