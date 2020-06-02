class ProfilesController < ApplicationController
  
  #GET request to /users/:user_id/profile/new
  def new
    # Render blank profiles details form
    @profile = Profile.new
  end
  
  #POST to /users/:user_id/profile/
  def create
    #ensure that we have the user who is filling out form
    @user = User.find( params[:user_id] )
    #create profile linked to that specific user
    @profile = @user.build_profile( profile_params )
    if @profile.save
      flash[:success] = "Profile Updated!"
      redirect_to root_path
    else
      render action :new
    end
    
  end
  
  private
    def profile_params
      params.require(:profile).permit(:first_name, :last_name, :job_title, :phone_number, :contact_email, :d)
    end
end
