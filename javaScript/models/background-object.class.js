class BackgroundObject extends MovableObject {

    //#region properties
    x;
    y = 0;
    width = 720;
    height = 480;
    //#endregion

    constructor(imagePath, x){
        super();
        this.loadImage(imagePath);
        this.x = x;
    }
}