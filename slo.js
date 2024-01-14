const canvas = document.getElementById('cvs');
const context = canvas.getContext('2d');

let width = 1890
let height = 800

let maxHp = 3

//Karakter méret
const BaseWidth = 80;
const BaseHeight = 150;

let playerLeft = {posX: 150, posY: height - BaseHeight, width: BaseWidth, height: BaseHeight, hp: maxHp, speedXLeft: 0, speedXRight: 0, speedY: 0, canJump: true, canShoot: true, canWall: true}
let playerRight = {posX: width - 150 - BaseWidth, posY: height - BaseHeight, width: BaseWidth, height: BaseHeight, hp: maxHp, speedXLeft: 0, speedXRight: 0, speedY: 0, canJump: true, canShoot: true, canWall: true}

let delayBetweenShots = 500 //ms
let delayBetweenAkShots = 110 //ms
let delayBetweenRpgShots = 600 //ms
let cookie = document.cookie

let timeOfWeapon = random(1000, 1002)//8000, 1400
let timeOfSecondWeapon = random(1000, 1002)//2000, 5000

let xSpeed = 6
let ySpeed = 15

let leftRun = false
let rightRun = false

let localScore = "0:0"

let end = false

//Alap adatok
const cvsHeight = height;
const cvsWidth = width;
const RefressRate = 0.001;

let Ground = false

let allPlatforms = []
let numOfPlatforms = 9
//Mi az a canvas?

let leftLastDir = "Right"
let rightLastDir = "Left"

let bulletSpeed = 12

let firstDeployed = false
let secondDeployed = false

let heightOfGround = 50
canvas.width = width
canvas.height = height + heightOfGround

let leftsBullets = []
let rightsBullets = []
let bulletWidth = 40
let bulletHeight = 10
let rocketWidth = 55
let rocketHeight = 15

let walls = []
let wallWidth = 50
let wallHeight = 175
let delayBetweenWalls = 500 //ms
let wallHp = 5
let wallOnRight = 120
let wallOnLeft = -85
let wallBreakTime = 1750

let ak = {posX: random(0, width - 200), posY: -200, width: 250, height: 100}
let rpg = {posX: -300, posY: random(200, height - 100), width: 250, height: 100, direction: "Right"}
if (random(1, 3) == 2){
    rpg.posX = width + 300
    rpg.direction = "Left"
}

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
let rocketImg = document.getElementById("rocketImg");

let scoreBoard = document.getElementById("points");

let background = document.getElementById("background");

let akImg = document.getElementById("ak");
let rpgImg = document.getElementById("rpgImg");

let platformImgs = [platform0, platform1, platform2]

let framesBetweenAnimations = 20;
let frames = 0

