//all the middleware goes here
var Campground = require("../models/campground");
var Comment = require("../models/comment");
var middlewareObj = {};


middlewareObj.checkCampgroundOwnership = function(req, res, next){
    //checkCampgroundOwnership function checks whether you made the campground or not before letting you update, edit or delete it
    
    //if user is logged in:
    if(req.isAuthenticated()){
            Campground.findById(req.params.id, function(err, foundCampground){
            if(err || !foundCampground){
                // if campground isn't found due to database error or if campground is null - which users will prolly never see
                req.flash("error", "Campground not found");
                res.redirect("back");
            } else {
                //console.log(foundCampground.author.id);
                //console.log(req.user._id);
                
                // then check does user own the campground:
                if(foundCampground.author.id.equals(req.user._id)){
                    next();
                } else {
                    //if user is trying to access someone else's campground
                    req.flash("error", "CYou don't have permission to do that");
                    //if not, redirect
                    res.redirect("back");
                }
            }
        });
    } else {
        //show message if user isn't logged in before redirecting
        req.flash("error", "You need to be logged in to do that");
        //back is a keyword that redirects you to the previous page you were on
        res.redirect("back");
    }
}


middlewareObj.checkCommentOwnership = function(req, res, next){
    //checkCommentOwnership function checks whether you made the comment or not before letting you update, edit or delete it

    //if user is logged in:
    if(req.isAuthenticated()){
            Comment.findById(req.params.comment_id, function(err, foundComment){
            if(err){
                res.redirect("back");
            } else {
                //console.log(foundCampground.author.id);
                //console.log(req.user._id);
                
                // then check does user own the comment:
                if(foundComment.author.id.equals(req.user._id)){
                    next();
                } else {
                    //if it's not the same user's comment and he tries to do stuff to it
                    req.flash("error", "You don't have permission to do that");
                    //if not, redirect
                    res.redirect("back");
                }
                
            }
        });
    } else {
        // if user tries to post comment without logging in 
        req.flash("error", "You need to be logged in to do that");
        //back is a keyword that redirects you to the previous page you were on
        res.redirect("back");
    }
}


//isLoggedIn middleware to check if user is logged in to do stuff on our website
middlewareObj.isLoggedIn = function(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error", "You need to be logged in to do that");
    res.redirect("/login");
}


module.exports = middlewareObj;