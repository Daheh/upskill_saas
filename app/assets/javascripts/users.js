/* global $, Stripe */
//Document ready
  $(document).on('turbolinks:load', function(){
  var theForm = $('#pro_form');
  var submitBtn = $('#form-submit-btn');
  //Set Stripe public key
  Stripe.setPublishableKey( $('meta[name="stripe-key"]').attr('content') );
  
  //when user click form submit btn
  submitBtn.click(function(event){
    //prevent default submission behavior
    event.preventDefault();
    submitBtn.val("Processing").prop('disabled', true);
    //collect cc field
    var ccNum = $('#card_number').val(),
        cvcNum = $('#card_code').val(),
        expMonth =$('#card_month').val(),
        expYear = $('#card_year').val();

    //use js stripe lib to verify if errors.
    var error = false;
    
    if(!Stripe.card.validateCardNumber(ccNum)){
      error = true;
      alert('The credit card number appear to be invalid');
    }
    
    if(!Stripe.card.validateCVC(cvcNum)){
      error = true;
      alert('The cvc number appear to be invalid');
    }
    
    if(!Stripe.card.validateExpiry(expMonth, expYear)){
      error = true;
      alert('The expiration date appear to be invalid');
    }
    
    
    
    if (error){
      //if there are errors, do not send to stripe. 
      submitBtn.prop('disabled', false).val("Sign up");
    }
    else {
    
      //send the cc field to stripe
      Stripe.createToken({
        number: ccNum,
        cvc: cvcNum,
        exp_month: expMonth,
        exp_year: expYear
      }, stripeResponseHandler);
      return false;
    }
  });
  

  //stripe will give back a card token
  
  function stripeResponseHandler(status, response) {
    var token = response.id;
     
    //Inject the card token in a hidden field
    theForm.append( $('<input type="hidden" name="user[stripe_card_token]">').val(token) );
    
    //submit form to our rails app
    theForm.get(0).submit();
  }
  

});