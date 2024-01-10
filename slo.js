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

let akDeployed = false

canvas.width = width
canvas.height = height

context.fillStyle = 'white';
context.fillRect(0, 0, width, height);

function generatePlatform() {
    return {posX: random(0, width - 150), posY: random(160, height - 200), width: random(150, 220), height: random(50, 70), type: random(0, 3), isFlipped: Math.random() >= 0.5};
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

let leftPlayerImage = document.getElementById("leftPlayerImage");
let leftPlayerImageLeft = document.getElementById("leftPlayerImageLeft");
let leftPlayerImageRight = document.getElementById("leftPlayerImageRight");

let rightPlayerImage = document.getElementById("rightPlayerImage");
let rightPlayerImageLeft = document.getElementById("rightPlayerImageLeft");
let rightPlayerImageRight = document.getElementById("rightPlayerImageRight");

let platform0 = document.getElementById("platform0");
let platform1 = document.getElementById("platform1");
let platform2 = document.getElementById("platform2");

let background = document.getElementById("background");

let platformImgs = [platform0, platform1, platform2]

let framesBetweenAnimations = 20;
let frames = 0



function move(){
    playerLeft = {posX: LpositionX, posY: LpositionY, width: BaseWidth, height: BaseHeight} //wsad, f
    playerRight = {posX: RpositionX, posY: RpositionY, width: BaseWidth, height: BaseHeight} //nyilak, ctrl
    
    context.fillStyle = 'white';
    context.fillRect(0, 0, width, height);
    // context.drawImage(background, 0, 0, width, height);

    
    for (let i = 0; i < allPlatforms.length; i++) {
        const element = allPlatforms[i];
    
        drawPlatform(element)
    
    }

    if(akDeployed){
        context.fillStyle = 'yellow';
        context.fillRect(ak.posX, ak.posY, ak.width, ak.height);
        if (ak.posY < 50){
            ak.posY += xSpeed / 2

        }
    }
    
    frames++
    if(leftRun){
        if (leftLastDir == "Right") {
            if (Math.round(frames / framesBetweenAnimations) % 2) {
                context.drawImage(leftPlayerImageLeft, playerLeft.posX, playerLeft.posY, playerLeft.width, playerLeft.height);
            } else {
                context.drawImage(leftPlayerImageRight, playerLeft.posX, playerLeft.posY, playerLeft.width, playerLeft.height);
            }
        } else {
            context.save();
            context.scale(-1, 1);
        
            if (Math.round(frames / framesBetweenAnimations) % 2) {
                context.drawImage(leftPlayerImageLeft, -playerLeft.posX - playerLeft.width, playerLeft.posY, playerLeft.width, playerLeft.height);
            } else {
                context.drawImage(leftPlayerImageRight, -playerLeft.posX - playerLeft.width, playerLeft.posY, playerLeft.width, playerLeft.height);
            }
        
            context.restore();
        }
        
        
    }
    else{
        if (leftLastDir == "Right") {
            context.drawImage(leftPlayerImage, playerLeft.posX, playerLeft.posY, playerLeft.width, playerLeft.height);
        }
        else{
            context.save();
            context.scale(-1, 1);
            context.drawImage(leftPlayerImage, -playerLeft.posX - playerLeft.width, playerLeft.posY, playerLeft.width, playerLeft.height);

            context.restore();

        }
    }

    if(rightRun){
        if (rightLastDir == "Right") {
            if (Math.round(frames / framesBetweenAnimations) % 2) {
                context.drawImage(rightPlayerImageLeft, playerRight.posX, playerRight.posY, playerRight.width, playerRight.height);
            } else {
                context.drawImage(rightPlayerImageRight, playerRight.posX, playerRight.posY, playerRight.width, playerRight.height);
            }
        } else {
            context.save();
            context.scale(-1, 1);
        
            if (Math.round(frames / framesBetweenAnimations) % 2) {
                context.drawImage(rightPlayerImageLeft, -playerRight.posX - playerRight.width, playerRight.posY, playerRight.width, playerRight.height);
            } else {
                context.drawImage(rightPlayerImageRight, -playerRight.posX - playerRight.width, playerRight.posY, playerRight.width, playerRight.height);
            }
        
            context.restore();
        }
        
        
    }
    else{
        if (rightLastDir == "Right") {
            context.drawImage(rightPlayerImage, playerRight.posX, playerRight.posY, playerRight.width, playerRight.height);
        }
        else{
            context.save();
            context.scale(-1, 1);
            context.drawImage(rightPlayerImage, -playerRight.posX - playerRight.width, playerRight.posY, playerRight.width, playerRight.height);

            context.restore();

        }
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
            context.fillText('A bal oldali játékos nyert.', canvas.width / 2, canvas.height / 2);
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
            context.fillText('A jobb oldali játékos nyert.', canvas.width / 2, canvas.height / 2);
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
    // context.fillStyle = 'orange';
    // context.fillRect(platform.posX, platform.posY, platform.width, platform.height);
    if(!platform.isFlipped){
        context.drawImage(platformImgs[platform.type], platform.posX, platform.posY, platform.width, platform.height);
    }
    else{
        context.save();
        context.scale(-1, 1);
        context.drawImage(platformImgs[platform.type], -platform.posX - platform.width, platform.posY, platform.width, platform.height);
        context.restore();
    }

}

function drawBullet(bullet){
    context.fillStyle = 'green';
    context.fillRect(bullet.posX, bullet.posY, bullet.width, bullet.height);
}

let moveInterval = setInterval(move, 1000/60)

function random(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}
setInterval (function GravityL(){
    if (Ground == false){
        LspeedY += 0.09;
    }
})
setInterval (function GravityR(){
    if (Ground == false){
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
        LspeedY = 0
    }
    if (LpositionX <= 0){
        LpositionX = 0
    }
    if (LpositionX >= cvsWidth - BaseWidth){
        LpositionX = (cvsWidth - BaseWidth)
    }
    for (let index = 0; index < allPlatforms.length; index++) {
        if (LpositionY > (allPlatforms[index].posY - BaseHeight - 10) && LpositionY < (allPlatforms[index].posY - BaseHeight + 10) && LpositionX >= allPlatforms[index].posX - BaseWidth && LpositionX <= (allPlatforms[index].posX + allPlatforms[index].width)){
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
        RspeedY = 0
    }
    if (RpositionX <= 0){
        RpositionX = 0
    }
    if (RpositionX >= cvsWidth - BaseWidth){
        RpositionX = (cvsWidth - BaseWidth)
    }
    for (let index = 0; index < allPlatforms.length; index++) {
        if (RpositionY > (allPlatforms[index].posY - BaseHeight - 10) && RpositionY < (allPlatforms[index].posY - BaseHeight + 10) && RpositionX >= allPlatforms[index].posX - BaseWidth && RpositionX <= (allPlatforms[index].posX + allPlatforms[index].width)){
            RpositionY = (allPlatforms[index].posY - BaseHeight)
            RspeedY = 0
            canRightJump = true
        }
    }
}

let gunPos = 77

function ShootLeft(){
    if(canLeftShoot){
        let currentLeftBullet = {posX: playerLeft.posX, posY: playerLeft.posY + gunPos, width: bulletWidth, height: bulletHeight, direction: leftLastDir}
        leftsBullets.push(currentLeftBullet)
        canLeftShoot = false

        setTimeout(function () {
            canLeftShoot = true;
        }, delayBetweenShots);
    }
}

function ShootRight(){
    if(canRightShoot){
        let currentRightBullet = {posX: playerRight.posX, posY: playerRight.posY + gunPos, width: bulletWidth, height: bulletHeight, direction: rightLastDir}
        rightsBullets.push(currentRightBullet)
        canRightShoot = false

        setTimeout(function () {
            canRightShoot = true;
        }, delayBetweenShots);
    }
}

//12000, 20000
let timeOfAk = random(1000, 1000)

let ak = {posX: random(0, width - 200), posY: -200, width: 200, height: 100}

function akCall() {
    console.log("ak");
    akDeployed = true
}

setTimeout(akCall, timeOfAk);
