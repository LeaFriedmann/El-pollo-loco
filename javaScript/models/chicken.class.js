class Chicken extends MovableObject {

    //#region properties
    x;
    y;
    //#endregion

    constructor(){
        super().lodadImage(ImgHub.ENEMIES.CHICKEN_NORMAL.WALK[0])
    }
}