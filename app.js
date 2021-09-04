//innitializing canvas################################################
let canvas = document.querySelector("canvas");
let ctx = canvas.getContext("2d");
//selection game difficulty###########################################
let difficultiy =+prompt("select defficulty level EASY = 1 NORMAL = 2 HARD = 3");
if(difficultiy === 1){
  var initialSpeed = 2
}
else if(difficultiy === 2){
  var initialSpeed = 8
}
else if(difficultiy === 3){
  var initialSpeed = 16
};
// let initialSpeed = 10;
let playerScore1 = 0;
let playerScore2 = 0;
let speed = initialSpeed;
let tileCount = 20;
let tileSize = canvas.width / tileCount;
let headX = 10;
let headY = 10;
let headA = 11;
let headB = 10;
let xVelocity = 0;
let yVelocity = 0;
let aVelocity = 0;
let bVelocity = 0;
let appleX = Math.floor(Math.random() * tileCount);
let appleY = Math.floor(Math.random() * tileCount);
//game loop###################################################
function drawGame() {
  clearScreen();
  changePosition();
  checkCollision();
  drawApple();
  drawSnake();
  //Game over or not###################################################
  if (headX < 0) {
    let status = document.querySelector(".gameStatus");
    status.innerHTML = "GAME OVER :)";
    return;
  } else if (headX > 19) {
    let status = document.querySelector(".gameStatus");
    status.innerHTML = "GAME OVER :)";
    return;
  } else if (headY > 19) {
    let status = document.querySelector(".gameStatus");
    status.innerHTML = "GAME OVER :)";
    return;
  } else if (headY < 0) {
    let status = document.querySelector(".gameStatus");
    status.innerHTML = "GAME OVER :)";
    return;
  }
  if (headA < 0) {
    let status = document.querySelector(".gameStatus");
    status.innerHTML = "GAME OVER :)";
    return;
  } else if (headA > 19) {
    let status = document.querySelector(".gameStatus");
    status.innerHTML = "GAME OVER :)";
    return;
  } else if (headB > 19) {
    let status = document.querySelector(".gameStatus");
    status.innerHTML = "GAME OVER :)";
    return;
  } else if (headB < 0) {
    let status = document.querySelector(".gameStatus");
    status.innerHTML = "GAME OVER :)";
    return;
  }
  let score = document.querySelector(".score");
  score.innerHTML = speed - initialSpeed;
  setTimeout(drawGame, 1000 / speed);
}
// draw canvas color###################################################
function clearScreen() {
  ctx.fillStyle = "rgb(28, 28, 28)";
  ctx.fillRect(0, 0, 800, 800);
  ctx.strokeStyle = "rgb(0, 255, 8)";
  ctx.beginPath();
  ctx.rect(headX * tileCount + 1, headY * tileCount + 1, tileSize - 2, tileSize - 2);
  ctx.stroke();
  ctx.strokeStyle = "orange";
  ctx.beginPath();
  ctx.rect(headA * tileCount + 1, headB * tileCount + 1, tileSize - 2, tileSize - 2);
  ctx.stroke();
  for (x = 0; x <= 800; x += 20) {
    ctx.strokeStyle = "rgb(31,31,31)";
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, 800);
    ctx.stroke();
  }
  for (y = 0; y <= 800; y += 20) {
    ctx.strokeStyle = "rgb(31, 31, 31)";
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(800, y);
    ctx.stroke();
  }
}
//draw snake body###################################################
function drawSnake() {
  ctx.fillStyle = "orange";
  ctx.fillRect(headX * tileCount, headY * tileCount, tileSize, tileSize);
  ctx.fillStyle = "green";
  ctx.fillRect(headA * tileCount, headB * tileCount, tileSize, tileSize);
}
//change snake position
function changePosition() {
  headX += xVelocity;
  headY += yVelocity;
  headA += aVelocity;
  headB += bVelocity;
}
//checkCollision###################################################
function checkCollision() {
  if (appleX == headX && appleY == headY) {
    // speed += initialSpeed;
    // let score = document.querySelector(".speed");
    // score.innerHTML = speed - initialSpeed;
    let score1 = document.querySelector('.player1');
    score1.innerHTML = "player 1  = " + playerScore1++;
    appleX = Math.floor(Math.random() * tileCount);
    appleY = Math.floor(Math.random() * tileCount);
    var audio = new Audio('./crunch1.mp3');
    audio.play();
  }
  else if (appleX == headA && appleY == headB){
    // speed += initialSpeed;
    // let score = document.querySelector(".speed");
    // score.innerHTML = speed - initialSpeed;
    let score2 = document.querySelector('.player2');
    score2.innerHTML = "player 2 = " + playerScore2++;
    appleX = Math.floor(Math.random() * tileCount);
    appleY = Math.floor(Math.random() * tileCount);
    var audio = new Audio('./crunch2.mp3');
    audio.play();
  }
}
//draw apple###################################################
function drawApple() {
  ctx.fillStyle = "red";
  ctx.fillRect(appleX * tileCount, appleY * tileCount, tileSize, tileSize);
}
//listen for key events###################################################
document.addEventListener("keydown", (event) => {
  if (event.keyCode == 87) {
    //up arrow
    if (yVelocity == 1) return;
    xVelocity = 0;
    yVelocity = -1;
  } else if (event.keyCode == 83) {
    // down arrow
    if (yVelocity == -1) return;
    xVelocity = 0;
    yVelocity = 1;
  } else if (event.keyCode == 65) {
    // left arrow
    if (xVelocity == 1) return;
    xVelocity = -1;
    yVelocity = 0;
  } else if (event.keyCode == 68) {
    // right arrow
    if (xVelocity == -1) return;
    xVelocity = 1;
    yVelocity = 0;
  }
  //player 2
  if (event.keyCode == 38) {
    //up arrow
    if (bVelocity == 1) return;
    aVelocity = 0;
    bVelocity = -1;
  } else if (event.keyCode == 40) {
    // down arrow
    if (bVelocity == -1) return;
    aVelocity = 0;
    bVelocity = 1;
  } else if (event.keyCode == 37) {
    // left arrow
    if (aVelocity == 1) return;
    aVelocity = -1;
    bVelocity = 0;
  } else if (event.keyCode ==39) {
    // right arrow
    if (aVelocity == -1) return;
    aVelocity = 1;
    bVelocity = 0;
  }
});
drawGame();