var main = function() {
  /* call single page nav */
  $('.learn-more-btn').singlePageNav;

	$('singleSessionSignup').on('click', function() {
	  ga('send', 'event', 'buyButton', 'click', 'singleSession', 35);
	});
	$('fivePackSignup').on('click', function() {
	  ga('send', 'event', 'buyButton', 'click', 'fivePack', 150);
	});
	$('customSignup').on('click', function() {
	  ga('send', 'event', 'buyButton', 'click', 'customSession', 200);
	});
	$('formComplete').on('click', function() {
	  ga('send', 'event', 'buyButton', 'click', 'fromComplete');
	});
};


$(document).ready(main);