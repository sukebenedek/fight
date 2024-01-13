const canvas = document.getElementById('cvs');
const context = canvas.getContext('2d');

let width = 1890
let height = 800

let maxHp = 3

let delayBetweenShots = 500 //ms
let delayBetweenAkShots = 110 //ms
let cookie = document.cookie

let timeOfAk = random(8000, 1400)

let xSpeed = 6
let ySpeed = 15

let canLeftJump = true
let canRightJump = true

let leftRun = false
let rightRun = false

let localScore = "0:0"

let end = false

//Alap adatok
const cvsHeight = height;
const cvsWidth = width;
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

let heightOfGround = 50
canvas.width = width
canvas.height = height + heightOfGround

let leftsBullets = []
let rightsBullets = []
let canLeftShoot = true
let canRightShoot = true
let bulletWidth = 40
let bulletHeight = 10

let canLeftWall = true
let canRightWall = true
let walls = []
let wallWidth = 50
let wallHeight = 175
let delayBetweenWalls = 500 //ms
let wallHp = 5
let wallOnRight = 120
let wallOnLeft = -85

let playerLeft = {posX: LpositionX, posY: LpositionY, width: BaseWidth, height: BaseHeight, hp: maxHp}
let playerRight = {posX: RpositionX, posY: RpositionY, width: BaseWidth, height: BaseHeight, hp: maxHp}

let ak = {posX: random(0, width - 200), posY: -200, width: 250, height: 100}

let leftPlayerImage = document.getElementById("leftPlayerImage");
let leftPlayerImageLeft = document.getElementById("leftPlayerImageLeft");
let leftPlayerImageRight = document.getElementById("leftPlayerImageRight");

let rightPlayerImage = document.getElementById("rightPlayerImage");
let rightPlayerImageLeft = document.getElementById("rightPlayerImageLeft");
let rightPlayerImageRight = document.getElementById("rightPlayerImageRight");

let platform0 = document.getElementById("platform0");
let platform1 = document.getElementById("platform1");
let platform2 = document.getElementById("platform2");

let wallImg0 = document.getElementById("wall0");
let wallImg1 = document.getElementById("wall1");
let wallImg2 = document.getElementById("wall2");
let wallImg3 = document.getElementById("wall3");
let wallImg4 = document.getElementById("wall4");
let wallImgs = [wallImg0, wallImg1, wallImg2, wallImg3, wallImg4].reverse()

let bulletImg = document.getElementById("bulletImg");

let scoreBoard = document.getElementById("points");


let background = document.getElementById("background");
let akImg = document.getElementById("ak");

let platformImgs = [platform0, platform1, platform2]

let framesBetweenAnimations = 20;
let frames = 0

let playerWhoHasAk;

let hpBar = {width: 110, height: 20}

if (cookie[0] == undefined || isNaN(cookie.split(":")[1])){
    document.cookie = "0:0"
    tutorial()
}

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

function updateScore(){
    let cookies = document.cookie
    let score = (Number(cookies.split(":")[0]) + Number(localScore.split(":")[0])) + ":" + (Number(cookies.split(":")[1]) + Number(localScore.split(":")[1]))
    
    scoreBoard.innerHTML = score
    document.cookie = score
    localScore = "0:0"
}

function updateHp(){
    let leftHpPixel = hpBar.width * (playerLeft.hp / maxHp)
    let rightHpPixel = hpBar.width * (playerRight.hp / maxHp)

    if(playerLeft.hp == 0){
        context.fillStyle = 'red';
    }
    else{
        context.fillStyle = 'white';
    }
    context.fillRect(playerLeft.posX - (hpBar.width - playerLeft.width) / 2, playerLeft.posY - 40, hpBar.width, hpBar.height);

    if(playerRight.hp == 0){
        context.fillStyle = 'red';
    }
    else{
        context.fillStyle = 'white';
    }
    context.fillRect(playerRight.posX - (hpBar.width - playerRight.width) / 2, playerRight.posY - 40, hpBar.width, hpBar.height);

    if (playerLeft.hp <= maxHp / 3){
        context.fillStyle = 'red';
    }
    else if(playerLeft.hp <= (maxHp / 3) * 2){
        context.fillStyle = 'yellow';
    }
    else{
        context.fillStyle = 'green';
    }
    context.fillRect(playerLeft.posX - (hpBar.width - playerLeft.width) / 2, playerLeft.posY - 40, leftHpPixel, hpBar.height);

    if (playerRight.hp <= maxHp / 3){
        context.fillStyle = 'red';
    }
    else if(playerRight.hp <= (maxHp / 3) * 2){
        context.fillStyle = 'yellow';
    }
    else{
        context.fillStyle = 'green';
    }
    context.fillRect(playerRight.posX - (hpBar.width - playerRight.width) / 2, playerRight.posY - 40, rightHpPixel, hpBar.height);

    context.fillStyle = 'black';
    context.textAlign = 'center';
    context.font = 'bold 23px Comic Sans MS, sans-serif';
    context.shadowColor = 'white';
    context.shadowBlur = 4;
    context.shadowOffsetX = 2;
    context.shadowOffsetY = 2;

    context.fillText(playerLeft.hp + " hp", playerLeft.posX + 35, playerLeft.posY - 22);
    context.fillText(playerRight.hp + " hp", playerRight.posX + 35, playerRight.posY - 22);

    context.shadowBlur = 0;
    context.shadowOffsetX = 0;
    context.shadowOffsetY = 0;
    
}


