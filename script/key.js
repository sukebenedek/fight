addEventListener("keydown", function(e){
    if (e.code == 'KeyD') LspeedXRight = 1.5;
    if (e.code == 'KeyA') LspeedXLeft = -1.5;
    // if (e.code == 'KeyS') LspeedY = 5;
    if (e.code == 'KeyW') LspeedY = -1.5; Ground = false;
})

addEventListener("keyup", function(e){
    if (e.code == 'KeyD') LspeedXRight = 0;
    if (e.code == 'KeyA') LspeedXLeft = 0;
    // if (e.code == 'KeyS') LspeedY = 0;
    // if (e.code == 'KeyW') LspeedY = 0;
})

addEventListener("keydown", function(e){
    if (e.code == 'ArrowRight') RspeedXRight = 1.5;
    if (e.code == 'ArrowLeft') RspeedXLeft = -1.5;
    // if (e.code == 'ArrowDown') RspeedY = 5;
    if (e.code == 'ArrowUp') RspeedY = -1.5; Ground = false;
})

addEventListener("keyup", function(e){
    if (e.code == 'ArrowRight') RspeedXRight = 0;
    if (e.code == 'ArrowLeft') RspeedXLeft = 0;
    // if (e.code == 'ArrowDown') RspeedY = 0;
    // if (e.code == 'ArrowUp') RspeedY = 0;
})