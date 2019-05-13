//campground route refactoring goes here

//import express and express.Router
var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");
var middleware = require("../middleware"); //imports index.js from middleware but no need to mention it because it auto does it


//INDEX route - show all campgrounds
router.get("/", function(req, res){
    
    //Get all campgrounds fro DB; using empty {} means everything; and do error check and if none then render the campgrounds from DB
    Campground.find({}, function(err, allCampgrounds){
       if(err){
           console.log(err);
       } else {
           //send all the campgrounds in the DB to the ejs campgrounds.ejs file to render them 
           //(NOTE: index is the name of the ejs file & we didnt add ejs extension to campgrounds becasue we used view engine above)
           res.render("campgrounds/index", {campgrounds: allCampgrounds});
           // , currentUser: req.user ---- in the above line current user is undefined if no user is logged in otherwsie it shows the user's name and unique id
       }
    });
    
});


//CREATE route - add new campground to DB
router.post("/", middleware.isLoggedIn, function(req, res){
   //get data from form and add to camgrounds array
   var name = req.body.name;
   var image = req.body.image;
   var desc = req.body.description;
   var author = {
       id: req.user._id,
       username: req.user.username
   }
   //format it in the array and object form in the campground array; the name id in new.ejs is equal to the name var above etc (1st - from ejs; 2nd part - from var above)
   var newCampground = {name: name, image: image, description: desc, author: author};
   //create a new campground and save to DB using the new campground stored in the object/var right above
   Campground.create(newCampground, function(err, newlyCreated){
      if(err){
          console.log(err);
      } else {
          //redirect back to the campgrounds page to show all the (new + old) campgrounds
          res.redirect("/campgrounds");
      }
   });
});

//NEW - show form to create new campground
router.get("/new", middleware.isLoggedIn, function(req, res) {
   res.render("campgrounds/new"); 
});


//NOTE: MAKE SURE TO PUT THIS AFTER /campgrounds/new OR IT WILL TREAT "new" AS AN ID AS WELL!!

//SHOW route - shows info for one campground
router.get("/:id", function(req, res) {
    //find the campground with provided ID using mongoose method - takes in 2 params - id & callback fuction
    //we find a campground by its id; then populate the comments associated with it; then execute the function
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
        //solves bug - if go to a campground page and change the characters of the id then the error will be caught
       if(err || !foundCampground) {
           req.flash("error", "Campground not found");
           res.redirect("back");
       } else {
           //render show.ejs template of that campground
           res.render("campgrounds/show", {campground: foundCampground});
       }
    });
});

//EDIT CAMPGROUND ROUTE
router.get("/:id/edit", middleware.checkCampgroundOwnership, function(req, res) {
    Campground.findById(req.params.id, function(err, foundCampground){
        // render the campgrounds/edit form in the views directory
        res.render("campgrounds/edit", {campground: foundCampground});
    });
});


//UPDATE CAMPGROUND ROUTE
router.put("/:id", middleware.checkCampgroundOwnership, function(req, res){
   //find and update the correct campground - 1st param: which campground/id we're looking for; 2nd param: the updated data we're passing in
   Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground){
       if(err){
           res.redirect("/campgrounds");
       } else {
           //redirect to the SHOW page of that campground
           res.redirect("/campgrounds/" + req.params.id);
       }
   });
});


//DESTROY CAMPGROUND ROUTE
router.delete("/:id", middleware.checkCampgroundOwnership, function(req, res){
    Campground.findByIdAndRemove(req.params.id, function(err){
        if(err){ 
            res.redirect("/campgrounds");
        } else {
            res.redirect("/campgrounds");
        }
    });
});


//export the routers we set up
module.exports = router;