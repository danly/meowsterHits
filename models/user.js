var mongoose = require("mongoose");

var userSchema = new mongoose.Schema({
						email: {
							type: String,
							lowercase: true,
							required: true,
							index: {
								unique: true
							}
						},
						passwordDigest: {
							type: String,
							required: true
						},
						username: {
							type: String,
							default: ""
						},
						scores: []
						// 	type: Number,
						// 	default: ""
						// }
});


var bcrypt = require("bcrypt");

//confirms if password is the same
var confirm = function (password, passwordConfirm) {
	return password === passwordConfirm;
};


userSchema.statics.createSecure = function (params, cb) {
	var isConfirmed;
	isConfirmed = confirm(params.password, params.password_confirmation);
	if (!isConfirmed) {
		return cb(console.log("Passwords Should Match"), null);
	};
	var that = this;
	bcrypt.hash(params.password, 12, function (err, hash) {
		params.passwordDigest = hash;
		that.create(params, cb);
	});
};

userSchema.statics.authenticate = function (params, cb, cb2) {
  	this.findOne({
      	email: params.email
    },
    function (err, user) {
    	if(user){
      		user.checkPswrd(params.password, cb);
      	} else {
      		cb2();
      	}
    });
};

userSchema.methods.checkPswrd = function(password, cb) {
  	var user = this;
  	bcrypt.compare(password, 
 	this.passwordDigest, function (err, isMatch) {
    if (isMatch) {
    	console.log("MATCHED!")
    	cb(null, user);
    } else {

    	cb("OOPS", null);
    }
  });
};



var User = mongoose.model("User", userSchema);
module.exports = User;