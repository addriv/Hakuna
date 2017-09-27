# == Schema Information
#
# Table name: users
#
#  id              :integer          not null, primary key
#  name            :string           not null
#  email           :string           not null
#  password_digest :string           not null
#  session_token   :string           not null
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#

class User < ApplicationRecord
  validates :name,
            :email,
            :session_token,
            :password_digest,
            presence: true

  validates :email, :session_token, uniqueness: true
  validates :password, length: { minimum: 6, allow_nil: true }

  has_many :teams_led, foreign_key: :lead_id, class_name: :Team
  has_many :user_teams, foreign_key: :member_id, class_name: :UserTeam
  has_many :teams, through: :user_teams, source: :team
  has_many :user_projects, foreign_key: :member_id, class_name: :UserProject
  has_many :projects_led, foreign_key: :lead_id, class_name: :Project
  has_many :projects, through: :user_projects, source: :project
  has_many :created_tasks, foreign_key: :creator_id, class_name: :Task
  has_many :assigned_tasks, foreign_key: :assignee_id, class_name: :Task

  attr_reader :password

  after_initialize :ensure_session_token!

  def password=(password)
    self.password_digest = BCrypt::Password.create(password)
  end

  def is_password?(password)
    @password = password
    BCrypt::Password.new(self.password_digest).is_password?(password)
  end

  def generate_session_token
    SecureRandom.urlsafe_base64
  end

  def ensure_session_token!
    self.session_token ||= generate_session_token
  end

  def reset_session_token!
    self.session_token = generate_session_token
    until self.save
      self.session_token = generate_session_token
    end
    self.session_token
  end

  def self.find_by_credentials(email, password)
    user = User.find_by_email(email)
    user && user.is_password?(password) ? user : nil
  end

end