let playerWhoHasAk = "None";
let playerWhoHasRpg = "None";

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
    // playerLeft.posX = playerLeft.posX
    // playerLeft.posY = playerLeft.posY
    // playerLeft.width = BaseWidth
    // playerLeft.height = BaseHeight

    // playerRight.posX = playerRight.posX
    // playerRight.posY = playerRight.posY
    // playerRight.width = BaseWidth
    // playerRight.height = BaseHeight

    context.fillStyle = 'white';
    context.fillRect(0, 0, width, height);
    context.drawImage(background, 0, 0, width, height + heightOfGround);

    
    for (let i = 0; i < allPlatforms.length; i++) {
        const element = allPlatforms[i];
    
        drawPlatform(element)
    
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

    if(firstDeployed){

        // context.fillStyle = 'yellow';
        // context.fillRect(ak.posX, ak.posY, ak.width, ak.height);
        context.drawImage(akImg, ak.posX, ak.posY, ak.width, ak.height);

        if (ak.posY < 50){
            ak.posY += xSpeed / 2

        }
        if(!(ak.posX > playerRight.posX + playerRight.width || ak.posX + ak.width < playerRight.posX || ak.posY > playerRight.posY + playerRight.height || ak.posY + ak.height < playerRight.posY) && playerWhoHasRpg != "Right"){
            //jobb
            ak.posX = -10000
            ak.posY = -10000

            rightPlayerImage = document.getElementById("rightPlayerImageAk");
            rightPlayerImageLeft = document.getElementById("rightPlayerImageLeftAk");
            rightPlayerImageRight = document.getElementById("rightPlayerImageRightAk");

            playerWhoHasAk = "Right"
        }
        else if(!(ak.posX > playerLeft.posX + playerLeft.width || ak.posX + ak.width < playerLeft.posX || ak.posY > playerLeft.posY + playerLeft.height || ak.posY + ak.height < playerLeft.posY) && playerWhoHasRpg != "Left"){
            //bal
            ak.posX = -10000
            ak.posY = -10000

            leftPlayerImage = document.getElementById("leftPlayerImageAk");
            leftPlayerImageLeft = document.getElementById("leftPlayerImageLeftAk");
            leftPlayerImageRight = document.getElementById("leftPlayerImageRightAk");

            playerWhoHasAk = "Left"
        }

        if(secondDeployed){
            // context.fillStyle = 'yellow';
            // context.fillRect(rpg.posX, rpg.posY, rpg.width, rpg.height);
            if((playerWhoHasRpg == "Left" && leftLastDir == "Right") || (playerWhoHasRpg == "Right" && rightLastDir == "Right")){
                context.drawImage(rpgImg, rpg.posX, rpg.posY, rpg.width, rpg.height)
            }
            else if(playerWhoHasRpg  != "None"){
                context.save();
                context.scale(-1, 1);
                context.drawImage(rpgImg, -rpg.posX - rpg.width, rpg.posY, rpg.width, rpg.height)
                context.restore();
            }
            else{
                context.drawImage(rpgImg, rpg.posX, rpg.posY, rpg.width, rpg.height)
            }

            if(rpg.direction == "Right"){
                if (rpg.posX < 50){
                    rpg.posX += xSpeed / 2
                }
            }
            else{
                if (rpg.posX > width - rpg.width - 50){
                    rpg.posX -= xSpeed / 2
                }
            }

            if(checkCollision(playerLeft, rpg) && playerWhoHasRpg == "None" && playerWhoHasAk != "Left"){
                playerWhoHasRpg = "Left"
                
            }
            if(checkCollision(playerRight, rpg) && playerWhoHasRpg == "None" && playerWhoHasAk != "Right"){
                playerWhoHasRpg = "Right"
                
            }

            if(playerWhoHasRpg == "Left"){
                rpg.posX = playerLeft.posX - 10
                rpg.posY = playerLeft.posY + 65
                rpg.width = 100
                rpg.height = 50
            }

            if(playerWhoHasRpg == "Right"){
                rpg.posX = playerRight.posX - 10
                rpg.posY = playerRight.posY + 65
                rpg.width = 100
                rpg.height = 50
            }
        }
    }

    for (let i = 0; i < walls.length; i++) {
        const wall = walls[i];
        drawWall(wall)

        if (checkCollision(playerLeft, wall)) {
            handleCollisionWall(playerLeft, wall);
        }
        if (checkCollision(playerRight, wall)) {
            handleCollisionWall(playerRight, wall);
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

    playerLeft.posX += playerLeft.speedXLeft;
    playerLeft.posX += playerLeft.speedXRight;
    playerLeft.posY += playerLeft.speedY;

    playerRight.posX += playerRight.speedXLeft;
    playerRight.posX += playerRight.speedXRight;
    playerRight.posY += playerRight.speedY;

    Limits()

    if (checkCollision(playerRight, playerLeft)) {
        handleCollisionPlayer(playerRight, playerLeft);
    }
    




}

function checkCollision(square1, square2) 
{
    return (
        square1.posX < square2.posX + square2.width &&
        square1.posX + square1.width > square2.posX &&
        square1.posY < square2.posY + square2.height &&
        square1.posY + square1.height > square2.posY
    );
}

function handleCollisionPlayer(player1, player2) {
    const overlapX = Math.max(0, Math.min(player1.posX + player1.width, player2.posX + player2.width) - Math.max(player1.posX, player2.posX));
    const overlapY = Math.max(0, Math.min(player1.posY + player1.height, player2.posY + player2.height) - Math.max(player1.posY, player2.posY));

    if (overlapX < overlapY) {
        if (player1.posX < player2.posX) {
            player1.posX -= overlapX / 2;
            player2.posX += overlapX / 2;
        } else {
            player1.posX += overlapX / 2;
            player2.posX -= overlapX / 2;
        }
    } else {
        if (player1.posY < player2.posY) {
            player1.posY -= overlapY / 2;
            player2.posY += overlapY / 2;
            player1.posY = (player2.posY - BaseHeight)
            playerRight.speedY = 0
            playerRight.canJump = true
        } else {
            player1.posY += overlapY / 2;
            player2.posY -= overlapY / 2;
            player2.posY = (player1.posY - BaseHeight)
            playerLeft.speedY = 0
            playerLeft.canJump = true
            
        }
    }
}

function handleCollisionWall(player, wall)//player, wall
{
    const overlapX = Math.max(0, Math.min(player.posX + player.width, wall.posX + wall.width) - Math.max(player.posX, wall.posX));
    const overlapY = Math.max(0, Math.min(player.posY + player.height, wall.posY + wall.height) - Math.max(player.posY, wall.posY));

    if (overlapX < overlapY) 
    {
        if (player.posX < wall.posX) 
        {
            player.posX += -overlapX;
        } 
        else 
        {
            player.posX += overlapX;
        }
    }
    else 
    {
        if (player.posY < wall.posY)
        {
            player.posY = (wall.posY - BaseHeight)
            player.speedY = 0
            player.canJump = true
        } 
        else 
        {
            player.posY = wall.posY + wall.height;
            player.speedY = 0
        }
    }
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
    let img = bulletImg
    if(bullet.isRocket){
        img = rocketImg
    }
    if(bullet.direction == "Right")
        context.drawImage(img, bullet.posX, bullet.posY, bullet.width, bullet.height);
    else{
        context.save();
        context.scale(-1, 1);
        context.drawImage(img, -bullet.posX, bullet.posY, bullet.width, bullet.height);
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
        playerLeft.speedY += 0.09;
    }
})
setInterval (function GravityR(){
    if (Ground == false){
        playerRight.speedY += 0.09;
    }
})

function Limits(){
    if (playerLeft.posY >= cvsHeight - BaseHeight){
        playerLeft.posY = (cvsHeight - BaseHeight)
        playerLeft.canJump = true

    }
    if (playerLeft.posY <= 0){
        playerLeft.posY = 0
        playerLeft.speedY = 0
    }
    if (playerLeft.posX <= 0){
        playerLeft.posX = 0
    }
    if (playerLeft.posX >= cvsWidth - BaseWidth){
        playerLeft.posX = (cvsWidth - BaseWidth)
    }
    for (let index = 0; index < allPlatforms.length; index++) {
        if (playerLeft.posY > (allPlatforms[index].posY - BaseHeight - 10) && playerLeft.posY < (allPlatforms[index].posY - BaseHeight + 10) && playerLeft.posX >= allPlatforms[index].posX - BaseWidth && playerLeft.posX <= (allPlatforms[index].posX + allPlatforms[index].width)){
            playerLeft.posY = (allPlatforms[index].posY - BaseHeight)
            playerLeft.speedY = 0
            playerLeft.canJump = true
        }
    }
    // if (playerLeft.posY > (playerRight.posY - BaseHeight - 10) && playerLeft.posY < (playerRight.posY - BaseHeight + 10) && playerLeft.posX >= playerRight.posX - BaseWidth && playerLeft.posX <= (playerRight.posX + playerRight.width)){
    //     playerLeft.posY = 0
    //     playerLeft.speed = 0
    //     playerLeft.canJump = true
    // }
    // for (let index = 0; index < walls.length; index++) {
    //     let element = walls[index]
    //     if (playerLeft.posY > (walls[index].posY - BaseHeight - 10) && playerLeft.posY < (walls[index].posY - BaseHeight + 10) && playerLeft.posX >= walls[index].posX - BaseWidth && playerLeft.posX <= (walls[index].posX + walls[index].width)){
    //         playerLeft.posY = (walls[index].posY - BaseHeight)
    //         playerLeft.speed = 0
    //         playerLeft.canJump = true
    //     }
    //     // else if (!(playerLeft.posX > element.posX + element.width || playerLeft.posX + playerLeft.width < element.posX || playerLeft.posY > element.posY + element.height || playerLeft.posY + playerLeft.height < element.posY)){
    //     //     playerLeft.posY = (walls[index].posY - BaseHeight)
    //     //     playerLeft.speed = 0
    //     // }
    // }

    if (playerRight.posY >= cvsHeight - BaseHeight){
        playerRight.posY = (cvsHeight - BaseHeight)
        playerRight.canJump = true

    }
    if (playerRight.posY <= 0){
        playerRight.posY = 0
        playerRight.speedY = 0
    }
    if (playerRight.posX <= 0){
        playerRight.posX = 0
    }
    if (playerRight.posX >= cvsWidth - BaseWidth){
        playerRight.posX = (cvsWidth - BaseWidth)
    }
    for (let index = 0; index < allPlatforms.length; index++) {
        if (playerRight.posY > (allPlatforms[index].posY - BaseHeight - 10) && playerRight.posY < (allPlatforms[index].posY - BaseHeight + 10) && playerRight.posX >= allPlatforms[index].posX - BaseWidth && playerRight.posX <= (allPlatforms[index].posX + allPlatforms[index].width)){
            playerRight.posY = (allPlatforms[index].posY - BaseHeight)
            playerRight.speedY = 0
            playerRight.canJump = true
        }
    }
}

let gunPos = 77

function ShootLeft(){
    if(playerLeft.canShoot){
        if(playerWhoHasRpg == "Left"){
            let currentLeftBullet = {posX: playerLeft.posX, posY: playerLeft.posY + gunPos, width: rocketWidth, height: rocketHeight, direction: leftLastDir, isRocket: true}
            leftsBullets.push(currentLeftBullet)
            playerLeft.canShoot = false

            setTimeout(function () {
                playerLeft.canShoot = true;
            }, delayBetweenRpgShots);
        }
        else{
            let currentLeftBullet = {posX: playerLeft.posX, posY: playerLeft.posY + gunPos, width: bulletWidth, height: bulletHeight, direction: leftLastDir, isRocket: false}
            leftsBullets.push(currentLeftBullet)
            playerLeft.canShoot = false
    
            if(playerWhoHasAk == "Left"){
                setTimeout(function () {
                    playerLeft.canShoot = true;
                }, delayBetweenAkShots);
            }
            else{
                setTimeout(function () {
                    playerLeft.canShoot = true;
                }, delayBetweenShots);
            }
        }
    }
}

function ShootRight(){
    if(playerRight.canShoot){
        if(playerWhoHasRpg == "Right"){
            let currentRightBullet = {posX: playerRight.posX, posY: playerRight.posY + gunPos, width: rocketWidth, height: rocketHeight, direction: rightLastDir, isRocket: true}
            rightsBullets.push(currentRightBullet)
            playerRight.canShoot = false

            setTimeout(function () {
                playerRight.canShoot = true;
            }, delayBetweenRpgShots);
        }
        else{
            let currentRightBullet = {posX: playerRight.posX, posY: playerRight.posY + gunPos, width: bulletWidth, height: bulletHeight, direction: rightLastDir, isRocket: false}
            rightsBullets.push(currentRightBullet)
            playerRight.canShoot = false
    
            if(playerWhoHasAk == "Right"){
                setTimeout(function () {
                    playerRight.canShoot = true;
                }, delayBetweenAkShots);
            }
            else{
                setTimeout(function () {
                    playerRight.canShoot = true;
                }, delayBetweenShots);
            }
        }
    }
}

function WallLeft(){
    if(playerLeft.canWall){
        let currentLeftWall
        if (leftLastDir == "Right"){
            currentLeftWall = {posX: playerLeft.posX + wallOnRight, posY: playerLeft.posY + (playerLeft.height - wallHeight), width: wallWidth, height: wallHeight, hp: wallHp}
        }
        else{
            currentLeftWall = {posX: playerLeft.posX + wallOnLeft, posY: playerLeft.posY + (playerLeft.height - wallHeight), width: wallWidth, height: wallHeight, hp: wallHp}
        }

        walls.push(currentLeftWall)
        playerLeft.canWall = false

        setTimeout(function () {
            playerLeft.canWall = true;
        }, delayBetweenWalls);
    }
}

function WallRight(){
    if(playerRight.canWall){
        let currentRightWall
        if (rightLastDir == "Right"){
            currentRightWall = {posX: playerRight.posX + wallOnRight, posY: playerRight.posY + (playerRight.height - wallHeight), width: wallWidth, height: wallHeight, hp: wallHp}
        }
        else{
            currentRightWall = {posX: playerRight.posX + wallOnLeft, posY: playerRight.posY + (playerRight.height - wallHeight), width: wallWidth, height: wallHeight, hp: wallHp}
        }

        walls.push(currentRightWall)
        playerRight.canWall = false

        setTimeout(function () {
            playerRight.canWall = true;
        }, delayBetweenWalls);
    }
}

function weaponCall() {
    firstDeployed = true
    setTimeout(secondDeployed = true, timeOfWeapon);

}

function wallBreak() {
    for (let i = 0; i < walls.length; i++) {
        const wall = walls[i];
        wall.hp -= 1
        if(wall.hp <= 0){
            walls.splice(i, 1);
        }
        
    }
}

let wallInterval = setInterval(wallBreak, wallBreakTime)


function tutorial(){
    alert('Irányítás:\n\n   Kék(Bal kézzel):\n      WASD: mozgás\n      E: lövés\n      Q: Fal\n      R: újrakezdés\n   Piros(Bal kézzel):\n      IJKL: mozgás\n      O: lövés\n      U: Fal\n      P: újrakezdés')
}

setTimeout(weaponCall, timeOfWeapon);