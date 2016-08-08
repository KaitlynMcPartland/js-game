var canvas = document.getElementById("gameCanvas")
console.log(canvas)
 // store 2D rendering context
 var ctx = canvas.getContext("2d");

// set initial starting position of ball
var x = canvas.width/2
var y = canvas.height-20;

// set ball movement
var dx = 2;
var dy = -2;

// set ball radius
var ballRad = 10

// create paddle and define starting position
var paddleHeight = 10;
var paddleWidth = 200;
var paddleX = (canvas.width-paddleWidth)/2

// set paddle movement
var rightKeyPressed = false;
var leftKeyPressed = false;

// set brick info
var brickRowCount = 1;
var brickColumnCount = 5;
var brickWidth = 100;
var brickHeight = 50;
var brickPadding = 10;
var brickOffsetTop = 30;
var brickOffsetLeft = 30;

var bricks = [];
for(c=0; c<brickColumnCount; c++){
  // for column 1, 2, 3
  bricks[c] = [];
  // make x rows of bricks
  for(r=0; r<brickRowCount; r++){
    bricks[c][r] = { x: 0, y : 0, status: true};
  }
}

// set score
var score = 0;



function drawBall(){
  ctx.beginPath();
  ctx.arc(x, y, ballRad, 0, Math.PI*2)
  ctx.fillStyle = "green";
  ctx.fill();
  ctx.closePath();
}

function drawPaddle(){
  ctx.beginPath();
  ctx.rect(paddleX, canvas.height-paddleHeight, paddleWidth, paddleHeight);
  ctx.fillStyle = "blue";
  ctx.fill();
  ctx.closePath();
}

function drawBricks(){
  for(c=0; c<brickColumnCount; c++){
    for(r=0; r<brickRowCount; r++){
      // set variables so bricks aren't in same spot
      if(bricks[c][r].status == true){
        var brickX = (c*(brickWidth+brickPadding))+brickOffsetLeft;
        var brickY = (r*(brickHeight+brickPadding))+brickOffsetTop;
        bricks[c][r].x = brickX;
        bricks[c][r].y = brickY;
        ctx.beginPath();
        ctx.rect(brickX,brickY,brickWidth, brickHeight);
        ctx.fillStyle = "yellow";
        ctx.fill();
        ctx.closePath();
      }
    }
  }
}

function drawScoreBoard(){
  ctx.font = "16px Arial";
  ctx.fillStyle = "white";
  ctx.fillText("Score: " + score, 8, 20);
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  drawBall();
  collisionDetector();
  drawPaddle();
  drawBricks();
  drawScoreBoard();
  x += dx;
  y += dy;

  // have ball bounce off edges
  if(y + dy < ballRad){
    dy = -dy
  } else if (y + dy > canvas.height-(paddleHeight * 2)){
    if(x > paddleX && x < paddleX + paddleWidth){
      dy = -dy
    } else {
      alert("Boo, why are you so bad at this!?!?!");
      document.location.reload();
    }
  }

  if(x + dx < ballRad || x + dx > canvas.width-ballRad){
    dx = -dx
  }
  // paddle moves
  if(rightKeyPressed){
    paddleX += 5;
  } else if(leftKeyPressed){
    paddleX -= 5;
  }

}

// event listeners for key touches
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

// brick collision
function collisionDetector(){
  for(c=0; c<brickColumnCount; c++){
    for(r=0; r<brickRowCount; r++){
      var currentBrick = bricks[c][r];
      if(x > currentBrick.x && x < currentBrick.x+brickWidth && y > currentBrick.y && y < currentBrick.y + brickHeight){
        dy = -dy;
        currentBrick.status = false;
        score++;
        if(score > brickRowCount*brickColumnCount){
          alert("You bomb at dis! :)");
          document.location.reload();
        }
      }
    }
  }
}

// left arrow key is 37 and right is 39
function keyDownHandler(e){
  if(e.keyCode == 39){
    rightKeyPressed = true;
  }
  if(e.keyCode == 37){
    leftKeyPressed = true;
  }
}

function keyUpHandler(e){
  if(e.keyCode == 39){
    rightKeyPressed = false;
  }
  if(e.keyCode == 37){
    leftKeyPressed = false;
  }
}

// rerun draw function every 10 milliseconds
setInterval(draw, 10);
