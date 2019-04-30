# things to do to create everythig from scratch now:
* create a new dir - go into it and run 'npm init' to create a json file
* then install express and make it a dependency like so - 'npm install express --save' 
* install ejs by make it a dependency like so - 'npm install ejs --save'
* then we create our app.js file - open is - then add the basic express code we need ie import express and set it to var app 
* then set app.set("view engine", "ejs"); to specify to express that we'll be using ejs in our res.render() methods
* then set the app.listen(process.env.PORT, process.env.IP, function(){console.log("listening"); }); - to set up our server to be listening to calls
* then we create our root page with app.get("/", function(req, res){ res.render("home"); }); to set up the home page; here home is just home.ejs
* then make a views directory with 'mkdir views' and create a homepage by doing - 'touch views/home.ejs' NOTE: all ejs files go in view directory
* install body parser to extract names from an input field to use - eg in forms like so - 'npm install body-parser --save'
* then declare it in app.js as a var like - 'var bodyParser = require("body-parser") ' and set it to use like - 'app.use(bodyParser.urlencoded({extended: true})); '
* 


# Post Requests!!!! 

* write post routes, and test them with postman
    - we use a post route when we're sending/adding data to something
* use a form to send a post request
    - use the input tag and inside it use name tag like - name="some_name" and use it in the webpage to store and retrieve info from an input in a form
* use body parser to ger form data
    - body parser gets the info from input tag inside a form and we can use that data
    
* use res.redirect("/page_we_to_redirect_back_to"); to go back to a page eg after adding a new friend just go back to that same page so we can see the new list

