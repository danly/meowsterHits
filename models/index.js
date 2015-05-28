var mongoose = require("mongoose");
mongoose.connect(process.env.MONGOLAB_URI ||
               process.env.MONGOHQ_URL || "mongodb://localhost/smashterHits");

module.exports.User = require("./user");
module.exports.Scores = require("./scores");
