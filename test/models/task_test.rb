# == Schema Information
#
# Table name: tasks
#
#  id             :integer          not null, primary key
#  title          :string
#  description    :string
#  public         :boolean          default(TRUE)
#  completed      :boolean          default(FALSE)
#  due_date       :datetime
#  creator_id     :integer          not null
#  assignee_id    :integer
#  project_id     :integer
#  parent_task_id :integer
#  team_id        :integer          not null
#  created_at     :datetime         not null
#  updated_at     :datetime         not null
#

require 'test_helper'

class TaskTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
