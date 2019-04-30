//importing express
var express = require("express");

 //assign express to app
 var app = express();
 
 //creating the homepage route "/"
 app.get("/", function(req, res) {
    res.send("Hi there, welcome to my assignment!");
 });


//creating the animal noise pages (we need at least 5 animals)
app.get("/speak/:animal", function(req, res) {
    //store the animal name in a var and lowercasing the animal names so we can write 'Cat' or 'cat' in the url and it'll work
    var animal = req.params.animal.toLowerCase();
    
    //creating an object to contain the sounds of the animals
    var sounds = {
        pig: "Oink",
        cow: "Moo",
        dog: "Woof Woof",
        cat: "I hate you human",
        goldfish: "..."
    }
    
    //set the sound array to contain the sounds of the animals; when an animal name is typed it will take that animal name and set sound
    // to be that animal sound by choosing the right animal from the object
    var sound = sounds[animal];
    
    //using the single quotes to surround the sound with quotations and not mess up the double quotes
    res.send("The " + animal + " says '" + sound + "'");
    
    
    //console.log(name);
    
    // switch (name) {
    //     case 'cow':
    //         res.send("The " + name + " says MOO!");
    //         break;
    //     case 'pig':
    //         res.send("The " + name + " says OINK!");
    //         break;
    //     case 'dog':
    //         res.send("The " + name + " says WOOF!");
    //         break;
    //     case 'owl':
    //         res.send("The " + name + " says HOOT!");
    //         break;
    //     case 'car':
    //         res.send("The " + name + " says VROOM!");
    //         break;
    // }
});


//creating the word repetition page with the user input word and number in the url
app.get("/repeat/:word/:times", function(req, res) {
   //store the word and number below
   var word = req.params.word + " ";
   var times = Number(req.params.times);
   
   //console.log(word + " " + typeof(times));
   
   //repeat word times number of times using the str.repeat(number) method
   res.send(word.repeat(times));
});


//creating the catch all route that will promt the user with an error message if a wrong url is requested
app.get("*", function(req, res){
    res.send("Sorry, page not found...MEOW!");
});


//creating the listening port and the IP
app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Server has started!");
});