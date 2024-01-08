const speed = 0.001;
const ballR = 10;
const cvsHeight = 600;
const cvsWidth = 800;

function randomIntFromInterval(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min)
  }
  
const rndInt = (randomIntFromInterval(1, 10) / 10)

let ballX = (cvsWidth - ballR) / 2;
let ballY = 0;
let ballSpeed = 0;
let ballYSpeed = 0;
let ballYJumpSpeed = 0;
let JumpMaxNumber = 2;


function draw() {
    const cvs = document.querySelector('#cvs');
    const c = cvs.getContext('2d');

    c.clearRect(0,0,cvsWidth,cvsHeight);

    if (ballY > cvsHeight - ballR) {
        ballY = (cvsHeight-ballR)
        ballYJumpSpeed = 0;
        ballYSpeed = 0;
    }
    if (ballYSpeed == 0){
        console.log('ja')
        JumpMaxNumber = 0
    }
    if (ballX > cvsWidth - ballR) {
        ballX = (cvsWidth - ballR)
        ballSpeed = 0;
    }
    if (ballX < 0) {
        ballX = 0
        ballSpeed = 0;
    }
    if (ballY < 0) {
        ballY = 0
        ballYJumpSpeed = 0;
        ballYSpeed = 0;
    }
    if (ballY > 190 && ballY < 195 && ballX < 121 && ballX > 89 ) {
        ballY = 190
        ballYSpeed = 0;
    }
    c.fillStyle = "#000";
    c.fillRect(ballX, ballY, ballR, ballR);
    c.fillRect(100, 200, 20, 5)
    console.log(JumpMaxNumber, ballYSpeed) //////////////////////////////////////////////
    console.log()
}

function keyDownEventListener(event) {
    if (event.key == 'ArrowUp'){
        if (JumpMaxNumber < 2){
            ballYJumpSpeed += 2
            JumpMaxNumber += 1

        }
    }
    if (event.key == 'ArrowLeft'){
            ballSpeed -= 1;
    }
    if (event.key == 'ArrowRight'){
        ballSpeed += 1;
    }
}
setInterval(function Gravity(){
        ballY -= ballYJumpSpeed
        ballYSpeed += 0.01
        ballY += ballYSpeed
})
setInterval(function MovmentsX(){
    ballX += ballSpeed
})
setInterval(function MovmentsXSlow(){
    if (ballSpeed < 0.1 && ballSpeed > - 0.1)
        ballSpeed = 0
    if (ballSpeed > 0)
        ballSpeed -= ballSpeed / 30
    if (ballSpeed < 0)
        ballSpeed += ballSpeed / -30
})

const interval = setInterval(draw, speed);
window.addEventListener('keydown', keyDownEventListener);