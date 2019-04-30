//check off specific todos by clicking using a 'toggle function' on css class '.completed'

//here we use on because if we used click we wont be able to delete future added list items. Also the way it works is that the element that on is firing on must exist beforehand when the page loads, so since not all the li's exist yet we set the on to the 'ul' and then inside we write "li" as the second parameter which means execute the function for on only on the 'li' elements inside ul and not the whole thing
$("ul").on("click", "li", function(){
    $(this).toggleClass("completed");
}); 

//refer to above for the on changes
//click on X to delete todos
//NOTE: when you click on a span it bubbles into firing on its parent containers as well. eg here clicking on span will also trigger li, il, container div and body as well
$("ul").on("click", "span", function(event){
    
    //the following line of code stops this bubbling propagation
    event.stopPropagation();
    
    //this is the span that we click on and parent is the parent element to the 'this' which here is the li and we an remove (remove instantly with remove() method) it that way by fading it out and then removing it because just fading out only hides it not delete it
    $(this).parent().fadeOut(500, function(){
        $(this).remove(); 
    });
});


//adding todos using the input field
$("input[type='text']").keypress(function(event){
    
   //check if the enter key is pressed whose code is 13 
    if(event.which === 13){
        //use val() function to extract what is in the input field; note that this here is the input[type = text] that is there in the input field at the time of enter key being pressed
        var todoText = $(this).val();
        
        //giving the input field an empty string after we hit enter
        $(this).val("");
        //create a new li and add to ul and we'll do it by using append() and also add the span tag for the delete button
        $("ul").append("<li><span><i class='fa fa-trash'></i></span> " + todoText + "</li>");
        
    }
});

//toggling the input box to fade in or out when the plus icon is clicked
$(".fa-plus").click(function(){
    $("input[type='text']").fadeToggle(100);
})