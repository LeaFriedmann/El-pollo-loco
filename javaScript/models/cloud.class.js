class Cloud extends MovableObject {

    //#region properties
    y = 20;
    height = 250;
    width = 500
    //#endregion

    constructor(){
        super();
        this.lodadImage(ImgHub.BACKGROUND.CLOUDS[0])

        this.x = Math.random() * 500;
    }
}