//auth refactoring and All-Purpose routes refactoring(like root route, isLoggedIn middleware goes here

//import express and express.Router
var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/user");



//create the landing page (homepage)
router.get("/", function(req, res){
    res.render("landing");
});

//=====================
//AUTH ROUTES
//=====================

//show register form
router.get("/register", function(req, res) {
   res.render("register"); 
});


//handle sign up logic
router.post("/register", function(req, res) {
    //save username in new User
    var newUser = new User({username: req.body.username});
    //pass username to db and passowrd isn't stored but passed in to be hashed out; then we have a callback function to handle error
    User.register(newUser, req.body.password, function(err, user){
        if(err){
            req.flash("error", err.message); //express already tells you what the problem is inside err 
            //return shortcircuits the condition statements
            return res.render("register");
        }
        passport.authenticate("local")(req,res,function(){
            //if user successfully registers
            req.flash("success", "Welcome to YelpCamp " + user.username); //taking the username from our DB
            res.redirect("/campgrounds");
        });
    });
});


//show login form
router.get("/login", function(req, res) {
   res.render("login"); 
});

//handle login - using middleware
router.post("/login",passport.authenticate("local",
    {
        successRedirect: "/campgrounds",
        failureRedirect: "/login"
    }), function(req, res) {
});


//logout route
router.get("/logout", function(req, res) {
    req.logout();
    req.flash("success", "Logged you out!");
    res.redirect("/campgrounds");
});


module.exports = router;