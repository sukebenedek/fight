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
let numOfPlatforms = 9
//Mi az a canvas?

function generatePlatform() {
    return {posX: random(0, width - 150), posY: random(160, height - 200), width: 150, height: 50};
}

function checkProximity(platform, existingPlatforms, minDistance) {
    for (let i = 0; i < existingPlatforms.length; i++) {
        let distanceX = Math.abs(platform.posX - existingPlatforms[i].posX);
        let distanceY = Math.abs(platform.posY - existingPlatforms[i].posY);

        if (distanceX < minDistance && distanceY < minDistance) {
            return true; // tul kozel van
        }
    }
    return false;
}

for (let i = 0; i < numOfPlatforms; i++) {
    let newPlatform;
    do {
        newPlatform = generatePlatform();
    } while (checkProximity(newPlatform, allPlatforms, 240));

    allPlatforms.push(newPlatform);
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

    let speed = 3

    if (playerLeft.posX > playerRight.posX + playerRight.width || playerLeft.posX + playerLeft.width < playerRight.posX || playerLeft.posY > playerRight.posY + playerRight.height || playerLeft.posY + playerLeft.height < playerRight.posY) {
        if (playerLeft.moveRight) {
            playerLeft.posX = Math.min(playerLeft.posX + speed, width - playerLeft.width);
        } else if (playerLeft.moveLeft) {
            playerLeft.posX = Math.max(playerLeft.posX - speed, 0);
        }
        if (playerLeft.moveUp) {
            playerLeft.posY = Math.max(playerLeft.posY - speed, 0);
        } else if (playerLeft.moveDown) {
            playerLeft.posY = Math.min(playerLeft.posY + speed, height - playerLeft.height);
        }
    }
    
    
        if (playerRight.moveRight) {
            playerRight.posX = Math.min(playerRight.posX + speed, width - playerRight.width);
        } else if (playerRight.moveLeft) {
            playerRight.posX = Math.max(playerRight.posX - speed, 0);
        }
        if (playerRight.moveUp) {
            playerRight.posY = Math.max(playerRight.posY - speed, 0);
        } else if (playerRight.moveDown) {
            playerRight.posY = Math.min(playerRight.posY + speed, height - playerRight.height);
        }
    







    requestAnimationFrame(move);
}

function drawPlatform(platform){
    context.fillStyle = 'orange';
    context.fillRect(platform.posX, platform.posY, platform.width, platform.height);
}

move();
window.addEventListener("keydown", keyDownEventListener)


function keyDownEventListener(event) {
    if (event.key.toLowerCase() === 'd') {
        playerLeft.moveRight = true;
    } else if (event.key.toLowerCase() === 'a') {
        playerLeft.moveLeft = true;
    } else if (event.key.toLowerCase() === 'w') {
        playerLeft.moveUp = true;
    } else if (event.key.toLowerCase() === 's') {
        playerLeft.moveDown = true;
    }

    if (event.key === 'ArrowRight') {
        playerRight.moveRight = true;
    } else if (event.key === 'ArrowLeft') {
        playerRight.moveLeft = true;
    } else if (event.key === 'ArrowUp') {
        playerRight.moveUp = true;
    } else if (event.key === 'ArrowDown') {
        playerRight.moveDown = true;
    }
}

function keyUpEventListener(event) {
    if (event.key.toLowerCase() === 'd') {
        playerLeft.moveRight = false;
    } else if (event.key.toLowerCase() === 'a') {
        playerLeft.moveLeft = false;
    } else if (event.key.toLowerCase() === 'w') {
        playerLeft.moveUp = false;
    } else if (event.key.toLowerCase() === 's') {
        playerLeft.moveDown = false;
    }

    if (event.key === 'ArrowRight') {
        playerRight.moveRight = false;
    } else if (event.key === 'ArrowLeft') {
        playerRight.moveLeft = false;
    } else if (event.key === 'ArrowUp') {
        playerRight.moveUp = false;
    } else if (event.key === 'ArrowDown') {
        playerRight.moveDown = false;
    }
}

function random(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

document.addEventListener('keydown', keyDownEventListener);
document.addEventListener('keyup', keyUpEventListener);