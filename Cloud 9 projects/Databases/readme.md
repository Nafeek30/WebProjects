# Databases
 
* What's a database?
    - A collection of info/dataand has an interface (ie you can interact with it)
* SQL (relational db) or NOSQL (non relational db)
    - Relational DB are tabular ie are in a table format
    - Non-relational DB don't follow a rigid pattern and look like js eg:
    
        {
            name: "Ira",
            age: 24,
            city: Missoula,
            comments: [
                {text: "come visit montana!"},
                {text: "seriously montana is great!"}
            ]
        }


# Intro to MongoDB
* What is it? why use it? 
    - nosql DB;

# Mongo Commnads
* mongod - starts the mongo demon/mongo process. use this to start mongodb and will run in the background 
* mongo - opens up the mongo shell (like the js console on a browser) to debug, testing etc
* help - gives us helpful commands
* show dbs - shows our default database mongo knows about - we'll make a separate db for every app we make
* use - to use/create a db; type "use db_name" and if it exists we'll use it or if it doesn't we create it
* insert - insert/create a collection by typing "db.something.insert({name: "aaa", breed: "aaa"})" etc
* show collections - shows us what collections we've created in the db we're using
* find - to view all instances of a collection; type "db.something.find()" and if we don't type anything in parantheses it returns all instances
* update - updates an instance's info by first selecting it by sth (eg a name) and then setting the changes like - 
    "db.something.update({name: "nafee"}, {$set: {name: "kazi", isStudent: true}})"  - this will change the previous name of this field from nafee to kazi and 
    and add a new attribute isStudent and set it to true. NOTE: If you don't use $set: it'll completely redo the obj. it and only keep whatever is changed
* remove - removes an instance like - db.something.remove({breed: "poodle"}) - by default it removes everything that matches but we can limit it using -
    "db.something.remove().limit(some_nnumber)"

# Mongoose
* What is it? Why use it? Interact with mongo DB using it.
    - package to interact with mongodb easily just like jquerty makes it easy to interact with the dom easily
    - 