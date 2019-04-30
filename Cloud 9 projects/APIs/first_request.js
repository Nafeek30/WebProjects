//github.come/request/request

//declaring the request package in var request
var request = require('request');
//the first part makes the request (here to google.com), and the second part (the function)  is needed for the callback and what we want to do
//the first param in function is error - holds any error we get, 
request('http://www.google.com', function(error, response, body) {
    if(error){
        console.log("something went wrong");
        console.log(error);
    } else {
        if(response.statusCode == 200){
            //things worked
            //how to convert the json string we get back from an API to an object format so we can extract whatever data we need from it
            var parsedData = JSON.parse(body);
            console.log(parsedData);
            
            //console.log(parsedData["query"]["results"]["chanel"]["astronomy"]) - gets the time of sunset in hawaii by using yahoo weather API - doesn't work anymore
        }
    }
});