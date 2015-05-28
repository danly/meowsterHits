var express = require("express"),
	bodyParser = require("body-parser"),
	path = require("path");

var db = require("./models");
var session = require("express-session");

app = express();
app.use(bodyParser.urlencoded({extended: true}));

//if can't find something looks in bower_components folder
app.use(express.static("bower_components"));


app.use(express.static("public"));



app.use(session ({
	secret: "SUPER STUFF",
	resave: false,
	saveUninitialized: true
}));

var loginHelpers = function (req, res, next) {
	req.login = function (user) {
		req.session.userId = user._id;
		req.user = user;
		return user;
	};

	req.logout = function () {
		req.session.userId = null;
		req.user = null;
	};

	req.currentuser = function (cb) {
		var userId = req.session.userId;
		db.User.
			findOne({
				_id: userId
			}, cb);
	};

	next();
};

app.use(loginHelpers);


var views = path.join(__dirname, "public/views");

app.get("/", function (req, res) {
	var indexPath = path.join(views, "index.html");
	res.sendFile(indexPath);
});


app.get("/signup", function (req, res) {
	var signupPath = path.join(views, "signup.html");
	res.sendFile(signupPath);
});

app.post("/users", function (req, res) {
	var newUser = req.body.user;

	db.User.
	createSecure(newUser, function (err, user) {
		if (user) {
			req.login(user);
			res.redirect("/profile");
		} else {
			res.redirect("/");
		}
	});
});


//login is on home page
app.post("/", function (req, res) {
	var user = req.body.user;

	db.User.
	authenticate(user,
	function (err, user) {
		if (!err) {
			req.login(user);
			res.redirect("/profile");
		} else {
			res.redirect("/");
		}
	})
})

app.get("/logout", function (req, res) {
	console.log("logging out")
	req.logout();
	res.redirect("/");
});




app.get("/profile", function (req, res) {

	var profilePath = path.join(views, "profile.html");
	res.sendFile(profilePath);

	// req.currentUser(function (err, user) {
	// 	if (!err) {
	// 		res.send(user.email);
	// 	} else {
	// 		res.redirect("/");
	// 	}
	// });	
});






app.get("/scores", function (req, res) {
	var scoresPath = path.join(views, "scores.html");
	res.sendFile(scoresPath);
});


app.listen(4000, function () {
	console.log("Running on 4000!")
});