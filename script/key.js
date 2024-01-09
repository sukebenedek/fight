addEventListener("keydown", function(e){
    if (e.code == 'KeyD') LspeedXRight = 6;
    if (e.code == 'KeyA') LspeedXLeft = -6;
    // if (e.code == 'KeyS') LspeedY = 5;
    if (e.code == 'KeyW') LspeedY = -15; Ground = false;
})

addEventListener("keyup", function(e){
    if (e.code == 'KeyD') LspeedXRight = 0;
    if (e.code == 'KeyA') LspeedXLeft = 0;
    // if (e.code == 'KeyS') LspeedY = 0;
    // if (e.code == 'KeyW') LspeedY = 0;
})

addEventListener("keydown", function(e){
    if (e.code == 'ArrowRight') RspeedXRight = 6;
    if (e.code == 'ArrowLeft') RspeedXLeft = -6;
    // if (e.code == 'ArrowDown') RspeedY = 5;
    if (e.code == 'ArrowUp') RspeedY = -15; Ground = false;
})

addEventListener("keyup", function(e){
    if (e.code == 'ArrowRight') RspeedXRight = 0;
    if (e.code == 'ArrowLeft') RspeedXLeft = 0;
    // if (e.code == 'ArrowDown') RspeedY = 0;
    // if (e.code == 'ArrowUp') RspeedY = 0;
})

addEventListener("keydown", function(e){
    if (e.code == 'KeyF'){
        console.log("f");
        Shoot()
    }
})