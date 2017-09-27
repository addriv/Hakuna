# == Schema Information
#
# Table name: projects
#
#  id          :integer          not null, primary key
#  name        :string           not null
#  description :string
#  public      :boolean          default(TRUE), not null
#  lead_id     :integer          not null
#  team_id     :integer          not null
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#

class Project < ApplicationRecord
  validates :name, :lead_id, presence: true
  validates :public, inclusion: { in: [true, false] }

  belongs_to :lead, class_name: :User
  belongs_to :team
  has_many :tasks, dependent: :destroy
  has_many :user_projects, class_name: :UserProject
  has_many :members, through: :user_projects, source: :member
end
