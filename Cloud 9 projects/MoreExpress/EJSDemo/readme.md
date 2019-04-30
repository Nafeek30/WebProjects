# Styles and partials 
    
* Summary of below: 
    1. use partials for parts of the website that will stay static-y eg the top navbar icons in facebool. the stuff of the left and right
    2. make the dynamic part of the website dynamic using the appropriate tags - eg facebook posts, pics, comments etc
    
* how to properly include public assets 
* properly configure app to use ejs
* use partials to dry up code

* we can tell express that the files we'll be using are ejs files and so we won't have to type home.ejs, love.ejs etc in the res.render() functions like 
* this - app.set("view engine", "ejs");
    
    
* we're going to put our css files in a dir called 'public' which is usually how this dir is named (just like the ejs dir is called 'views' commonly)
* if we want other files to use the app.css stylesheet we just need to put that link tag in those files and we cna use the css styles for those files

* tell express what directories to use by using in the .js file (here it's app.js) - app.use(express.static("directory_name"));
* Express will automatically only use the views directory and no other unless specified 


* we'll make a new directory inside partials to create templates of the html headers and footers so i cna just tell the different ejs files that we'll be
* using these templates when we do and it will dry up our code
* Now let's say we want a common navbar in our pages then we can have a- <% include partials/navbar %> tag in the files to link this easily


