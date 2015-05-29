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
	var userEmail = user.email;

	if (userEmail) {
		db.User.
		authenticate(user,
		function (err, user) {
			if (!err) {
				req.login(user);
				res.redirect("/profile");
			} else {
				// res.sendStatus(401);
				res.redirect('/')
			}
		}, function () {
			res.sendStatus(401);
		});
	} else {
		res.redirect('/')
	}


})

app.get("/logout", function (req, res) {
	console.log("logging out")
	req.logout();
	res.redirect("/");
});


app.get("/profile.json", function (req, res) {
	req.currentuser(function (err, user){
		if (user) {
			console.log(user)
			res.send(JSON.stringify(user));
		} else {
			res.sendStatus(404)
		}
	})
})


app.get("/profile", function (req, res) {
	req.currentuser(function (err, user) {
		if (user) {
			var profilePath = path.join(views, "profile.html");
			res.sendFile(profilePath);
		} else {
			res.sendStatus(404)
		}
	})

});


app.post("/scores.json", function (req, res){
	// var newScore = req.body.score
	var finalScore = req.body;
	var actualTime = Object.keys(finalScore)[0];

	// console.log('user 2nd test: ', user)
	console.log('final score', actualTime)


	var user = req.currentuser(function (err, user){
		if (user) {
			db.User.findOne({email: user.email}, function (err, user) {
				user.scores.push(actualTime);
				console.log("user.scores", user.scores);
				user.save();
				console.log("user", user)
			});
		} else {
			res.sendStatus(404)
		}
	})

	


})



app.get("/scores", function (req, res) {
	var scoresPath = path.join(views, "scores.html");
	res.sendFile(scoresPath);
});





app.listen(process.env.PORT || 4000, function () {
	console.log("Running on", process.env.PORT)
});
