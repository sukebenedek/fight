let xSpeed = 6
let ySpeed = 15

let canLeftJump = true
let canRightJump = true

let leftRun = false
let rightRun = false

addEventListener("keydown", function(e){
    if (e.code == 'KeyD'){
        LspeedXRight = xSpeed;
        leftLastDir = "Right"
        leftRun = true
    } 
    if (e.code == 'KeyA'){
        LspeedXLeft = -xSpeed;
        leftLastDir = "Left"  
        leftRun = true
    }
    if (e.code == 'KeyS') LspeedY = 10;
    if (e.code == 'KeyW'){
        if(canLeftJump){
            LspeedY = -ySpeed; Ground = false;
            canLeftJump = false
            
        }
    }
})

addEventListener("keyup", function(e){
    if (e.code == 'KeyD'){
        LspeedXRight = 0;
        leftRun = false
    } 
    if (e.code == 'KeyA'){
        LspeedXLeft = 0;
        leftRun = false
    }
    if (e.code == 'KeyS') LspeedY = 0;
    // if (e.code == 'KeyW') LspeedY = 0;
})

addEventListener("keydown", function(e){
    if (e.code == 'ArrowRight'){
        RspeedXRight = xSpeed;
        rightLastDir = "Right"
        rightRun = true
    } 
    if (e.code == 'ArrowLeft'){
       RspeedXLeft = -xSpeed; 
       rightLastDir = "Left"
       rightRun = true
    } 
    if (e.code == 'ArrowDown') RspeedY = 10;
    if (e.code == 'ArrowUp'){
        if(canRightJump){
            RspeedY = -ySpeed; Ground = false;
            canRightJump = false
            
        }
    }
})

addEventListener("keyup", function(e){
    if (e.code == 'ArrowRight'){
        RspeedXRight = 0;
        rightRun = false
    }
    if (e.code == 'ArrowLeft'){
        RspeedXLeft = 0;
        rightRun = false
    }
    if (e.code == 'ArrowDown') RspeedY = 0;
    // if (e.code == 'ArrowUp') RspeedY = 0;
})

addEventListener("keydown", function(e){
    if (e.code == 'KeyF'){
        ShootLeft()
    }
})

document.addEventListener("keydown", function(e) {
    if (e.code === 'ShiftRight') {
        ShootRight()
    }
});