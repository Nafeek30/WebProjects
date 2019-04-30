//import express and request 
var express = require("express");
var app = express();
var request = require("request");

app.set("view engine", "ejs"); //so we don't have to type .ejs for our files down below

//creating the homepage
app.get("/", function(req, res) {
    //render the search page from html files
   res.render("search"); 
});



//create search results page
app.get("/results", function(req, res){
    //we need to access data from the form and put it into the keyword in the url below like - req.query."name given in the input tag: here it's search"
    var query = req.query.search;
    //creating the url to request for every time a keyword is typed in
    var url = "http://omdbapi.com/?s=" + query + "&apikey=thewdb";
    
   //request api to look for movie names or tv show names that have california in the name; be sure to include the key at the end
   request(url, function(error, response, body){
       if(!error && response.statusCode == 200){
           //parse the json to make it into an object from string and store in a var
           var data = JSON.parse(body);
           //getting the 1st array in search and then getting it's title
           //res.send(results["Search"][0]["Title"]);
           
           //render the html file for results - first param - the ejs file to show, second param - send the data var to the html file
           res.render("results", {data: data});
       }
   });
});



//create listening port
app.listen(process.env.PORT, process.env.IP, function(){
   console.log("movie app has started"); 
});