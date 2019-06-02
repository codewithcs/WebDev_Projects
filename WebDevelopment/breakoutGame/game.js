// gameInPlay = false does not mean that the game is over. 

var container = document.querySelector('.container') ; 

var ball = document.querySelector('#ball' ) ;

var paddle = document.querySelector ( '.paddle' ) ;

var btn_start = document.querySelector ( '.startBtn' ) ;


var score = 0 ; 

var lives = 1  ;

var gameOver = true  ;

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


function startGame (){  // add an if here so that user does not keep pressing start 

if ( gameOver === true ) {

document.querySelector('.gameover').style.display = 'none' ; // hide the gameover element

ball.style.display = 'block' ; // display ball as a block level element.

setUpBricks ( 20 ) ; 

lifeUpdater() ; 

animationRepeat = requestAnimationFrame(update) ; 

gameOver = false ;

gameInPlay = false ; 

}

} ; 


function setUpBricks ( num ) { // num is the number of bricks that the user wants to set up. 

var row = {  // different values for x and y. 
    
    x : ( (containerDim.width % 100  ) / 2 ) ,

    y : 50 

} ;

for ( var x = 0 ; x < num ; x++ ) {  // x,y : position of the brick wrt top left origin of the container. 
// this x != row.x

if ( row.x > ( containerDim.width - 100 ) ) { // the first row is full now ; row.x + 100 > containerDim.width 

    row.y += 70 ; 

    row.x = (containerDim.width % 100  ) / 2 ; 

}

// whenever we run off the edge with the bricks we can start again to a new row. 

    brickMaker ( row ) ;

    row.x += 100 ; 


}
 

}

function brickMaker ( row ) { // make each individual brick 

var div = document.createElement ( 'div' ) ; 

div.setAttribute ( 'class' , 'brick' ) ;

container.appendChild( div ) ; // gives us the ability to add newly created div to our container 

div.style.background =  'linear-gradient(' + randomColor() + ', #ddd)' ;//randomColor() ;
// using backgroundColor with linear-gradient behaves differently 

var pointDiv = Math.ceil ( Math.random()*7 ) + 3  ; 

div.dataset.points = pointDiv ;

div.innerHTML = pointDiv ; 

div.style.left = row.x + 'px' ; 

div.style.top = row.y + 'px' ; 

// need to position bricks with javascript 

}

function randomColor ( ){
function c() {
    var hex = Math.floor ( Math.random() * 256 ).toString(16) ;  // 0-255 ; base 16 hexadecimal value. 
// to ensure we get 2 characters returned 
    var response = ( '0' + String(hex) ).substr ( -2  )  ; 
    // returns the beginning characters. 
    // if we have only one character in the hex string then it will return 0 and one character. 
    // if we have 2 characters then it will return 2 characters. 
    return response; 
}

return '#' + c() + c() + c() ; 
}




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
waitingOnPaddle() ; // ball resting on the paddle 
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
   
    if ( y > ( containerDim.height - 25 ) ) {
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
var nDir = ( ( x - paddle.offsetLeft ) - ( paddle.offsetWidth / 2 ) ) / 10 ;  // can change this 
// also see logic of this. 

// dividing by 10 is useful for setting ballDir[0] ( for changing x coordinate ) 

ballDir[0] = nDir ;
ballDir[1] *= -1 ; 

}



// check for collision of ball with bricks 

var brickArr  = document.querySelectorAll('.brick') ;  // grab all the elements that are bricks. 
// brick is an array. 

if ( brickArr.length == 0 ) {
    stopper( ) ; 
    setUpBricks(30) ; 
}

for ( var brick of brickArr) {

if ( isCollide ( ball, brick ) ) {
ballDir[1] *= -1 ; 

brick.parentNode.removeChild ( brick ) ; // remove the child that matches brick  
scoreUpdater ( brick.dataset.points ) ;
// within each brick we have got a dataset
// and we have got a number of points.

}

}

x = x + ballDir[0] ;
y = y + ballDir[1] ; 

ball.style.top  = y + 'px' ;  // new position of the ball
ball.style.left = x + 'px' ;  // Don't forget 'px' when assigning css property

}



function isCollide ( a, b ){ // checking collision of elements a and b. 

    var aRect = a.getBoundingClientRect() ;

    var bRect = b.getBoundingClientRect() ;

// console.log ( aRect ) ; console.log ( bRect ) ;

return ( ! ( aRect.bottom < bRect.top || aRect.top > bRect.bottom || 
    aRect.right < bRect.left || aRect.left > bRect.right ) ) ;

// see the logic here. 

}

function fallOffEdge ( ) {
    lives-- ; 

   if ( lives < 1 ) {
        endGame () ;
        lives = 0 ; 
    }

lifeUpdater () ; 
stopper () ; 

}


function endGame() {
    document.querySelector('.gameover').display = 'block' ; 
    document.querySelector('.gameover').innerHTML = 'Game Over <br>' + 'Your Score : ' + score ; 
    gameOver = true ; 
    ball.style.display = 'none' ; 

    var tempBricks = document.querySelectorAll ('.brick') ; 
    for ( var brick of tempBricks ) {
        brick.parentNode.removeChild ( brick ) ;
    }

}

function scoreUpdater ( num ) {
score = score + parseInt(num) ; 
document.querySelector('.score').innerHTML = score ; 
}


function stopper ( ) {
    gameInPlay = false ; 
  //  ballDir[0,-5] ;  // what is the use of this ? 
    waitingOnPaddle () ; // this is called update() 
    window.cancelAnimationFrame(animationRepeat) ; 
}

function lifeUpdater (){
    document.querySelector('.lives').innerText = lives ; 
}
