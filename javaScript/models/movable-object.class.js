class MovableObject {
    //#region properties
    x;
    y;
    img;
    height;
    width;


    //#endregion

    //#region methods
    loadImage(path){
        this.img = new Image();
        this.img.src = path;
    }

    moveRight(){

    }

    moveLeft(){

    }
    //#endregion
}