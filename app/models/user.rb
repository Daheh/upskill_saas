class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

  belongs_to :plan
  has_one :profile

  attr_accessor :stripe_card_token

  # save the user with a stripe customer token
  # if pro user passed validations, then call Stripe to set up a subscription
  # upon charging a custumer card. Stripe respond back with customer data
  # store customer.id as the customer token and save the user. plan_id
  def save_with_subscription
    if valid?
      customer = Stripe::Customer.create(description: email,
                                         plan: plan.apiid,
                                         card: stripe_card_token)
      self.stripe_customer_token = customer.id
      save!
    end
  end
end