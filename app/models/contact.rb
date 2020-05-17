class Contact < ApplicationRecord
  VALID_EMAIL_REGEX = /\A[\w+\-.]+@[a-z\d\-]+(\.[a-z\d\-]+)*\.[a-z]+\z/i
  validates :name,     presence: true
  validates :email,    presence: true,
                       format: { with: VALID_EMAIL_REGEX }
  validates :comments, presence: true
end