updateScore()
function move(){
    playerLeft.posX = LpositionX
    playerLeft.posY = LpositionY
    playerLeft.width = BaseWidth
    playerLeft.height = BaseHeight

    playerRight.posX = RpositionX
    playerRight.posY = RpositionY
    playerRight.width = BaseWidth
    playerRight.height = BaseHeight

    context.fillStyle = 'white';
    context.fillRect(0, 0, width, height);
    context.drawImage(background, 0, 0, width, height + heightOfGround);

    
    for (let i = 0; i < allPlatforms.length; i++) {
        const element = allPlatforms[i];
    
        drawPlatform(element)
    
    }

    if(akDeployed){

        // context.fillStyle = 'yellow';
        // context.fillRect(ak.posX, ak.posY, ak.width, ak.height);
        context.drawImage(akImg, ak.posX, ak.posY, ak.width, ak.height);

        if (ak.posY < 50){
            ak.posY += xSpeed / 2

        }
        if(!(ak.posX > playerRight.posX + playerRight.width || ak.posX + ak.width < playerRight.posX || ak.posY > playerRight.posY + playerRight.height || ak.posY + ak.height < playerRight.posY)){
            //jobb
            ak.posX = -10000
            ak.posY = -10000

            rightPlayerImage = document.getElementById("rightPlayerImageAk");
            rightPlayerImageLeft = document.getElementById("rightPlayerImageLeftAk");
            rightPlayerImageRight = document.getElementById("rightPlayerImageRightAk");

            playerWhoHasAk = "Right"
        }
        else if(!(ak.posX > playerLeft.posX + playerLeft.width || ak.posX + ak.width < playerLeft.posX || ak.posY > playerLeft.posY + playerLeft.height || ak.posY + ak.height < playerLeft.posY)){
            //bal
            ak.posX = -10000
            ak.posY = -10000

            leftPlayerImage = document.getElementById("leftPlayerImageAk");
            leftPlayerImageLeft = document.getElementById("leftPlayerImageLeftAk");
            leftPlayerImageRight = document.getElementById("leftPlayerImageRightAk");

            playerWhoHasAk = "Left"
        }
        else{

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

    updateHp()

    for (let i = 0; i < walls.length; i++) {
        const wall = walls[i];
        drawWall(wall)
        
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
        if (!(bullet.posX > playerRight.posX + playerRight.width || bullet.posX + bullet.width < playerRight.posX || bullet.posY > playerRight.posY + playerRight.height || bullet.posY + bullet.height < playerRight.posY  && !end)) {
            playerRight.hp -= 1
            leftsBullets.splice(i, 1)
            updateHp()
            if(playerRight.hp <= 0){
                localScore = "1:0"
                updateScore()
                end = true
                clearInterval(moveInterval);
    
                context.fillStyle = 'black';
                context.textAlign = 'center';
                context.font = '100px Comic Sans MS, sans-serif';
                context.shadowColor = 'white';
                context.shadowBlur = 4;
                context.shadowOffsetX = 2;
                context.shadowOffsetY = 2;
    
                // Ezt en csinaltam //Pali
                context.fillText('A KÉK JÁTÉKOS NYERT.', canvas.width / 2, canvas.height / 2);
            }
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
        if ((!(bullet.posX > playerLeft.posX + playerLeft.width || bullet.posX + bullet.width < playerLeft.posX || bullet.posY > playerLeft.posY + playerLeft.height || bullet.posY + bullet.height < playerLeft.posY) && !end)) {
            
            playerLeft.hp -= 1
            rightsBullets.splice(i, 1)
            updateHp()
            if(playerLeft.hp <= 0){
                localScore = "0:1"
                updateScore()
                end = true
                clearInterval(moveInterval);

                context.fillStyle = 'black';
                context.textAlign = 'center';
                context.font = '100px Comic Sans MS, sans-serif';

                context.shadowColor = 'white';
                context.shadowBlur = 4;
                context.shadowOffsetX = 2;
                context.shadowOffsetY = 2;

                // Ezt en csinaltam //Ezt is a Pali
                context.fillText('A PIROS JÁTÉKOS NYERT.', canvas.width / 2, canvas.height / 2);
            }
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
        for (let j = 0; j < walls.length; j++) {
            const wall = walls[j];
            if (!(element.posX > wall.posX + wall.width || element.posX + element.width < wall.posX || element.posY > wall.posY + wall.height || element.posY + element.height < wall.posY)) {
                wall.hp -= 1
                if(wall.hp <= 0){
                    walls.splice(j, 1);
                }
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
        for (let j = 0; j < walls.length; j++) {
            const wall = walls[j];
            if (!(element.posX > wall.posX + wall.width || element.posX + element.width < wall.posX || element.posY > wall.posY + wall.height || element.posY + element.height < wall.posY)) {
                wall.hp -= 1
                if(wall.hp <= 0){
                    walls.splice(j, 1);
                }
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
    // context.fillStyle = 'orange';
    // context.fillRect(bullet.posX, bullet.posY, bullet.width, bullet.height);
    
    if(bullet.direction == "Right")
        context.drawImage(bulletImg, bullet.posX, bullet.posY, bullet.width, bullet.height);
    else{
        context.save();
        context.scale(-1, 1);
        context.drawImage(bulletImg, -bullet.posX, bullet.posY, bullet.width, bullet.height);
        context.restore();
    }

}

function drawWall(wall){
    // context.fillStyle = 'black';
    // context.fillRect(wall.posX, wall.posY, wall.width, wall.height);
    context.drawImage(wallImgs[wall.hp - 1], wall.posX, wall.posY, wall.width, wall.height);

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
    // for (let index = 0; index < walls.length; index++) {
    //     let element = walls[index]
    //     if (LpositionY > (walls[index].posY - BaseHeight - 10) && LpositionY < (walls[index].posY - BaseHeight + 10) && LpositionX >= walls[index].posX - BaseWidth && LpositionX <= (walls[index].posX + walls[index].width)){
    //         LpositionY = (walls[index].posY - BaseHeight)
    //         LspeedY = 0
    //         canLeftJump = true
    //     }
    //     // else if (!(playerLeft.posX > element.posX + element.width || playerLeft.posX + playerLeft.width < element.posX || playerLeft.posY > element.posY + element.height || playerLeft.posY + playerLeft.height < element.posY)){
    //     //     LpositionY = (walls[index].posY - BaseHeight)
    //     //     LspeedY = 0
    //     // }
    // }

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

        if(playerWhoHasAk == "Left"){
            setTimeout(function () {
                canLeftShoot = true;
            }, delayBetweenAkShots);
        }
        else{
            setTimeout(function () {
                canLeftShoot = true;
            }, delayBetweenShots);
        }
    }
}

function ShootRight(){
    if(canRightShoot){
        let currentRightBullet = {posX: playerRight.posX, posY: playerRight.posY + gunPos, width: bulletWidth, height: bulletHeight, direction: rightLastDir}
        rightsBullets.push(currentRightBullet)
        canRightShoot = false

        if(playerWhoHasAk == "Right"){
            setTimeout(function () {
                canRightShoot = true;
            }, delayBetweenAkShots);
        }
        else{
            setTimeout(function () {
                canRightShoot = true;
            }, delayBetweenShots);
        }
    }
}

function WallLeft(){
    if(canLeftWall){
        let currentLeftWall
        if (leftLastDir == "Right"){
            currentLeftWall = {posX: playerLeft.posX + wallOnRight, posY: playerLeft.posY + (playerLeft.height - wallHeight), width: wallWidth, height: wallHeight, hp: wallHp}
        }
        else{
            currentLeftWall = {posX: playerLeft.posX + wallOnLeft, posY: playerLeft.posY + (playerLeft.height - wallHeight), width: wallWidth, height: wallHeight, hp: wallHp}
        }

        walls.push(currentLeftWall)
        canLeftWall = false

        setTimeout(function () {
            canLeftWall = true;
        }, delayBetweenWalls);
    }
}

function WallRight(){
    if(canRightWall){
        let currentRightWall
        if (rightLastDir == "Right"){
            currentRightWall = {posX: playerRight.posX + wallOnRight, posY: playerRight.posY + (playerRight.height - wallHeight), width: wallWidth, height: wallHeight, hp: wallHp}
        }
        else{
            currentRightWall = {posX: playerRight.posX + wallOnLeft, posY: playerRight.posY + (playerRight.height - wallHeight), width: wallWidth, height: wallHeight, hp: wallHp}
        }

        walls.push(currentRightWall)
        canRightWall = false

        setTimeout(function () {
            canRightWall = true;
        }, delayBetweenWalls);
    }
}

function akCall() {
    akDeployed = true
}

setTimeout(akCall, timeOfAk);

function tutorial(){
    alert('Kék(Jobb kézzel):\n   WASD: mozgás\n   E: lövés\n   Q: Fal\n   R: újrakezdés\nPiros(Jobb kézzel):\n   IJKL: mozgás\n   O: lövés\n   U: Fal\n   P: újrakezdés')
}
