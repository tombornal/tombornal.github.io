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
	/*$('#formComplete').on('click', function() {
	  ga('send', 'event', 'buyButton', 'click', 'fromComplete');
		Parse.initialize("lv8wq9RY8eZx0Hyevu8PaMVOTDHcH5JTYYpFsX6Z", "x9MWoecCxDBaBqp5FAc7W9kiLJFTHJg1vKY3DFfV");
		var FormObject = Parse.Object.extend("FormObject");
		var formObject = new FormObject();
	});*/
	
$('#ss-submit').on('click', function() {
		console.log("signup click registered");
		Parse.initialize("lv8wq9RY8eZx0Hyevu8PaMVOTDHcH5JTYYpFsX6Z", "x9MWoecCxDBaBqp5FAc7W9kiLJFTHJg1vKY3DFfV");
		var FormObject = Parse.Object.extend("FormObject");
		var formObject = new FormObject();

		var schoolList = [];
		$(':checkbox:checked').each(function(i){
			if ($(this).val() == 'other_option') {
				schoolList[i] = $('#entry_192234221_other_option_response').val();
			} else {
				schoolList[i] = $(this).val();
			}
		});

		/*formObject.set("firstName", $('input[name=entry.1258718376]').val())
		formObject.set("lastName", $('input[name=entry.1216210428]').val())
		formObject.set("email", $('input[name=entry.310230083]').val())*/

		formObject.save({
			firstName: $('input[name=firstName]').val(),
			lastName: $('input[name=lastName]').val(),
			email: $('input[name=email]').val(),
			schoolList: schoolList
		}, {
			success: function(formObject) {
				// form was saved successfully
				console.log("save successful");
			},
			error: function(formObject, error) {
				// form was not saved
				console.log(error);	
			}
		});
	});

};


$(document).ready(main);