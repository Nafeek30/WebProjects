//comments routes refactoring goes here

var express = require("express");
//mergeParams: true merges the params in campgrounds and comments in this file so we can get the campground id's after refactoring the url's
var router = express.Router({mergeParams: true});
var Campground = require("../models/campground");
var Comment = require("../models/comment");
var middleware = require("../middleware"); //imports index.js from middleware but no need to mention it because it auto does it


// ======================
// COMMENTS ROUTES
// ======================

// NEW ROUTE FOR COMMENTS - a form to post a new comment

router.get("/new", middleware.isLoggedIn, function(req, res) {
    //find campground by ID
    Campground.findById(req.params.id, function(err, campground){
       if(err){
           console.log(err);
       } else {
           //then send it through when we render NOTE: first campground will be the var in the ejs file and second one is from the campground as the function parameter
            res.render("comments/new", {campground: campground});
       }
    });
});


// CREATE ROUTE FOR COMMENTS - adds the new comment and redirects to that particular campground page

router.post("/", middleware.isLoggedIn, function(req, res){
   //lookup campground using ID
   Campground.findById(req.params.id, function(err, campground) {
       if(err){
           console.log(err);
           res.redirect("/campgrounds");
       } else {
           //create new comment
            //since we put text and author inside comment[] we can get both by typing req.body.comment so:
            Comment.create(req.body.comment, function(err, comment){
                if(err){
                    // if comment wasn't created - this error is usually for testing and not in real life scenario
                    req.flash("error", "Comment not found");
                    console.log(err);
                } else {
                    //before we push comments in, we need to add username and id to comment
                    comment.author.id = req.user._id; //setting the id inside author inside the comment to be the user id retrieved
                    comment.author.username = req.user.username;
                    //then save comment
                    comment.save();
                    //then connect new comment to campground by pushing it with the particular campground
                    //campground.comments.push(comment);
                    req.flash("success", "Successfully added comment");
                    campground.save();
                    //redirect to the SHOW page of the campground ie that particular campground page
                    res.redirect("/campgrounds/" + campground._id);
                }
            });
       }
   });
});


//EDIT COMMENTS ROUTE
router.get("/:comment_id/edit", middleware.checkCommentOwnership, function(req, res) {
    //check to make sure the comment's campground exists before letting user edit a commnet of a campground
    Campground.findById(req.params.id, function(err, foundCampground) {
        if(err || !foundCampground) {
            req.flash("error", "No campground found");
            return res.redirect("back");
        }
        Comment.findById(req.params.comment_id, function(err, foundComment) {
            if(err || !foundComment){
                //if you go to the comment edit page and change characters it'll get handled
                req.flash("error", "Comment not found");
                res.redirect("back");
            } else {
                 res.render("comments/edit", {campground_id: req.params.id, comment: foundComment});
            }
        });
    });
});

//UPDATE COMMENT ROUTE
router.put("/:comment_id", middleware.checkCommentOwnership, function(req, res){
     //find and update the update the comments - 1st param: which comment id we're looking for; 2nd param: the updated data we're passing in
   Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedcomment){
       if(err){
           res.redirect("back");
       } else {
           //redirect to that campground's page using the campground id used below 
           res.redirect("/campgrounds/" + req.params.id);
       }
   });
});

//COMMENT DESTROY ROUTE
router.delete("/:comment_id", middleware.checkCommentOwnership, function(req, res){
   Comment.findByIdAndRemove(req.params.comment_id, function(err){
       if(err){
           res.redirect("back");
       } else {
           // if successfully deleted comment
           req.flash("success", "CComment deleted");
            // redirect to the campground page where the comment was 
           res.redirect("/campgrounds/" + req.params.id);
       }
   });
});


module.exports = router;
