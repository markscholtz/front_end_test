function showInstructions()
{
	var instructions = 'Instructions:\n\n1: Clean up HTML\n2: Clean up Javascript\n3: Ensure that if the user enters in a date in the past, an inline caption pops up next to the select box informing them of their error'
	alert(instructions);
}

function validateDates()
{
	var today = getTodaysDate();

	if(getStartDate() < today)
	{
		alert("start date error");
	}

	if(getEndDate() < today)
	{
		alert("end date error");
	}
}

function getTodaysDate()
{
	var now = new Date();
	var year = now.getFullYear();
	var month = appendZero(now.getMonth() + 1);
	var day = appendZero(now.getDate());

	console.log("getTodaysDate - year: %s, month: %s, day: %s", year, month, day);

	var today = year + month + day;
	console.log("today %s", today);

	return today;
}

/* For safety, only call this method when the document has loaded ( $(document).ready(....) ) as we are using jQuery selectors within it*/ 
function getStartDate()
{
	var year = $('#sdate_year option:selected').val();
	var month = appendZero($('#sdate_month option:selected').val());
	var day = appendZero($('#sdate_day option:selected').val());

	console.log("getStartDate - year: %s, month: %s, day: %s", year, month, day);

	var startDate = year + month + day;
	console.log("startDate %s", startDate);

	return startDate;
}

function getEndDate()
{
	var year = $('#edate_year option:selected').val();
	var month = appendZero($('#edate_month option:selected').val());
	var day = appendZero($('#edate_day option:selected').val());

	console.log("getEndDate - year: %s, month: %s, day: %s", year, month, day);

	var endDate = year + month + day;
	console.log("endDate %s", endDate);

	return endDate;
}

function appendZero(value)
{
	value = value.toString();
	if (value.length == 1)
	{
		value = '0' + value.toString();
	}
		
	return value;
}


/********************************** 
		jQuery goodness 
**********************************/
$(document).ready(function() { 

	getStartDate();
	getEndDate();

	/* Show the instructions as soon as the document is ready */
	showInstructions();

	/* Validate the user selected dates on form submit */
	$('form').submit(function() {

		validateDates();
		return false;

		/*$('#image .caption').stop();
		$('#image .caption').animate({opacity: '1'}, 200);*/
	});

});
