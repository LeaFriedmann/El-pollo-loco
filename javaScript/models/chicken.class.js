class Chicken extends MovableObject {

    //#region properties
    // y = 360;
    // height = 60;
    // width = 60;
    // speed;
    //#endregion

    constructor(){
        super(200 + Math.random() * 500, 360, 60, 60, 0.50 + Math.random());
        this.loadImage(ImgHub.ENEMIES.CHICKEN_NORMAL.WALK[0]);
        this.loadImages(ImgHub.ENEMIES.CHICKEN_NORMAL.WALK);

        // this.x = 200 + Math.random() * 500;
        // this.speed = 0.5 + Math.random();

        IntervalHub.startInterval(this.animate, 50);
    }

    // für interval, laufanimation + laufen nach links
    animate = () => {
        this.moveLeft();
        this.playAnimation(ImgHub.ENEMIES.CHICKEN_NORMAL.WALK)
    };
}