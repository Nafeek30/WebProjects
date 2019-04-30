//importing express and setting the main function to app
var express = require("express");
var app = express();

//including public as a directory to use by express
app.use(express.static("public"));

//telling express our res.render files will be .ejs files
app.set("view engine", "ejs");


app.get("/", function(req, res){
    //use res.render to send an entire file; could be html or any other file
    res.render("home");
});

//making a dynamic page with ejs
app.get("/fallinlovewith/:thing", function(req, res){
   var thing = req.params.thing;
   res.render("love", {thingVar: thing});
});


//example of looping through using ejs; we're using a post request to make an array of posts with multiple objects of titles and authors
app.get("/posts", function(req, res) {
    //array of posts
    var posts = [
        {title: "Post 1", author: "suzy"},
        {title: "My adorable pet bunny", author: "charlie"},
        {title: "can you believe this pomsky?", author: "nafee"}
    ];
    
    res.render("posts", {posts: posts});
});


//set up server to listen
app.listen(process.env.PORT, process.env.IP, function(){
   console.log("Server is listening!!"); 
});