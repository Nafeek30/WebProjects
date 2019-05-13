# Some tough errors I encountered and their solutions:
1. After posting a new comment when submit is clicked it throws "cannot GET /campgrounds5nj34bjbk34"
    Solution - I forgot to add "/" at the end of campgrounds in res.redirect("/campgrounds" + campgorund._id)
                - It should be res.redirect("/campgrounds/" + campgorund._id)

2. When creating the button to new comment form I used <%= campground.name %> by mistake instead of <%= campground._id %> as part of the link to go to 
    the comment form.

3. install latest version of node.js in c9 ide - nvm install stable
4. in authencation code along pt 4 i spelt "successRedirect" wrong and so it would redirect to login if credentials failed but wouldn't redirect to 
    'secret' page if credentials were correct.
5. /home/ubuntu/workspace/Authentication/node_modules/passport-local-mongoose/index.js:125
      .then(({ user }) => {
        
    ^ this error is because we werent using node.js 10: fix it by typing:

    nvm install 10
    nvm use 10
    nvm alias default 10

6. 


Starting:
* create yelpcamp dir, then create v1 dir
* run 'npm init'
* run 'npm install express ejs --save' 
* create views directory for the html files and public directory for css
* make patials directory in views for partial headers, footers and any other partial you want to add
* add partials header and footer by writing - <% include partials/header %> at the top of the file and <% include partials/footer %> at the bottom
    NOTE: Adding / before partials will throw an error
* install body-parser like - 'npm install body-parser --save' to use the input name element to get data and store into the array as a new camp
* import body-parser like - 'var bodyParser = require("body-parser")' and use it like - 'app.use(bodyParser.urlencoded({extended: true})); '
* import mongoose for mongoDB - npm install mongoose --save
* ####### Changing the = sign to a - makes the js stuff in it get run as code instead of just text: <%- sth.title %>   ############


Notes:
* res.send() is to send texts on the page; not through a html file and res.render() is to render an html file on a page
* Let's say we have our input fields stretching all the way across. we can do a few things: first put them in a div which will cennter it and shrink it
    next: put it in another div which will be in grid format and then use css to give a margin and make it take up say 30% of the container. 

# YelpCamp
* Adding Landing Page
* Adding Campgrounds Page that lists all campgrounds


Each campground has:
* Name
* Image
* each campgorund for now will be an array with objects having a name and image eg:

[
    {
        name:"blah blah", image: "http://www.blah.come"
    }
    {
        name:"blah blah", image: "http://www.blah.come"
    }
    {
        name:"blah blah", image: "http://www.blah.come"
    }
]


# Layout and Basic Styling
* Create header and footer partials
* Add in Bootstrap


# Creating new Campgrounds
* Setup new campground POST route
    - for both the app.get() and app.post() we'll have "/campgrounds" in the paranthesis. This format is called REST. So when we're showing a list of 
    - camps or friends or whatever OR when we're adding a new campgroud/friend/whatever we use the same url even though the type for one is get and
    - another is post
    - /campgorund/new is the convention to show the form to add something so like - app.get("/campgrounds/new");
* Add in body-parser
* Setup route to show form
* Add basic unstyled form

# Style the campgrounds page
* Add a better header title
* Make campgrounds display in a grid


# Style the Navbar and Form
* Add a navbar to all templates
* Style the new campground form


# Add Monngoose
* Install and configure mongoose
* setup campground model
* use campground inside of our routes


# Show Page
* review RESTful routes we've seen so far
* Add description to our campground model
* Show db.collection.drop() - mongo > show dbs > use "db_name" > show collections > db.campgrounds.drop() - drops all campgrounds in the database;
                                                                                  > db.campgrounds.find() - gives us all the campgrounds on the database
* Add a show route/template
*  db_name.findById(id, callbackfunction(){
   if(err){} 
    else {}
});

RESTful routes: (there are 7 of them)

    name of route | url     |     verb      |      description
1.   INDEX route    /dogs           GET         display a list of all dogs
2.   NEW            /dogs/new       GET         displays the form to make a new dog (works with CREATE)
3.   CREATE         /dogs/          POST        add new dog to DB
4.   SHOW           /dogs/:id       Get         shows info about one dog (or post or campground etc) [the id tells us which dog's info to show]
5.   Edit           /dogs/:id/edit  Get         show edit form for one dog (just the form; same as NEW; works with UPDATE)
6.   Update         /dogs/:id       PUT         Update a particular dog, then redirect somewhere
7.   Destroy        /dogs/:id       DELETE      Delete a particular dog, then redirect somewhere

Nested routes eg:

8.        NEW         /campgrounds/:id/comments/new   GET
9.        CREATE      /campgrounds/:id/comments       POST


# RESTful Routing

# intro:
* Define REST and explain why it matters
 - REST is a pattern or way of mapping betwen HTTP routes and CRUD
* List all 7 RESTful routes
* Show eg of RESTful routing in practice


# Refactor Mongoose Code
* Create a models directory 
* Use models.export
* Require everything correctly

# Add Seeds File
* Add a seed.js file - this is like a dummy file to have all the comments and a few campgrounds working so we can test our comments
                        - this is what people call error driven development - we write code and it has errors and we keep fixing them until errors go away
* Run the seeds file every time the server starts


# Add the Comment model
* Make our errors go away
* Display comments on cmapground show page


# Comment New/Create
* Discuss nested routes - We'll need to associate the comments being added to a particular campground so we need to nest them together like so:
        NEW         /campgrounds/:id/comments/new   GET
        CREATE      /campgrounds/:id/comments       POST

* Add the comment new and create routes
* Add the new comment form

# Style SHOW Page
* Add sidebar to SHOW page
* Display comments nicely

# Auth pt 1 - Add User Model
* Install all packages needed for authencation
* Define User Model

# Auth pt 2 - Register
* Configure Passport
* Add register routes
* Add register template

# Auth pt 3 - Login
* Add login routes
* Add login template

# Auth pt 4 - Logout/Navbar
* Add logout route
* Prevent user from adding a comment if not signed in
* Add links to navbar
* Show/hide auth links correctly

# Auth pt 5 - 
* Show/Hide auth links in navbar correctly

# Refactor The Routes
* Use Express router to recognize all routes

# Users + Comments
* Associate users and comments
* Save author's name to a comment automatically

# Users + Campgrounds
* Prevent an unauthenticated user from creating a campground
* Save username + id to newly created campground

# Editing Campgrounds
* Add Method-Override
* Add Edit Route for Campgrounds
* Add Link to Edit Page
* Add Update Route
* Fix $set problem

# Delete Campgrounds
* Add Destroy Route
* Add Delete button

# Authorization pt 1: Campgrounds
* User can only edit his/her campgrounds
* User can only delete his/her campgrounds
* Hide/Show edit and delete buttons

# Editing Commnets
* Add Edit route for comments
* Add Edit button

campground edits: /campgrounds/:id/edit
comment edits: /campgrounds/:id/comments/:comment_id/edit

# Deleting comments
* Add Destroy route
* Add delete button

# Authorization part 2: Comments
* User can only edit his/her comments
* User can only delete his/her comments
* Hide/Show edit and delete buttons
* Refactor middleware

# Adding in Flash
* Demo working version
* Install and configure connect flash - you use the flash code or show it up before the redirect 'lines/commands' 
* Add bootstrap alerts to header

# 





# Practice Exercise Authentication

# Intro to Authentication
* What tools are we using? (packages)
 - Passport
 - Passport local
 - Passport local mongoose

* Walkthrough Authentical flow
* Discuss sessions
 - express-sessions

# Auth code along part 1
* Set up folder structure
* Install needed packages 
 - npm install express, mongoose, passport, passport-local, passport-local-mongoose, body-parser, express-session, ejs --save
* Add root route and template
* Add secret rote and template


# Auth code along part 2
* Create User model
* Configure passport

# Auth code along pt 3
* Add register routes
* add register form

# Auth code along pt 4
* Add login routes 
* Add login form

# Auth code along pt 5
* Add logout route
* Add isLoggedIn middleware to check if user is logged in or not