var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/smashterHits");

module.exports.User = require("./user");
module.exports.Scores = require("./scores");