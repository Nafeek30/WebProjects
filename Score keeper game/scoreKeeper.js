var p1Button = document.querySelector("#p1"); //this selecetor requires the # for id types
var p2Button = document.getElementById("p2"); //this selecetor doesn't require the # or such
var resetButton = document.getElementById("reset");
var numInput = document.querySelector("input");
var p = document.querySelector("p");
//var h1 = document.querySelector("h1");

var p1Display = document.querySelector("#p1Display");
var p2Display = document.querySelector("#p2Display");
var winningScoreDisplay = document.querySelector("p span"); //gets the span inside the paragraph. note we can do this becuase there's only one p and one span inside it so no need for an id in the html tag

var p1Score = 0;
var p2Score = 0;
var gameOver = false; //true if someone wins and we can't add anymore. then reset should reset it to false when clicked
var winningScore = 5;


p1Button.addEventListener("click", function(){
   if(!gameOver){
           p1Score++; 
       if(p1Score === winningScore){
           p1Display.classList.add("winner");//turns the score for the player in h1 to green with css
           
           gameOver = true; // when this is true the code for this 'eventListener' doesn't run anymore thus stopping us from adding to it
       }
    p1Display.textContent = p1Score;
   }
});


p2Button.addEventListener("click", function(){
    if(!gameOver){
            p2Score++; 
            if(p2Score === winningScore){
                p2Display.classList.add("winner");//turns the score for the player in h1 to green with css
                
                gameOver = true; // when this is true the code for this event doesn't run anymore thus stopping us from adding to it
            }
    p2Display.textContent = p2Score;
    }
});


resetButton.addEventListener("click", function(){
    reset();
});

//the change type in the even below means it changes the value no matter how the trigger was activated ie by hover, type, click etc
numInput.addEventListener("change", function(){
    //we can write this instead of numInput in the next two lines as well
    //here this refers to whatever the event was listening on ie numInput
    winningScoreDisplay.textContent = numInput.value;
    winningScore = Number(this.value); //because this .value is a string type so typecast it
    reset();
});


function reset() {
    //resets both player scores
    p1Score = 0;
    p2Score = 0;
    
    //resets both score display in h1
    p1Display.textContent = 0;
    p2Display.textContent = 0;
    
    //removes the green color from both player scores in h1
    p1Display.classList.remove("winner");
    p2Display.classList.remove("winner");
    
    //changes gameover to false so we can play again
    gameOver = false;
}