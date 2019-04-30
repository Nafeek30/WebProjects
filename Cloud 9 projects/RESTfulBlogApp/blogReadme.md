# Blog index
* Setup the blog
* create the blog model
* Add INDEX route and template
* Add Simple Nav bar

# Basic Layout
* Add header and Footer partials
* Include Semantic UI
* Add simple nav

# Putting the C in CRUD
* Add a NEW route
* Add NEW template
* Add CREATE route
* Add CREATE template

# SHOWtime
* Add SHOW route
* Add SHOW template
* Adds links to SHOW page
* Style SHOW template


# Edit/Update
* Add EDIT route
* Add EDIT form
* Add UPDATE route
* Add UPDATE for
* Add Method-Override - first : npm install method-override --save; Also must use POST request in method to override to use this  THEN: 
                      - overrides a method like update's url app.put("/sth/:id", ...) overriding show's url app.get("/sth/:id", ...) because html doesn't
                            support put and delete requests yet:
                            The way to do this is change the method of the form to "POST"  instead of "PUT" and change the action of the form to 
                                                            "/sth/<%= idname._id %>?_method=PUT" -- the last part with the ? overrides the method to a 
                                                                     PUT or DELETE or whatever other method; it works with all



# Destroy
* Add DESTROY route
* Add Edit and Destroy links

# Final Updates
* 