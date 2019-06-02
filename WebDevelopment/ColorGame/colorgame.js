var colors = [ 
    "rgb(255, 0, 0)" , 
    "rgb(255, 255, 0)", 
    "rgb(0, 255, 0)" , 
    "rgb(0, 255, 255)" ,
    "rgb(0, 0, 255)" , 
    "rgb(255, 0, 255)" ] 

var winningcolor = pickColor()  ;   /// create a winning color from the array randomly. 

var displayColor = document.getElementById("displaycolor" ) ; 

var messageDisplay = document.querySelector ( "#message" ) ; 

displayColor.innerHTML = winningcolor ; 

// to hide an element , display :none or if the element on the body then 
//we can make the backgroundcolor of this element same as that of body. 

var squares = document.querySelectorAll ( ".square" ) ;  // or getElementsByClassName 


for ( var i = 0 ; i < squares.length ; i++ ) {
    squares[i].style.background = colors[i] ; 

squares[i].addEventListener ( "click" , function() {
  // alert("Clicked a Square") ; // callback function. 

   // this: item that is clicked on 

  var clickedColor = this.style.background ; 

  if ( winningcolor === clickedColor ) {
      messageDisplay.style.textContent  = "Correct" ; 
      //alert("Winner") ; 

         changeColors ( winningcolor ) ; 
      

  }
  else {
      this.style.background = "#232323" ;
      messageDisplay.textContent = "Try Again" ; 
  }

}) ; 
}

// event handler to every single square. 

function changeColors ( color ) {
    // loop through all colors.
    // change each color to match given color. 

    for ( var i=0 ; i < colors.length ; i++ ) {
        squares[i].style.background = color ; 
    }
    
}


function pickColor () { // Math.random() gives a number in [0,1)
// choose a random winning color from the array. 
var random = Math.floor ( Math.random() * colors.length ) ; 
return colors[random] ;
}


















