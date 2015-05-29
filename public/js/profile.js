$(function () {


	$.get('/profile.json', function(res){ 
		var user = JSON.parse(res);
		$(".username").html("Hi " + user.username)
		render(user, "scoreswrapper", "scores-template");
	});
	

});

var render = function (user, parentId, templateId) {
	console.log("user", user, "pID", parentId, "tId", templateId);
	console.log("template html", $('#' + templateId).html());


	console.log({user: user})



	var template = _.template($('#' + templateId).html());

	$('#' + parentId).html(template({user: user}));
}
