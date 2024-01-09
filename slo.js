const canvas = document.getElementById('cvs');
const context = canvas.getContext('2d');
let width = 1890
let height = 860

//Alap adatok
const cvsHeight = 860;
const cvsWidth = 1890;
const RefressRate = 0.001;

//Karakter méret
const BaseWidth = 80;
const BaseHeight = 150;

let Ground = false

//Mozgáshoz Right
let RpositionX = width - 150 - BaseWidth;
let RpositionY = height - BaseHeight;
let RspeedXLeft = 0;
let RspeedXRight = 0;
let RspeedY = 0;

//Mozgáshoz Left
let LpositionX = 150;
let LpositionY = height - BaseHeight;
let LspeedXLeft = 0;
let LspeedXRight = 0;
let LspeedY = 0;

canvas.width = width
canvas.height = height

context.fillStyle = 'white';
context.fillRect(0, 0, width, height);


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

let leftsBullets = []
let rightsBullets = []
let canLeftShoot = true
let canRightShoot = true

let bulletWidth = 40
let bulletHeight = 10


let playerLeft = {posX: LpositionX, posY: LpositionY, width: BaseWidth, height: BaseHeight} //wsad, f
let playerRight = {posX: RpositionX, posY: RpositionY, width: BaseWidth, height: BaseHeight} //nyilak, ctrl


function move(){
    playerLeft = {posX: LpositionX, posY: LpositionY, width: BaseWidth, height: BaseHeight} //wsad, f
    playerRight = {posX: RpositionX, posY: RpositionY, width: BaseWidth, height: BaseHeight} //nyilak, ctrl
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

    for (let i = leftsBullets.length - 1; i >= 0; i--) {
        const element = leftsBullets[i];
        element.posX += 10

        if(element.posX > width){
            leftsBullets.splice(element, 1)
        }

        drawBullet(element)

    }

    // for (let i = leftsBullets.length - 1; i >= 0; i--) {
    //     const element = leftsBullets[i];

    //     if(element.posX > width){
    //         leftsBullets.splice(element, 1)
    //         break;
    //     }

    // }

    // if (playerLeft.posX > playerRight.posX + playerRight.width || playerLeft.posX + playerLeft.width < playerRight.posX || playerLeft.posY > playerRight.posY + playerRight.height || playerLeft.posY + playerLeft.height < playerRight.posY) {
    //     if (playerLeft.moveRight) {
    //         playerLeft.posX = Math.min(playerLeft.posX + speed, width - playerLeft.width);
    //     } else if (playerLeft.moveLeft) {
    //         playerLeft.posX = Math.max(playerLeft.posX - speed, 0);
    //     }
    //     if (playerLeft.moveUp) {
    //         playerLeft.posY = Math.max(playerLeft.posY - speed, 0);
    //     } else if (playerLeft.moveDown) {
    //         playerLeft.posY = Math.min(playerLeft.posY + speed, height - playerLeft.height);
    //     }
    // }


    //     if (playerRight.moveRight) {
    //         playerRight.posX = Math.min(playerRight.posX + speed, width - playerRight.width);
    //     } else if (playerRight.moveLeft) {
    //         playerRight.posX = Math.max(playerRight.posX - speed, 0);
    //     }
    //     if (playerRight.moveUp) {
    //         playerRight.posY = Math.max(playerRight.posY - speed, 0);
    //     } else if (playerRight.moveDown) {
    //         playerRight.posY = Math.min(playerRight.posY + speed, height - playerRight.height);
    //     }


        // console.log('Done')

    LpositionX += LspeedXLeft;
    LpositionX += LspeedXRight;
    LpositionY += LspeedY;

    RpositionX += RspeedXLeft;
    RpositionX += RspeedXRight;
    RpositionY += RspeedY;

    Limits()






    requestAnimationFrame(move);
}

function drawPlatform(platform){
    context.fillStyle = 'orange';
    context.fillRect(platform.posX, platform.posY, platform.width, platform.height);
}

function drawBullet(bullet){
    context.fillStyle = 'green';
    context.fillRect(bullet.posX, bullet.posY, bullet.width, bullet.height);
}

move();


// function keyDownEventListener(event) {
//     if (event.key.toLowerCase() === 'd') {
//         playerLeft.moveRight = true;
//     } else if (event.key.toLowerCase() === 'a') {
//         playerLeft.moveLeft = true;
//     } else if (event.key.toLowerCase() === 'w') {
//         playerLeft.moveUp = true;
//     } else if (event.key.toLowerCase() === 's') {
//         playerLeft.moveDown = true;
//     }

//     if (event.key === 'ArrowRight') {
//         playerRight.moveRight = true;
//     } else if (event.key === 'ArrowLeft') {
//         playerRight.moveLeft = true;
//     } else if (event.key === 'ArrowUp') {
//         playerRight.moveUp = true;
//     } else if (event.key === 'ArrowDown') {
//         playerRight.moveDown = true;
//     }
// }

// function keyUpEventListener(event) {
//     if (event.key.toLowerCase() === 'd') {
//         playerLeft.moveRight = false;
//     } else if (event.key.toLowerCase() === 'a') {
//         playerLeft.moveLeft = false;
//     } else if (event.key.toLowerCase() === 'w') {
//         playerLeft.moveUp = false;
//     } else if (event.key.toLowerCase() === 's') {
//         playerLeft.moveDown = false;
//     }

//     if (event.key === 'ArrowRight') {
//         playerRight.moveRight = false;
//     } else if (event.key === 'ArrowLeft') {
//         playerRight.moveLeft = false;
//     } else if (event.key === 'ArrowUp') {
//         playerRight.moveUp = false;
//     } else if (event.key === 'ArrowDown') {
//         playerRight.moveDown = false;
//     }
// }

function random(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

setInterval (function Gravity(){
    if (Ground == false){
        LspeedY += 0.09;
        RspeedY += 0.09;
    }
})

function Limits(){
    // Letf
    if (LpositionY >= cvsHeight - BaseHeight){
        LpositionY = (cvsHeight - BaseHeight)
    }
    if (LpositionY <= 0){
        LpositionY = 0
    }
    if (LpositionX <= 0){
        LpositionX = 0
    }
    if (LpositionX >= cvsWidth - BaseWidth){
        LpositionX = (cvsWidth - BaseWidth)
    }

    // Rightdd
    if (RpositionY >= cvsHeight - BaseHeight){
        RpositionY = (cvsHeight - BaseHeight)
    }
    if (RpositionY <= 0){
        RpositionY = 0
    }
    if (RpositionX <= 0){
        RpositionX = 0
    }
    if (RpositionX >= cvsWidth - BaseWidth){
        RpositionX = (cvsWidth - BaseWidth)
    }
}


function Shoot(){
    let currentLeftBullet = {posX: playerLeft.posX, posY: playerLeft.posY, width: bulletWidth, height: bulletHeight}
    leftsBullets.push(currentLeftBullet)


    console.log(leftsBullets[leftsBullets.length - 1]);
}