var express = require("express"),
bodyParser = require("body-parser"),
methodOverride = require("method-override"), //using method override to override for put and delete requests
mongoose = require("mongoose"),
app = express();

// APP CONFIG
mongoose.connect("mongodb://localhost:27017/restful_blog_app", { useNewUrlParser: true });
app.set("view engine", "ejs");
app.use(express.static("public")); //so we can serve our custom stylesheet when we get to that
app.use(bodyParser.urlencoded({extended: false}));
app.use(methodOverride("_method")); //tell our program to use method override and look for the _method keyword in queries to do its work


// MONGOOSE/MODEL/CONFIG
var blogSchema = new mongoose.Schema({
    // Our blog will have a title, image, body and a date
   title: String,
   image: String,
   body: String,
   created: {
       type: Date, 
       default: Date.now
   } //created should be a date and the date should be when the blog was created (automatically gets it); can do this for any other attributes as well like image has a default imge if user didn't type anything in
});

var Blog = mongoose.model("Blog", blogSchema);

// Blog.create({
//   title: "Test Blog",
//   image: "https://images.hellogiggles.com/uploads/2016/10/24032646/minions-universal-pictures.jpg",
//   body: "Hello, this is a blog post!"
// });


// RESTFUL ROUTES

app.get("/", function(req, res) {
    res.redirect("/blogs");
});

//INDEX ROUTE - shows all blogs
app.get("/blogs", function(req, res){
   Blog.find({}, function(err, blogs){
       if(err){
           console.log("ERROR!")
       } else {
           res.render("index", {blogs: blogs});
       }
   }) ;
});

//NEW ROUTE - form to create new blog post
app.get("/blogs/new", function(req, res) {
    res.render("new");
});


//CREATE ROUTE - adds nnew blog to DB and redirects to /blogs page to show all blogs including the new one
app.post("/blogs", function(req, res){
   //create blog
   Blog.create(req.body.blog, function(err, newBlog){
      if(err){
          //reload the page
          res.render("new");
      } else {
          //then, redirect to the index
          res.redirect("/blogs");
      }
   });
});


//SHOW ROUTE - show more info about just one blog
app.get("/blogs/:id", function(req, res) {
    // how to get the id in the url right above
    Blog.findById(req.params.id, function(err, foundBlog){
       if(err) {
           res.redirect("/blogs");
       } else {
           res.render("show", {blog: foundBlog});
       }
    });
});

//EDIT ROUTE - show edit form for one blog
app.get("/blogs/:id/edit", function(req, res) {
    //find the blog to edit by its id and load its already existing contents in the for to edit
    Blog.findById(req.params.id, function(err, foundBlog){
       if(err){
           res.redirect("/blogs");
       } else {
           res.render("edit", {blog: foundBlog});
       }
    });
});


//UPDATE ROUTE - updates a particular blog then redirects to SHOW page to show that blog
app.put("/blogs/:id", function(req, res){
//find the blog that the user selected and update it - takes 3 params - id, newData (here blog becasue it has all the contents of the blog), callback function
   Blog.findByIdAndUpdate(req.params.id, req.body.blog, function(err, updatedBlog){
       if(err) {
           res.render("/blogs");
       } else {
           res.redirect("/blogs/" + req.params.id); //takes you to the show page of the id
       }
   });
});

//DELETE ROUTE - deletes the selected blog then redirects to INDEX page to display all blogs remaining
app.delete("/blogs/:id", function(req, res){
   //destroy blog
   Blog.findByIdAndRemove(req.params.id, function(err){
      if(err) {
          res.redirect("/blogs");
      } else {
          //redirect somewhere
          res.redirect("/blogs");
      }
   })
});


app.listen(process.env.PORT, process.env.IP, function(){
   console.log("SERVER IS RUNNING");
});