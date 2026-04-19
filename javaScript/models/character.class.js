class Character extends MovableObject {
    
    //#region properties
    height = 280;
    width = 120;
    y = 155;
    x = 120;

    //#endregion

    constructor(){
        super();
        this.loadImage(ImgHub.PEPE.WALK[0]);
    }

    //#region methods
    jump(){

    }
    //#endregion
}