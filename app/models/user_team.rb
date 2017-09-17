# == Schema Information
#
# Table name: user_teams
#
#  id         :integer          not null, primary key
#  member_id  :integer          not null
#  team_id    :integer          not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class UserTeam < ApplicationRecord
  validates :member_id, :team_id, presence: true

  belongs_to :member, class_name: :User

  belongs_to :team, class_name: :Team
end
