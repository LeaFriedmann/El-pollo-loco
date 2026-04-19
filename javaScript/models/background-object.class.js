class BackgroundObject extends MovableObject {

    //#region properties
    x = 0;
    y = 0;
    width = 720;
    height = 480;
    //#endregion

    constructor(imagePath){
        super();
        this.loadImage(imagePath);
    }
}