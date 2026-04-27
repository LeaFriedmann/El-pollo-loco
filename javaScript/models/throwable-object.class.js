class ThrowableObject extends MovableObject {

    offset = {
        top: 10,
        right: 20,
        bottom: 10,
        left: 20,
    }
    speedY = 30;

    constructor(x_, y_){
        super(x_, y_, 70, 50, 10);
        this.loadImage(ImgHub.BOTTLE.NORMAL);
        // this.throw();
        IntervalHub.startInterval(this.applyGravity, 1000 / 25);
        IntervalHub.startInterval(this.animate, 25)

    }

    //#region methods

    // throw(){
    //     this.speedY = 30;
    // }

    animate = () => {
        this.moveRight();
    }

    //#endregion
}