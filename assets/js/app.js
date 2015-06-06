var main = function() {
  /* call single page nav */
  $('.learn-more-btn').singlePageNav;

  /* Google analytics event listeners */
	$('#singleSessionSignup').on('click', function() {
	  ga('send', 'event', 'buyButton', 'click', 'singleSession', 35);
	});
	
	$('#fivePackSignup').on('click', function() {
	  ga('send', 'event', 'buyButton', 'click', 'fivePack', 150);
	});

	$('#customSignup').on('click', function() {
	  ga('send', 'event', 'buyButton', 'click', 'customSession', 200);
	});
	
	$('#ss-submit').on('click', function() {
		ga('send', 'event', 'buyButton', 'click', 'formComplete');
	});
	
	$('#share_fb').on('click', function() {
		ga('send', 'event', 'share', 'click', 'fb');
	});

	$('#share_tw').on('click', function() {
		ga('send', 'event', 'share', 'click', 'tw');
	});

	$('#share_li').on('click', function() {
		ga('send', 'event', 'share', 'click', 'li');
	});

	$('#share_em').on('click', function() {
		ga('send', 'event', 'share', 'click', 'em');
	});


	/* Field validations and saving data to Parse */
	$('#ss-form').submit(function(e){
		console.log('Submit');
		
		Parse.initialize("lv8wq9RY8eZx0Hyevu8PaMVOTDHcH5JTYYpFsX6Z", "x9MWoecCxDBaBqp5FAc7W9kiLJFTHJg1vKY3DFfV");
		var FormObject = Parse.Object.extend("FormObject");
		var formObject = new FormObject();

		var schoolList = [];
		$(':checkbox:checked').each(function(i){
			if ($(this).val() == 'other_option') {
				schoolList[i] = $('#schoolOther_other_option_response').val();
			} else {
				schoolList[i] = $(this).val();
			}
		});

		$('#schoolList').val(schoolList);

		/* Check required fields have been completed */
		if ($('#firstName').val() == "") {
			console.log('firstName was empty');
			$('#firstName').focus();
			$('#firstNameErrorMessage').html("<span>This is a required field</span>");
			e.preventDefault();
		} else if ($('#lastName').val() == "") {
			console.log('lastName was empty');
			$('#lastName').focus();
			$('#lastNameErrorMessage').html("<span>This is a required field</span>");
			e.preventDefault();
		} else if ($('#email').val().indexOf('@') == -1) {
			console.log('email did not have @ symbol in it');
			$('#email').focus();
			$('#emailErrorMessage').html("<span>This is a required field</span>");
			e.preventDefault();
		} else if (schoolList.length == 0) {
			console.log('No schools selected');
			$('#schoolErrorMessage').html("<span>This is a required field</span>");
			e.preventDefault();
		} else {
			e.preventDefault();
			console.log('All fields were okay');

			formObject.save({
				firstName: $('input[name=firstName]').val(),
				lastName: $('input[name=lastName]').val(),
				email: $('input[name=email]').val(),
				schoolList: schoolList
			}, {
				success: function(formObject) {
					// form was saved successfully
					console.log("save successful");
					window.location.href = "thank-you-prospective.html";
				},
				error: function(formObject, error) {
					// form was not saved
					console.log(error);	
				}
			});
		};
	});
	
	/* Error message clearers */
	$('.ss-q-short').click(function(){
		$('.error-message').html("<span></span>");
	});

	$('.ss-q-checkbox').click(function(){
		$('.error-message').html("<span></span>");
	});		

};


$(document).ready(main);