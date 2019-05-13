//import mongoose
var mongoose = require("mongoose");

//connecting mongoose to the server we're running; after the localhost:PORT_NAME/ we insert whatever name we want for our database to be there; if we use a 
//name that doesn't exist then it'll create that db for us and them use it
mongoose.connect("mongodb://localhost:27017/cat_app");

//create a new cat schema (ie how cats should look like)
var catSchema = new mongoose.Schema({
   name: String,
   age: Number,
   temperament: String
});

//creating a Cat object that will have the above general style-ed instances
 var Cat = mongoose.model("Cat", catSchema); //so we can use Cat.find/create/etc


// //adding a new cat to DB
// var george = new Cat({
//   name: "Mrs Norris",
//   age: 7,
//   temperament: "Evil"
// });

// //now save george to the db annd have a call back function to tell us if it saved which has 2 params - first is the potential error, second is the item that was saved
// george.save(function(err, cat){
//     if(err){
//         console.log("something went wrong");
//     } else{
//         console.log("we saved a cat to the db:");
//         console.log(cat);
//     }
// });

//creating a cat andn saving it with one function using the create command
Cat.create({
   name: "Snow White",
   age: 15,
   temperament: "bland"
}, function(err, cat){
    if(err){
        console.log(err);
    } else {
        console.log(cat);
    }
});

//retrieve all cats from DB and console.log them
Cat.find({}, function(err, cats){
   if(err){
       console.log("oh no, error");
       console.log(err);
   } else {
       console.log("all the cats: ");
       console.log(cats);
   }
});