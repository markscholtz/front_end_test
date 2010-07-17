/* Test 1 */
$(document).ready(function() { 

	$('#image img').mouseover(function() {
		$('#image .caption').animate({opacity: '1'}, 200);
	});
	
	$('#image img').mouseout(function() {
		$('#image .caption').animate({opacity: '.3'}, 200);
	});

});

/* Test 2*/
