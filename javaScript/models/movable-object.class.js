class MovableObject {
    //#region properties
    x = 120;
    y = 250   ;
    img;
    height = 150;
    width = 100;


    //#endregion

    //#region methods
    lodadImage(path){
        this.img = new Image();
        this.img.src = path;
    }

    moveRight(){

    }

    moveLeft(){

    }
    //#endregion
}