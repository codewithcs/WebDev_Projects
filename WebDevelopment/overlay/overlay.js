var b =    document.getElementById("btn-menu") ; // returns the dom object of the menu button 

b.addEventListener("click" , toggleMenu ) ;


function toggleMenu ( e ) {  // e is a reference to the event and is passed to this function when an event occurs. 

var eventTarget = e.target ; // returns the element that triggered the event.  returns the DOM object of MENU button. 

var divOverlay = document.getElementsByClassName("overlay")[0] ; 

var speed = 10 ;  // for fade in and fade out speed. 

if ( eventTarget.className == "btn-open" ) {
    fadeIn(divOverlay, speed) ; 
    eventTarget.className = "btn-close" ;
}
else {
    fadeOut ( divOverlay, speed ) ; 
    eventTarget.className = "btn-open" ; 
}
// Hide the menu navigation with fade in and fade out feature. 

} 

function fadeIn (element , speed ){

    var inInterval = setInterval ( function () {  // setInterval() method will call this function after 10 milliseconds. 
// gradually increase the opacity level of overlay 

element.style.opacity = Number ( element.style.opacity ) + 0.02 ; 
// Number() function converts overlay opacity object into a value. 

if ( element.style.opacity >= 1  ){  // if opacity level reaches to 1 then setInterval() method should be stopped. 
    element.style.opacity = 1 ; 
    clearInterval(inInterval) ; 
}

    } , speed ) ;

}

function fadeOut ( element, speed ) {

    var outInterval = setInterval ( function () {  
        
        element.style.opacity = Number ( element.style.opacity ) - 0.02 ; 
        
        
        if ( element.style.opacity <= 0  ){   
            element.style.opacity = 0 ; 
            clearInterval(outInterval) ; 
        }
        
            } , speed ) ;
        

}

