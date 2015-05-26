var express = require("express"),
	bodyParser = require("body-parser"),
	path = require("path");

app = express();
app.use(bodyParser.urlencoded({extended: true}));


var views = path.join(__dirname, "views");

app.get("/", function (req, res) {
	var indexPath = path.join(views, "index.html");
	res.sendFile(indexPath);
});


app.get("/signup", function (req, res) {
	var signupPath = path.join(views, "signup.html");
	res.sendFile(signupPath);
});

app.get("/scores", function (req, res) {
	var scoresPath = path.join(views, "scores.html");
	res.sendFile(scoresPath);
});


app.listen(4000, function () {
	console.log("Running on 4000!")
});