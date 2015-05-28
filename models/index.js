var mongoose = require("mongoose");
mongoose.connect(process.env.MONGOLAB_URI || "mongodb://localhost/smashterHits");

module.exports.User = require("./user");
module.exports.Scores = require("./scores");
