const canvas = document.getElementById('cvs');
const context = canvas.getContext('2d');

let width = 1890
let height = 860
canvas.width = width
canvas.height = height

context.fillStyle = 'white';
context.fillRect(0, 0, width, height);

let playerLeft = {posX: 100, posY: height - 150, width: 90, height: 150} //wsad, f
let playerRight = {posX: width - 200, posY: height - 150, width: 90, height: 150} //nyilak, ctrl

let allPlatforms = []

for (let i = 0; i < 10; i++) {
    let platform = {posX: random(200, width), posY: random(height - 200, height), width: 150, height: 50}
    allPlatforms.push(platform) //Mi az a canvas?
    
}

function move(){
    context.fillStyle = 'white';
    context.fillRect(0, 0, width, height);

    context.fillStyle = 'blue';
    context.fillRect(playerLeft.posX, playerLeft.posY, playerLeft.width, playerLeft.height);

    context.fillStyle = 'red';
    context.fillRect(playerRight.posX, playerRight.posY, playerRight.width, playerRight.height);
    
    for (let i = 0; i < allPlatforms.length; i++) {
        const element = allPlatforms[i];

        drawPlatform(element)
        
    }





    requestAnimationFrame(move); // elvileg stabil 60 fps
}

function drawPlatform(platform){
    context.fillStyle = 'orange';
    context.fillRect(platform.posX, platform.posY, platform.width, platform.height);
}

move();
window.addEventListener("keydown", keyDownEventListener)

function keyDownEventListener(event){
    if(event.key.toLowerCase() === 'w'){ //&& bumperY + bumperHeight < cvsHeight
        console.log("w");
    }
    if(event.key == "ArrowUp"){
        console.log("up");
    }
}

function random(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}