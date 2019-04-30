//The app we're going to make here is a friend list where we'll have a list of friends and we can use a form to add more friends


//imporitng express and assigning it to var app
var express = require("express");
var app = express();

//importing body-parser to collect info from forms and setting it to be usable
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended: true}));

//specifying that we will use ejs files in render
app.set("view engine", "ejs");

//array of friends to load on the friends page
var friends = ["Tony", "Miranda", "Justin", "Pierre", "Lily"];


//creating the homepage
app.get("/", function(req, res){
   res.render("home"); 
});



//creating the friends page
app.get("/friends", function(req, res){
    //note:: the first friend below is the keyword in the ejs file in views that we'll use and the second friends in the name of the array above
   res.render("friends", {friends: friends}); 
});




//using post request to add more friends to our friend list
app.post("/addfriend", function(req, res){
     //console.log(req.body);
     
     //putiting the contents of the input method from the form into a var and pushing it into the list
     //NOTE: teh newFriend on the right right side after 'body. ' must be the same name as the one in the input method under 'name="" '
     var newFriend = req.body.newFriend;
     friends.push(newFriend);
     
     //redirect to the friends page with the new list
     res.redirect("/friends");
     
    //we'll send this message when the user gets on this page
    //res.send("you have reached the post route"); 
});



//setting up listening ports and getting the server up to listen and respond to calls
app.listen(process.env.PORT, process.env.IP, function(){
   console.log("server started!"); 
});