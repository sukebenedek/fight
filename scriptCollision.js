for (let index = 0; index < allPlatforms.length; index++) {
    if (RpositionY > (allPlatforms[index].posY - BaseHeight) && RpositionY < (allPlatforms[index].posY - BaseHeight + 20) && RpositionX >= allPlatforms[index].posX - BaseWidth && RpositionX <= (allPlatforms[index].posX + allPlatforms[index].width)){
        RpositionY = (allPlatforms[index].posY - BaseHeight)
        RspeedY = 0
    }
}
for (let index = 0; index < allPlatforms.length; index++) {
    if (LpositionY > (allPlatforms[index].posY - BaseHeight) && LpositionY < (allPlatforms[index].posY - BaseHeight + 20) && LpositionX >= allPlatforms[index].posX - BaseWidth && LpositionX <= (allPlatforms[index].posX + allPlatforms[index].width)){
        LpositionY = (allPlatforms[index].posY - BaseHeight)
        LspeedY = 0
    }
}