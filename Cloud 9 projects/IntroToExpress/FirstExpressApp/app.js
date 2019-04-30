//importing express package
var express = require("express");

//we'll put all of the contents of express in 'app' (ALWAYS DO STH LIKE THIS)
//and we'll be using using express by typing ' app. '    something to use express
var app = express();

//we'll make three different routes
// when we go to "/" => we'll get "hi there"
//app.get takes two parameters; first one is the location (here it's the root path or homepage - "/"; second one is the function to run for this url)
//inside the function the first one is request and the second one is response
//these are two objects - inside req we have all the info about the request that was made and response contains all the info we're going to respond with
app.get("/", function(req, res){
    res.send("Hi there"); //this is how a text response is made
});

//and when we go to "/bye" => we'll get "goodbye!"
app.get("/bye", function(req, res){
   res.send("goodbye"); 
});

//when we go to "/dog" => we'll get "meow"
app.get("/dog", function(req, res) {
   res.send("Meow"); 
});

//using routing parameters to make a pattern of /somethig i the url so we do't have dry code. Use the : symbol to tell express to search for a 
// name/pattern after the : and return a page
app.get("/r/:subRedditName/comments/:id/:title/", function(req, res) {
   res.send("welcome to the comments page"); 
});

//using the request parameter to make websites dynamic by using the parameter requested to change the page
app.get("/r/:subRedditName", function(req, res) {
   //console.log(req.params);
   
   //storing the request parameter in a variable
   var subreddit = req.params.subRedditName;
   
   //making the webpage dynamic and also changing the variable to uppercase
   res.send("Welcome to the " + subreddit.toUpperCase() + " subreddit!!");
});


// the * symbol is like a catch all. so say we don't want to display some sort of message if the user enters a wrong url, then we can use this
// ALWAYS PUT THIS AT THE END BECAUSE ORDER OF ROUTE MATTERS - SO THE * ROUTE WILL TRIGGER FIRST AS IT CATCHES EVERYTHING!!!
app.get("*", function(req, res) {
    res.send("Wrong url entered!!!");
});



//Tell Express to listen for requests (ie start server)
//so we use app.listen and we need to provide the port to listen on - in cloud9 it's always process.env.PORT - which will just return a number later
// and also provide the IP - for cloud9 it's always process.env.IP
app.listen(process.env.PORT, process.env.IP, function(){
    console.log("server has started");
});