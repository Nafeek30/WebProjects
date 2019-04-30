//Another way to do all this is to create a game object and not have functions floating around but to keep them inside objects for example:

//var game = {}
//
//game.init = function(){
//    setUpModeButton();
//    setUpSquares();
//    reset();
//}


//var colors = [
//    "rgb(255, 0, 0)",
//    "rgb(255, 255, 0)",
//    "rgb(0, 255, 0)",
//    "rgb(0, 255, 255)",
//    "rgb(0, 0, 255)",
//    "rgb(255, 0, 255)"
//]

var numSquares = 6;
var colors = [];
var pickedColor; //function to randomly pick colors from the array
var squares = document.querySelectorAll(".square");
var colorDisplay = document.getElementById("colorDisplay"); //for h1 -> span - could use querySelector() as well but then will need # because it's an id
var messageDisplay = document.querySelector("#message"); //message part that says correct or try again
var h1 = document.querySelector("h1"); //h1 to change the h1 color when player gets answer right
var resetButton = document.querySelector("#reset"); //new game button
var modeButtons = document.querySelectorAll(".mode"); //this is how we select both easy and hard buttons. This also allows us to create more difficulty level without having to add new code as we're selecting all of them

//this runs everything that needs to be run when the page reloads
init();


//contains all the different initializing functions 
function init(){
    setUpModeButton();
    setUpSquares();
    reset();

} //end of init


//mode button set up function
function setUpModeButton(){
    //making click events for both buttons simultaneously
    for(var i = 0; i < modeButtons.length; i++){
        modeButtons[i].addEventListener("click", function(){
            //removing the selected class from both buttons and adding it to the one selected
            modeButtons[0].classList.remove("selected");
            modeButtons[1].classList.remove("selected");
            this.classList.add("selected");

            //figure out how many squares to show
            //pick new colors
            //pick a new picked color
            //update page to reflect changes
            //all these are done in reset function
            this.textContent === "Easy" ? numSquares = 3: numSquares = 6;
            //the above line basically does the same thing as the following if statement
            //        if(this.textContent === "Easy"){
            //            numSquares = 3
            //        } else {
            //            numSquares = 6
            //        }

            reset(); //then use the reset function to do the similar stuff for whatever numSquare is

        });
    }
}

//setting up the squares initially
function setUpSquares(){
    //this loop assigns the squares their colors and also changes their colors as we click on them to make them disappear by changing clicked box colors to background color
    for(var i = 0; i < squares.length; i++){

        //change initial colors
        //squares[i].style.backgroundColor = colors[i]; //no need for this because we'll use reset

        //add click listeners to squares
        squares[i].addEventListener("click", function(){
            //grab color of clicked square
            var clickedColor = this.style.backgroundColor;
            //compare color to picked color
            if(clickedColor === pickedColor){
                messageDisplay.textContent = "Correct!";
                changeColors(clickedColor);
                h1.style.backgroundColor = clickedColor;
                resetButton.textContent = "Play Again?";
            } else{
                this.style.backgroundColor = "#232323";
                messageDisplay.textContent = "Try Again";
            }
        });
    }
}


//function to use to do the repeated stuff for mode buttons
function reset(){
    //generate all new colors
    colors = generateRandomColors(numSquares);
    //pick a new random color from array
    pickedColor = pickColor();
    //change colorDisplay to match picked color
    colorDisplay.textContent = pickedColor;
    //change the text of the reset button to new colors when we click play again
    resetButton.textContent = "New colors";
    //change the message to empty again when we start a new game
    messageDisplay.textContent = "";
    //change colors of squares
    for(var i = 0; i < squares.length; i++){
        //check for whether the squares have a color based on 3 or 6 colors and hide the bottom squares if they don't have a color: ie we are on easy mode; and show them again on hard mode
        if(colors[i]){
            //show these squares
            squares[i].style.display = "block";
            //change the color of the squares
            squares[i].style.backgroundColor = colors[i];
        } else {
            //hide these squares
            squares[i].style.display = "none";
        }  
    }
    h1.style.backgroundColor = "steelblue";
} //end of reset function


////click event for easy Button
//easyBtn.addEventListener("click", function(){
//    //turning off class for hard button
//   hardBtn.classList.remove("selected");
//    //turning on class for easy
//    easyBtn.classList.add("selected");
//    //change numSquares to 3
//    numSquares = 3
//    //generate 3 colors for easy mode
//    colors = generateRandomColors(numSquares);
//    //pick a new random color from them
//    pickedColor = pickColor();
//    //display new correct color's rgb in h1 span
//    colorDisplay.textContent = pickedColor;
//    //loop through all 6 squares to change top 3 colors and hide bottom 3 colors
//    for(var i = 0; i < squares.length; i++){
//        //if a square has a color - because only top 3 will have a color now
//        if(colors[i]){
//            //change the background color of those squares to generated colors
//            squares[i].style.backgroundColor = colors[i];
//        } else {
//            //hide the other squares
//            squares[i].style.display = "none";
//        }
//    }
//});
//
//
////click event for hard button
//hardBtn.addEventListener("click", function(){
//   easyBtn.classList.remove("selected");
//    hardBtn.classList.add("selected");
//    //change numSquares to 6
//    numSquares = 6
//    //generate 6 colors for easy mode
//    colors = generateRandomColors(numSquares);
//    //pick a new random color from them
//    pickedColor = pickColor();
//    //display new correct color's rgb in h1 span
//    colorDisplay.textContent = pickedColor;
//    //loop through all 6 squares to change the 6 colors
//    for(var i = 0; i < squares.length; i++){
//            //change the background color of those squares to generated colors and display them all
//            squares[i].style.backgroundColor = colors[i];
//            squares[i].style.display = "block";
//    }
//});


//click event for reset button
resetButton.addEventListener("click", function(){
    reset();
});

//colorDisplay.textContent = pickedColor; //no need because we're calling reset in init function which will do this




//this function changes all the square color to the correct answer color if the player guesses correct
function changeColors(color) {
    //loop through all squares
    for(var i = 0; i < squares.length; i++){
        //change color to correct answer color
        squares[i].style.backgroundColor = color;
    }
}


//returns one random color from the colors array
function pickColor(){
    //pick a random number
    //Math.floor(Math.random() * 6 + 1); //gets colors between 1 and 6; rand gets rand values betn 0 and 1; * 6 get up to 5.99; + 1 and then floor gets 1 - 6
    var random = Math.floor((Math.random() * colors.length));
    //return the random array position as picked color
    return colors[random];
}

//*******THIS IS HOW YOU CAN ASSIGN AN ARRAY TO A VARIABLE THROUGH A FUNCTION*********
//generates num number of random colors for the colors array at the top for easy and hard mode
function generateRandomColors(num){
    //make an array
    var arr = [];
    //add num random colors array
    for(var i = 0; i < num; i++){
        //get random color and push into array
        arr.push(randomColor());
    }
    //return that array
    return arr;
}


// generates the random colors in rgb(r, g, b) format to put inside the colors array
//---used by generateRandomColors() function---
function randomColor(){
    //pick a red from 0-255 and the same for green and blue
    var r = Math.floor(Math.random() * 256); //red
    var g = Math.floor(Math.random() * 256); //green
    var b = Math.floor(Math.random() * 256); //blue

    //return in rgb format
    //there needs to be spaces after the comma or the comparision to check correct color vs picked color won't match because of === and all picks will be incorrect
    return "rgb(" + r + ", " + g + ", " + b + ")";
}