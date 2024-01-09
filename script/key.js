let xSpeed = 6
let ySpeed = 15

let canLeftJump = true
let canRightJump = true

addEventListener("keydown", function(e){
    if (e.code == 'KeyD'){
        LspeedXRight = xSpeed;
        leftLastDir = "Right"
    } 
    if (e.code == 'KeyA'){
        LspeedXLeft = -xSpeed;
        leftLastDir = "Left"  
    }
    // if (e.code == 'KeyS') LspeedY = 5;
    if (e.code == 'KeyW'){
        if(canLeftJump){
            LspeedY = -ySpeed; Ground = false;
            canLeftJump = false
            
        }
    }
})

addEventListener("keyup", function(e){
    if (e.code == 'KeyD') LspeedXRight = 0;
    if (e.code == 'KeyA') LspeedXLeft = 0;
    // if (e.code == 'KeyS') LspeedY = 0;
    // if (e.code == 'KeyW') LspeedY = 0;
})

addEventListener("keydown", function(e){
    if (e.code == 'ArrowRight'){
        RspeedXRight = xSpeed;
        rightLastDir = "Right"
    } 
    if (e.code == 'ArrowLeft'){
       RspeedXLeft = -xSpeed; 
       rightLastDir = "Left"
    } 
    // if (e.code == 'ArrowDown') RspeedY = 5;
    if (e.code == 'ArrowUp'){
        if(canRightJump){
            RspeedY = -ySpeed; Ground = false;
            canRightJump = false
            
        }
    }
})

addEventListener("keyup", function(e){
    if (e.code == 'ArrowRight') RspeedXRight = 0;
    if (e.code == 'ArrowLeft') RspeedXLeft = 0;
    // if (e.code == 'ArrowDown') RspeedY = 0;
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