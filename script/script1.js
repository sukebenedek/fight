//Alap adatok
const cvsHeight = 600;
const cvsWidth = 800;
const RefressRate = 0.001;

//Karakter méret
const BaseWidth = 10;
const BaseHeight = 20;

let Ground = false

//Mozgáshoz Right
let RpositionX = 600;
let RpositionY = 0;
let RspeedXLeft = 0;
let RspeedXRight = 0;
let RspeedY = 0;

//Mozgáshoz Left
let LpositionX = 0;
let LpositionY = 0;
let LspeedXLeft = 0;
let LspeedXRight = 0;
let LspeedY = 0;

function Left() {
    const cvs = document.querySelector('#cvs');
    const c = cvs.getContext('2d');

console.log('Done')

    c.clearRect(0,0,cvsWidth,cvsHeight);
    LpositionX += LspeedXLeft;  
    LpositionX += LspeedXRight;
    LpositionY += LspeedY;    

    RpositionX += RspeedXLeft;  
    RpositionX += RspeedXRight;
    RpositionY += RspeedY;    

    Limits()

    c.fillStyle = "#000";
    c.fillRect(RpositionX, RpositionY, BaseWidth, BaseHeight);

    c.fillStyle = "#000";
    c.fillRect(LpositionX, LpositionY, BaseWidth, BaseHeight);
}
function Limits(){
    // Letf
    if (LpositionY >= cvsHeight - BaseHeight){
        LpositionY = (cvsHeight - BaseHeight)
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

    // Right
    if (RpositionY >= cvsHeight - BaseHeight){
        RpositionY = (cvsHeight - BaseHeight)
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
}

setInterval (function Gravity(){
    if (Ground == false){
        LspeedY += 0.01;
        RspeedY += 0.01;
    }
})



const interval = setInterval(Left, RefressRate);