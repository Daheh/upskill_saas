/* global $, Stripe */
//Document ready
  $(document).on('turbolinks:load', function(){
  var theForm = $('#pro_form');
  var submitBtn = $('#form-submit-btn');
  //Set Stripe public key
  Stripe.setPublishableKey( $('meta[name="stripe-key"]').attr('content') )
  
  //when user click form submit btn
  submitBtn.click(function(event){
    //prevent default submission behavior
    event.preventDefault();
    
    //collect cc field
    var ccNum = $('#card_number').val(),
        cvcNum = $('#card_code').val(),
        expMonth =$('#card_month').val(),
        expYear = $('#card_year').val();
        
    //send the cc field to stripe
    Stripe.createToken({
      number: ccNum,
      cvc: cvcNum,
      exp_month: expMonth,
      exp_year: expYear
    }, stripeResponseHandler);
    
  });
  

  //stripe will give back a card token
  //inject card token as hidden field into form
  //submit form to our rails app


});