const canvas = document.getElementById('cvs');
const context = canvas.getContext('2d');
let width = 1890
let height = 860

let delayBetweenShots = 500 //ms

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

let allPlatforms = []
let numOfPlatforms = 9
//Mi az a canvas?

let leftLastDir = "Right"
let rightLastDir = "Left"

let bulletSpeed = 12

canvas.width = width
canvas.height = height

context.fillStyle = 'white';
context.fillRect(0, 0, width, height);

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

    for (let i = 0; i < leftsBullets.length; i++) {
        const element = leftsBullets[i];
        if (element.direction === "Left") {
            element.posX -= bulletSpeed;
            drawBullet(element);
            if (element.posX < 0 - bulletHeight) {

                leftsBullets.splice(i, 1)
            }
        }
    }
    
    for (let i = 0; i < leftsBullets.length; i++) {
        const element = leftsBullets[i];
        if (element.direction === "Right") {
            element.posX += bulletSpeed;
            drawBullet(element);
            if (element.posX > width) {
                leftsBullets.splice(i, 1);

            }
        }
    }
    
    for (let i = 0; i < leftsBullets.length; i++) {
        const bullet = leftsBullets[i];
        if (!(bullet.posX > playerRight.posX + playerRight.width || bullet.posX + bullet.width < playerRight.posX || bullet.posY > playerRight.posY + playerRight.height || bullet.posY + bullet.height < playerRight.posY)) {
            clearInterval(moveInterval);

            context.fillStyle = 'black';
            context.textAlign = 'center';
            context.font = '100px Comic Sans MS, sans-serif';
            context.fillText('A job oldali játékos meghalt.', canvas.width / 2, canvas.height / 2);
        }
       
    }

    for (let i = 0; i < rightsBullets.length; i++) {
        const element = rightsBullets[i];
        if (element.direction === "Left") {
            element.posX -= bulletSpeed;
            drawBullet(element);
            if (element.posX < 0 - bulletHeight) {

                rightsBullets.splice(i, 1)
            }
        }
    }
    
    for (let i = 0; i < rightsBullets.length; i++) {
        const element = rightsBullets[i];
        if (element.direction === "Right") {
            element.posX += bulletSpeed;
            drawBullet(element);
            if (element.posX > width) {
                rightsBullets.splice(i, 1);

            }
        }
    }
    
    for (let i = 0; i < rightsBullets.length; i++) {
        const bullet = rightsBullets[i];
        if (!(bullet.posX > playerLeft.posX + playerLeft.width || bullet.posX + bullet.width < playerLeft.posX || bullet.posY > playerLeft.posY + playerLeft.height || bullet.posY + bullet.height < playerLeft.posY)) {
            clearInterval(moveInterval);

            context.fillStyle = 'black';
            context.textAlign = 'center';
            context.font = '100px Comic Sans MS, sans-serif';
            context.fillText('A bal oldali játékos meghalt.', canvas.width / 2, canvas.height / 2);
        }
       
    }

    for (let i = 0; i < leftsBullets.length; i++) {
        const element = leftsBullets[i];
        for (let j = 0; j < allPlatforms.length; j++) {
            const element1 = allPlatforms[j];
            if (!(element.posX > element1.posX + element1.width || element.posX + element.width < element1.posX || element.posY > element1.posY + element1.height || element.posY + element.height < element1.posY)) {
                leftsBullets.splice(i, 1);
    
            }
        }
    }

    for (let i = 0; i < rightsBullets.length; i++) {
        const element = rightsBullets[i];
        for (let j = 0; j < allPlatforms.length; j++) {
            const element1 = allPlatforms[j];
            if (!(element.posX > element1.posX + element1.width || element.posX + element.width < element1.posX || element.posY > element1.posY + element1.height || element.posY + element.height < element1.posY)) {
                rightsBullets.splice(i, 1);
    
            }
        }
    }

    // if (!(playerLeft.posX > playerRight.posX + playerRight.width || playerLeft.posX + playerLeft.width < playerRight.posX || playerLeft.posY > playerRight.posY + playerRight.height || playerLeft.posY + playerLeft.height < playerRight.posY)) {
    //collision detection

    LpositionX += LspeedXLeft;
    LpositionX += LspeedXRight;
    LpositionY += LspeedY;

    RpositionX += RspeedXLeft;
    RpositionX += RspeedXRight;
    RpositionY += RspeedY;

    Limits()






}

function drawPlatform(platform){
    context.fillStyle = 'orange';
    context.fillRect(platform.posX, platform.posY, platform.width, platform.height);
}

function drawBullet(bullet){
    context.fillStyle = 'green';
    context.fillRect(bullet.posX, bullet.posY, bullet.width, bullet.height);
}

let moveInterval = setInterval(move, 1000/60)

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
    if (LpositionY >= cvsHeight - BaseHeight){
        LpositionY = (cvsHeight - BaseHeight)
        canLeftJump = true

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
    for (let index = 0; index < allPlatforms.length; index++) {
        if (LpositionY > (allPlatforms[index].posY - BaseHeight) && LpositionY < (allPlatforms[index].posY - BaseHeight + 20) && LpositionX >= allPlatforms[index].posX - BaseWidth && LpositionX <= (allPlatforms[index].posX + allPlatforms[index].width)){
            LpositionY = (allPlatforms[index].posY - BaseHeight)
            LspeedY = 0
            canLeftJump = true
        }
    }

    if (RpositionY >= cvsHeight - BaseHeight){
        RpositionY = (cvsHeight - BaseHeight)
        canRightJump = true

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
    for (let index = 0; index < allPlatforms.length; index++) {
        if (RpositionY > (allPlatforms[index].posY - BaseHeight) && RpositionY < (allPlatforms[index].posY - BaseHeight + 20) && RpositionX >= allPlatforms[index].posX - BaseWidth && RpositionX <= (allPlatforms[index].posX + allPlatforms[index].width)){
            RpositionY = (allPlatforms[index].posY - BaseHeight)
            RspeedY = 0
            canRightJump = true
        }
    }
}


function ShootLeft(){
    if(canLeftShoot){
        let currentLeftBullet = {posX: playerLeft.posX, posY: playerLeft.posY + 35, width: bulletWidth, height: bulletHeight, direction: leftLastDir}
        leftsBullets.push(currentLeftBullet)
        canLeftShoot = false

        setTimeout(function () {
            canLeftShoot = true;
        }, delayBetweenShots);
    }


}

function ShootRight(){
    if(canRightShoot){
        let currentRightBullet = {posX: playerRight.posX, posY: playerRight.posY + 35, width: bulletWidth, height: bulletHeight, direction: rightLastDir}
        rightsBullets.push(currentRightBullet)
        canRightShoot = false

        setTimeout(function () {
            canRightShoot = true;
        }, delayBetweenShots);
    }


}