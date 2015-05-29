$(function () {


	$.get('/profile.json', function(res){ 
		var user = JSON.parse(res);
		$(".username").html("Hi " + user.username)
	});

	render(user, "scores-wrapper", "scores-template");

});

var render = function (users, parentId, templateId) {
	var template = _.template($('#' + templateId).html());
	$('#' + parentId).html(template({collection: user}));
}