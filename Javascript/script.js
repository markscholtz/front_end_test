$(document).ready(function() { 

	$('#image').mouseenter(function() {
		$('#image .caption').stop();
		$('#image .caption').animate({opacity: '1'}, 200);
	});
	
	$('#image').mouseleave(function() {
		$('#image .caption').stop();
		$('#image .caption').animate({opacity: '.3'}, 200);
	});

});

