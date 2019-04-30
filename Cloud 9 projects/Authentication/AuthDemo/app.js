var express                 = require("express"),
    mongoose                = require("mongoose"),
    passport                = require("passport"),
    bodyParser              = require("body-parser"),
    User                    = require("./models/user"),
    LocalStrategy           = require("passport-local"),
    passportLocalMongoose   = require("passport-local-mongoose")
    
//tell express to use mongoose
mongoose.connect("mongodb://localhost:27017/auth_demo_app", {useNewUrlParser: true});
var app = express();
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));

//use express-session and use it as a function
app.use(require("express-session")({
    secret: "Nafee is the coolest",
    resave: false,
    saveUninitialized: false
}));
//tell express to use passport and passport-session; we need these two lines anytime we use passport
app.use(passport.initialize());
app.use(passport.session());


//we use the authenticate method that comes from passportLocalMongoose and we're just telling LocalStrategy to use that user.authenticate()
passport.use(new LocalStrategy(User.authenticate()));
//these tow methods are responsible for reading the session, taking the data from the session that's encoded, then unencode it (that's the deserialize) 
//then encoding it(ie serialize it again), and putting it back in the session.
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());



//==============
//ROUTES
//==============

//homepage
app.get("/", function(req, res){
    res.render("home");
});


//secret page with photo - 2nd param checks if user is logged in or not with my middleware; it's in 2nd param because it'll check before it renders anything
app.get("/secret",isLoggedIn, function(req,res){
   res.render("secret"); 
});

//Auth Routes

//show sign up form
app.get("/register", function(req, res) {
    res.render("register");
});

//handlign user sign up
app.post("/register", function(req, res){
    req.body.username
    req.body.password
    //we give the register function the username to store but it doesn't store the password, it hash-es it and stores stores that with a key to unhash it
    User.register(new User({username: req.body.username}), req.body.password, function(err, user){
        if(err){
            console.log(err);
            //shortcircuit and return user to the register page if there was an error
            return res.render("register");
        } else {
            passport.authenticate("local")(req, res, function(){
                res.redirect("/secret");
            });
        }
    });
});


//===========
//LOGIN ROUTES
//===========

//Render login form
app.get("/login", function(req, res) {
   res.render("login"); 
});

//login logic (post route)
//takes in a second param to passport.authenticate() as a middleware to check whether the user is correct or not
app.post("/login", passport.authenticate("local", {
    successRedirect: "/secret",
    failureRedirect: "/login"
}) ,function(req, res){
});

//logout route
app.get("/logout", function(req, res) {
    req.logout();
    res.redirect("/");
})




//creating my own middleware - next is the next thing that needs to be called; req and res are the same - req - requests data, res - sends data
function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        //basically keep going, move along, you're fine
        return next();
    }
    //else will do this
    res.redirect("/login");
}



app.listen(process.env.PORT, process.env.IP, function(){
    console.log("server started");
});

