//const is any var we don't need to change or rewrite in the code
const request = require('request');

//getting placehold data to test APIs from jsonplaceholder.typicode.com
request('https://jsonplaceholder.typicode.com/users/1', function(error, response, body){
    //locus is a packsge we can get by doing 'npm i -D locus' and it freezes the code at this point and we have access to any of the variables here 
    //eval(require("locus"));
    if(error && response.statusCode == 200){
        var parsedData = JSON.parse(body);
        console.log('${parsedData.name} lives in ${parsedData.address.city}');
    }
});