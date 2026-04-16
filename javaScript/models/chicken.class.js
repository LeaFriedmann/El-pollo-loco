class Chicken extends MovableObject {

    //#region properties
    //#endregion

    constructor(){
        super().lodadImage(ImgHub.ENEMIES.CHICKEN_NORMAL.WALK[0]),

        this.x = 200 + Math.random() * 500;
    }
}