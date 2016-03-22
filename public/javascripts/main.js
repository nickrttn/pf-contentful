$(document).ready(function() {

	// Make videos responsive with FitVids
	$('.video').fitVids();

	// Javascript detection: if the class exists,
	// JS is enabled on the client.
	$('body').addClass('js');

	// Implemented Brad Frost's Toggle pattern.
	var navToggle = $('.category-list button');
	var nav = $('#menu');

	navToggle.on('click', function(event) {
		event.preventDefault();
		navToggle.toggleClass('active');
		nav.toggleClass('active');
		return false;
	});
});
