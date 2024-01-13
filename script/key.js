//Keys
let leftLeft = 'KeyA'
let leftRight = 'KeyD'
let leftDown = 'KeyS'
let leftUp = 'KeyW'

let rightLeft = 'KeyJ'
let rightRight = 'KeyL'
let rightDown = 'KeyK'
let rightUp = 'KeyI'

let leftShoot = 'KeyE'
let leftBuild = 'KeyQ'
let leftRestart = 'KeyR'

let rightShoot = 'KeyO'
let rightBuild = 'KeyU'
let rightRestart = 'KeyP'


addEventListener("keydown", function(e){
    if (e.code == leftRight){
        playerLeft.speedXRight = xSpeed;
        leftLastDir = "Right"
        leftRun = true
    } 
    if (e.code == leftLeft) {
        playerLeft.speedXLeft = -xSpeed;
        leftLastDir = "Left";
        leftRun = true;
    }
    if (e.code == leftDown){
        playerLeft.speedY = 10;
    } 
    if (e.code == leftUp){
        if(playerLeft.canJump){
            playerLeft.speedY = -ySpeed;
            Ground = false;
            playerLeft.canJump = false
        }
    }

    if (e.code == rightRight){
        playerRight.speedXRight = xSpeed;
        rightLastDir = "Right"
        rightRun = true
    } 
    if (e.code == rightLeft){
       playerRight.speedXLeft = -xSpeed; 
       rightLastDir = "Left"
       rightRun = true
    } 
    if (e.code == rightDown){
        playerRight.speedY = 10;
    }
    if (e.code == rightUp){
        if(playerRight.canJump){
            playerRight.speedY = -ySpeed;
            Ground = false;
            playerRight.canJump = false
        }
    }

    if (e.code == leftShoot){
        ShootLeft()
    }
    if(e.code == leftBuild){
        WallLeft()
    }
    if (end && e.code === leftRestart){
        location.reload()
    }

    if (e.code === rightShoot) {
        ShootRight()
    }
    if(e.code == rightBuild){
        WallRight()
    }
    if (end && e.code === rightRestart){
        location.reload()
    }
})

addEventListener("keyup", function(e){
    if (e.code == leftRight){
        playerLeft.speedXRight = 0;
        leftRun = false
    } 
    if (e.code == leftLeft){
        playerLeft.speedXLeft = 0;
        leftRun = false
    }
    if (e.code == leftDown) playerLeft.speedY = 0;
    // if (e.code == 'KeyW') playerLeft.speedY = 0;

    if (e.code == rightRight){
        playerRight.speedXRight = 0;
        rightRun = false
    }
    if (e.code == rightLeft){
        playerRight.speedXLeft = 0;
        rightRun = false
    }
    if (e.code == rightDown) playerRight.speedY = 0;
    // if (e.code == 'KeyI') playerRight.speedY = 0;
})