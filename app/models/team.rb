# == Schema Information
#
# Table name: teams
#
#  id         :integer          not null, primary key
#  name       :string           not null
#  lead_id    :integer          not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class Team < ApplicationRecord
  validates :name, :lead_id, presence: true
  validates :name, uniqueness: { scope: :lead_id }

  belongs_to :lead, class_name: :User
  has_many :user_teams, class_name: :UserTeam
  has_many :projects
  has_many :members, through: :user_teams, source: :member
  has_many :tasks

  private

  def team_params
    para.require(:team).permit(:name)
  end
end
