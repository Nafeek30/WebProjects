//importing express 
var express                         = require("express");
var app                             = express();
//add body-parser
var bodyParser                      = require("body-parser");
//add mongoose
var mongoose                        = require("mongoose");
//setting up connect-flash to add flash messages as alerts 
var flash                           = require("connect-flash");
//setting module.export for campground schema to Campground
var Campground                      = require("./models/campground");
//setting module.export for comment schema to Comment
var Comment                         = require("./models/comment");
//import method-override to use to update and delete campgrounds and comments
var methodOverride                  = require("method-override");
//require all the packages for authentication
var passport                        = require("passport");
var LocalStrategy                   = require("passport-local");
var User                            = require("./models/user");
//using the seeds.js file
var SeedDB                          = require("./seeds");

//Add/Declare all the refactored routes!!!
var commentRoutes       = require("./routes/comments"),
    campgroundRoutes    = require("./routes/campgrounds"),
    indexRoutes         = require("./routes/index");


//creating a database with mongoose for yelp camp
mongoose.connect("mongodb://localhost:27017/yelp_camp", { useNewUrlParser: true });

//tell express to use body parser
app.use(bodyParser.urlencoded({extended: true}));

//set view engine to ejs to use ejs files without extensions
app.set("view engine", "ejs");

//use our custom main.css file here by telling express to serve the public directory 
app.use(express.static(__dirname + "/public"));

//using method-override
app.use(methodOverride("_method"));

//start the seedDB
SeedDB();



//PASSPORT CONFIGURATION
app.use(require("express-session")({
    secret: "Nafee is the cooliest",
    resave: false,
    saveUninitialized: false
}));

app.use(flash()); //MUST come before passport configuration in app.js
app.use(passport.initialize());
app.use(passport.session());
//the next line - local strategey is what we call when we use the middleware in login post
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//creating another middleware to pass in current user to every route we have
app.use(function(req, res, next){
   //whatever we put in our local is the current user
   res.locals.currentUser = req.user;
   //setting up flash messages for every route so we can use different flash messages for different routes
   res.locals.error = req.flash("error");
   res.locals.success = req.flash("success");
   next();
});


//Tell our website to use the three routes we created
//shorten the route url names by adding the common terms inside the app.use below; NOTE: nothing common in index so we can leave it as is
app.use(indexRoutes);
app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);



//crerating server listen
app.listen(process.env.PORT, process.env.IP, function(){
   console.log("YelpCamp server started"); 
});