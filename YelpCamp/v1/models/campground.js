var mongoose = require("mongoose");

//Campground SCHEMA SETUP
var campgroundSchema = new mongoose.Schema({
   name: String,
   image: String,
   description: String,
   author: {
      id : {
         type: mongoose.Schema.Types.ObjectId,
         ref: "User"
      },
      username: String
   },
   comments: [
      {
         type: mongoose.Schema.Types.ObjectId,
         ref: "Comment"
      }
   ]
});

//then create the mongoose model ie a blueprint of what campground should look like 
//var Campground = mongoose.model("Campground", campgroundSchema); //instead of this line we write down below:
module.exports = mongoose.model("Campground", campgroundSchema);