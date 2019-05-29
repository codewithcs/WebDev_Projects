var container = document.querySelector('.container') ; 

var ball = document.querySelector('#ball' ) ;

var paddle = document.querySelector ( '.paddle' ) ;

var btn_start = document.querySelector ( '.startBtn' ) ;


var score = 0 ; 

var lives = 5 ;

var gameOver = false  ;

var gameInPlay = false ; 

var ballDir = [5,5,5] ; // x,y,speed 

var animationRepeat ; 

var containerDim = container.getBoundingClientRect() ; // why we used this ? 

btn_start.addEventListener ( 'click' , startGame ) ; 
// click the start button to start the game. 

document.addEventListener( 'keydown' , function ( e) { 

    var key = e.keyCode ;

    e.preventDefault() ; 
    //console.log(key) ; 

    if ( key === 37 ) { 
        paddle.left = true ;  // this is only true for the time for which the left key is pressed. 
    }                         // It becomes false when the key is released.
                             // move the paddle left 

    else if ( key===39) { // === first checks the type and then the value 
        paddle.right = true ; 
    } // move the paddle right 

    else if ( key ===38 && !gameInPlay ) { gameInPlay = true ; }

} ) ;

document.addEventListener ( 'keyup' , function (e) {  // triggered when a key is released. 
    var key = e.keyCode ; // the key which key is released

    e.preventDefault() ; 
    //console.log(key) ; 

    //console.log("No key pressed") ; 

    if ( key === 37 ) { 
        paddle.left = false ; 
    } 

    else if ( key === 39 ) {
        paddle.right = false ; 
    }  


} ) ; 


function startGame (){


document.querySelector('.gameOver').style.display = 'none' ; // hide the gameover element

ball.style.display = 'block' ; // display ball as a block level element.

animationRepeat = requestAnimationFrame(update) ; 

gameOver = false ;

gameInPlay = false ; 

} ; 

function update () {

if ( gameOver === false ){

var pCurrent = paddle.offsetLeft ;  // left end of the paddle ; also can take the right end 

if( paddle.left && pCurrent > 0 ) {  //paddle : global variable 
pCurrent -= 5 ;
}

else if ( paddle.right && pCurrent <  ( containerDim.width - paddle.offsetWidth )  ) {
pCurrent += 5 ; 
} // dont write only else 

paddle.style.left = pCurrent + 'px' ; 

if ( !gameInPlay ){  // gameInPlay will change by pressing the up key 
waitingOnPaddle() ;
}
else{
ballMove() ;   // release the ball by updating gameInPlay from false to true. 
}

animationRepeat = requestAnimationFrame(update) ; 
// loop for the above code. 

}

}




function waitingOnPaddle( ){
ball.style.top = ( paddle.offsetTop - 21 ) + 'px' ; // dont forget 'px; 
ball.style.left = ( paddle.offsetLeft + 70 ) + 'px' ; 
}
// This is called inside update() thats why ball moves along with paddle. 
// paddle.offsetTop, etc also get changed. 




function ballMove( ) {
// move the ball when the game is in play. 

var x = ball.offsetLeft ;  // current position of the ball // left and top end of the ball
var y = ball.offsetTop ;

if (  x < 0 || x > ( containerDim.width - 25 ) ) {
    ballDir[0] *= -1 ;
} 
if ( y > (containerDim.height-25) || y < 0 ) {
   
    if ( y > ( containerDim.height -25 ) ) {
        fallOffEdge() ;
        return ; 
    }
    ballDir[1] *= -1 ;
}
// origin for x,y : top left of the container. 
// going down : +ve y , going up : -ve y 

// if there is a collision between ball and paddle
// then set ballDir[0] and ballDir[1] accordingly. 


if ( isCollide ( ball, paddle ) ) {
var nDir = ( ( x - paddle.offsetLeft ) - ( paddle.offsetWidth / 2 ) ) / 10 ; 
// dividing by 10 is useful for setting ballDir[0] ( for changing x coordinate ) 

ballDir[0] = nDir ;
ballDir[1] *= -1 ; 
}


x = x + ballDir[0] ;
y = y + ballDir[1] ; 

ball.style.top  = y + 'px' ;  // new position of the ball
ball.style.left = x + 'px' ;  // Don't forget 'px' when assigning css property

}



function isCollide ( a, b ){ // checking collision of elements a and b. 

    var aRect = a.getBoundingClientRect ;

    var bRect = b.getBoundingClientRect ;

// console.log ( aRect ) ; console.log ( bRect ) ;

return ( ! ( aRect.bottom < bRect.top || aRect.top > bRect.bottom || 
    aRect.right < bRect.left || aRect.left > bRect.right ) ) ;

}

function fallOffEdge ( ) {
    lives-- ; 

   if ( lives === 0 ) {
       // endGame () ;
    }

lifeUpdater () ; 
stopper () ; 

}

function stopper ( ) {
    gameInPlay = false ; 
    ballDir[0,-5] ; 
    waitingOnPaddle () ; 
    window.cancelAnimationFrame(animationRepeat) ; 
}

function lifeUpdater (){
    document.querySelector('.lives').innerText = lives ; 
}
