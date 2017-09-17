# == Schema Information
#
# Table name: user_projects
#
#  id         :integer          not null, primary key
#  member_id  :integer          not null
#  project_id :integer          not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

require 'test_helper'

class UserProjectTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
