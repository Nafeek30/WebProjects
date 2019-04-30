//ADDING FAKER API from npm
var faker = require("faker");

//creating random product name and price using faker
//var randomProduct = faker.commerce.productName();
//var randomPrice = faker.commerce.price();

for(var i = 0; i < 10; i++){
    console.log(faker.commerce.productName() + " costs " + faker.commerce.price());
}