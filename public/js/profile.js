$(function () {


	$.get('/profile.json', function(res){ 
		var user = JSON.parse(res);
		$(".username").html("Hi " + user.username)
	});



});

