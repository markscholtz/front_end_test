function showInstructions()
{
	var instructions = 'Instructions:\n\n1: Clean up HTML\n2: Clean up Javascript\n3: Ensure that if the user enters in a date in the past, an inline caption pops up next to the select box informing them of their error'
	alert(instructions);
}

function populateSelect()
{
	$('#test').html(populateDays());
	$('#test1').html(populateMonths());
	$('#test2').html(populateYears());
}

function populateDays()
{
	var options = '';
	var json = '{\
					"days":\
							[\
								{"value":"1","display":"1"},\
								{"value":"2","display":"2"},\
								{"value":"3","display":"3"},\
								{"value":"4","display":"4"},\
								{"value":"5","display":"5"},\
								{"value":"5","display":"6"},\
								{"value":"7","display":"7"},\
								{"value":"8","display":"8"},\
								{"value":"9","display":"9"},\
								{"value":"10","display":"10"},\
								{"value":"11","display":"11"},\
								{"value":"12","display":"12"},\
								{"value":"13","display":"13"},\
								{"value":"14","display":"14"},\
								{"value":"15","display":"15"},\
								{"value":"16","display":"16"},\
								{"value":"17","display":"17"},\
								{"value":"18","display":"18"},\
								{"value":"19","display":"19"},\
								{"value":"20","display":"20"},\
								{"value":"21","display":"21"},\
								{"value":"22","display":"22"},\
								{"value":"23","display":"23"},\
								{"value":"24","display":"24"},\
								{"value":"25","display":"25"},\
								{"value":"26","display":"26"},\
								{"value":"27","display":"27"},\
								{"value":"28","display":"28"},\
								{"value":"29","display":"29"},\
								{"value":"30","display":"30"},\
								{"value":"31","display":"31"}\
							]\
				}';

	var days = jQuery.parseJSON(json);

	var j = days.days.length;
	for (var i = 0; i < j; i++)
	{
		var selected = '';
		var currentDay = new Date().getDate();

		if (currentDay - 1 == i)
		{
			selected = ' selected="selected"';
		}

		options += '<option value = "' + days.days[i].value + '"' + selected + '>' + days.days[i].display + '</options>';
	}

	return options;
}

function populateMonths()
{
	var options = '';
	var json = '{\
					"months":\
							[\
								{"value":"1","display":"January"},\
								{"value":"2","display":"February"},\
								{"value":"3","display":"March"},\
								{"value":"4","display":"April"},\
								{"value":"5","display":"May"},\
								{"value":"6","display":"June"},\
								{"value":"7","display":"July"},\
								{"value":"8","display":"August"},\
								{"value":"9","display":"September"},\
								{"value":"10","display":"October"},\
								{"value":"11","display":"November"},\
								{"value":"12","display":"December"}\
							]\
				}';

	var months = jQuery.parseJSON(json);

	var j = months.months.length;
	for (var i = 0; i < j; i++)
	{
		var selected = '';
		var currentMonth = new Date().getMonth();

		if (currentMonth == i)
		{
			selected = ' selected="selected"';
		}
		
		options += '<option value = "' + months.months[i].value + '"' + selected + '>' + months.months[i].display + '</options>';
	}

	return options;
}

function populateYears()
{
	var options = '';
	var json = '{\
					"years":\
							[\
								{"value":"2005","display":"2005"},\
								{"value":"2006","display":"2006"},\
								{"value":"2007","display":"2007"},\
								{"value":"2008","display":"2008"},\
								{"value":"2009","display":"2009"},\
								{"value":"2010","display":"2010"},\
								{"value":"2011","display":"2011"},\
								{"value":"2012","display":"2012"},\
								{"value":"2013","display":"2013"},\
								{"value":"2014","display":"2014"},\
								{"value":"2015","display":"2015"}\
							]\
				}';

	var years = jQuery.parseJSON(json);

	var j = years.years.length;
	for (var i = 0; i < j; i++)
	{
		var selected = '';
		var currentYear = new Date().getFullYear();

		if (currentYear == years.years[i].value)
		{
			selected = ' selected="selected"';
		}

		options += '<option value = "' + years.years[i].value + '"' + selected + '>' + years.years[i].display + '</options>';
	}

	return options;
}

function getTodaysDate()
{
	var now = new Date();
	var year = now.getFullYear();
	var month = appendZero(now.getMonth() + 1);
	var day = appendZero(now.getDate());

	var today = year + month + day;

	return today;
}

/* For safety, only call this method when the document has loaded ( $(document).ready(....) ) as we are using jQuery selectors within it*/ 
function getStartDate()
{
	var year = $('#sdate_year option:selected').val();
	var month = appendZero($('#sdate_month option:selected').val());
	var day = appendZero($('#sdate_day option:selected').val());

	return year + month + day;
}

function getEndDate()
{
	var year = $('#edate_year option:selected').val();
	var month = appendZero($('#edate_month option:selected').val());
	var day = appendZero($('#edate_day option:selected').val());

	return year + month + day;
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

/* For safety, only call this method when the document has loaded ( $(document).ready(....) ) as we are using jQuery selectors within it*/ 
function validateDates()
{
	var today = getTodaysDate();
	var startDateValid = getStartDate() >= today;
	var endDateValid = getEndDate() >= today;
	var isValid = (startDateValid && endDateValid);

	if (startDateValid)
	{
		$('#startDateError').fadeOut('normal', function() { $(this).remove() });
	}

	if (endDateValid)
	{
		$('#endDateError').fadeOut('normal', function() { $(this).remove() });
	}

	if (!startDateValid && $('#startDateError').length == 0)
	{
		$('<span id="startDateError">Start Date cannot be before today!</span>')
			.fadeIn('normal')
			.addClass('error')
			.appendTo('#startDateDiv');
	}

	if (!endDateValid && $('#endDateError').length == 0)
	{
		$('<span id="endDateError">End Date cannot be before today!</span>')
			.fadeIn('normal')
			.addClass('error')
			.appendTo('#endDateDiv');
	}

	return isValid;
}

/********************************** 
		jQuery goodness 
**********************************/
$(document).ready(function() { 

	/* Show the instructions as soon as the document is ready */
	showInstructions();
	populateSelect();

	/* Validate the user selected dates on form submit */
	$('form').submit(function() {

		if (!validateDates())
		{
			return false;
		};
	});

});
