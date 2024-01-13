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
        LspeedXRight = xSpeed;
        leftLastDir = "Right"
        leftRun = true
    } 
    if (e.code == leftLeft) {
        LspeedXLeft = -xSpeed;
        leftLastDir = "Left";
        leftRun = true;
    }
    if (e.code == leftDown){
        LspeedY = 10;
    } 
    if (e.code == leftUp){
        if(canLeftJump){
            LspeedY = -ySpeed; Ground = false;
            canLeftJump = false
        }
    }

    if (e.code == rightRight){
        RspeedXRight = xSpeed;
        rightLastDir = "Right"
        rightRun = true
    } 
    if (e.code == rightLeft){
       RspeedXLeft = -xSpeed; 
       rightLastDir = "Left"
       rightRun = true
    } 
    if (e.code == rightDown){
        RspeedY = 10;
    }
    if (e.code == rightUp){
        if(canRightJump){
            RspeedY = -ySpeed; Ground = false;
            canRightJump = false
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
        LspeedXRight = 0;
        leftRun = false
    } 
    if (e.code == leftLeft){
        LspeedXLeft = 0;
        leftRun = false
    }
    if (e.code == leftDown) LspeedY = 0;
    // if (e.code == 'KeyW') LspeedY = 0;

    if (e.code == rightRight){
        RspeedXRight = 0;
        rightRun = false
    }
    if (e.code == rightLeft){
        RspeedXLeft = 0;
        rightRun = false
    }
    if (e.code == rightDown) RspeedY = 0;
    // if (e.code == 'KeyI') RspeedY = 0;
})