class ProfilesController < ApplicationController
  
  #GET request to /users/:user_id/profile/new
  def new
    # Render blank profiles details form
    @profile = Profile.new
  
  end
end