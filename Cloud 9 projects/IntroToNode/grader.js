function average(arr){
    var sum = 0;
    
    //can use a foreach here
    arr.forEach(function(array){
       sum += array; 
    });
    
    //for(var i = 0; i < arr.length; i++){
      //  sum += arr[i];
    //}
    sum = sum / arr.length;
    return Math.round(sum);
}

var scores = [90, 98, 89, 100, 100, 86, 94];
console.log(average(scores));