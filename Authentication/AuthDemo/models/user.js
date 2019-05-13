var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");


var UserSchema = new mongoose.Schema({
    username: String,
    password: String
});

//takes the passport-local-mongoose package that we installed and adds a bunch of methods that come with that package to our UserSchema
UserSchema.plugin(passportLocalMongoose);

//name of the model is User and we're getting it from UserSchema
module.exports = mongoose.model("User", UserSchema);