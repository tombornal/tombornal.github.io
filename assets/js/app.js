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

	$('#ss-submit-student').on('click', function() {
		ga('send', 'event', 'signUpStudent', 'click', 'formComplete');
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

	$('#learn-more-btn').on('click', function() {
		ga('send', 'event', 'learnMore', 'click', 'learnMore');
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

			var firstName =  $('input[name=firstName]').val();
			var lastName =  $('input[name=lastName]').val();
			var email =  $('input[name=email]').val();

			formObject.save({
				firstName: firstName,
				lastName: lastName,
				email: email,
				schoolList: schoolList
			}, {
				success: function(formObject) {
					// form was saved successfully
					// test cloud function
					console.log("save successful");
					var schoolText = schoolList.join(", ");
					Parse.Cloud.run('mailUser', {firstName: firstName, email: email, schoolList: schoolText}, {
						success: function(message) {
							console.log("Cloud function success");
						},
						error: function(error) {
							console.log("Cloud function error");
						}
					});
					window.location.href = "thank-you-prospective.html";
				},
				error: function(formObject, error) {
					// form was not saved
					console.log(error);	
				}
			});
		};
	});

	$('#ss-form-student').submit(function(e){
		console.log('Submit');
		
		Parse.initialize("lv8wq9RY8eZx0Hyevu8PaMVOTDHcH5JTYYpFsX6Z", "x9MWoecCxDBaBqp5FAc7W9kiLJFTHJg1vKY3DFfV");
		var StudentObject = Parse.Object.extend("StudentObject");
		var studentObject = new StudentObject();

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
		} else if ($('input[name=school]:checked').val().length == 0) {
			console.log('No schools selected');
			$('#school').focus();
			$('#schoolErrorMessage').html("<span>This is a required field</span>");
			e.preventDefault();
		} else if ($('#gradYear option:selected').val() == "") {
			console.log('No grad year entered');
			$('#gradYearErrorMessage').html("<span>This is a required field</span>");
			e.preventDefault();
		} else {
			e.preventDefault();
			console.log('All fields were okay');

			var firstName =  $('input[name=firstName]').val();
			var lastName =  $('input[name=lastName]').val();
			var email =  $('input[name=email]').val();
			var gradYear = $('#gradYear option:selected').val()
			var school = $('input[name=school]:checked').val();

			studentObject.save({
				firstName: firstName,
				lastName: lastName,
				email: email,
				gradYear: gradYear,
				school: school
			}, {
				success: function(studentObject) {
					// form was saved successfully
					// test cloud function
					console.log("save successful");
					Parse.Cloud.run('mailStudent', {firstName: firstName, email: email}, {
						success: function(message) {
							console.log("Cloud function success");
						},
						error: function(error) {
							console.log("Cloud function error");
						}
					});
					window.location.href = "thank-you-student.html";
				},
				error: function(studentObject, error) {
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