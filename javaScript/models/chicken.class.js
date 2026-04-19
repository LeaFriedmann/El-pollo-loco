class Chicken extends MovableObject {

    //#region properties
    y = 360;
    height = 60;
    width = 60;
    //#endregion

    constructor(){
        super();
        this.loadImage(ImgHub.ENEMIES.CHICKEN_NORMAL.WALK[0]);

        this.x = 200 + Math.random() * 500;
    }
}