class Character extends MovableObject {
    //#region properties
    height = 280;
    width = 120;
    y = 155;
    x = 120;
    currentImg = 0;
    speed = 10;
    world;

    //#endregion

    constructor() {
        super();

        this.loadImage(ImgHub.PEPE.WALK[0]);
        this.loadImages(ImgHub.PEPE.WALK);

        IntervalHub.startInterval(this.animate, 50);
    }

    //#region methods

    animate = () => {

        if (Keyboard.RIGHT && this.x < level1.level_end_x) {
            this.x += this.speed;
            this.otherDirection = false;
        }

        if (Keyboard.LEFT && this.x > 0) {
            this.x -= this.speed;
            this.otherDirection = true;
        }

        World.CAMERA_X = - this.x + 100;

        if (Keyboard.RIGHT || Keyboard.LEFT) {
            this.playAnimation(ImgHub.PEPE.WALK)
        }
    };

    jump() {}
    //#endregion
}
