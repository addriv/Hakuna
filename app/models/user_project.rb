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

class UserProject < ApplicationRecord
  validates :member_id, :project_id, presence: true

  belongs_to :member, class_name: :User

  belongs_to :project
end
