class Character extends MovableObject {
    //#region properties
    // height = 280;
    // width = 120;
    // y = 155;
    // x = 120;
    currentImg = 0;
    // speed = 10;

    //#endregion

    constructor() {
        super(120, 80, 280, 120, 10);

        this.loadImage(ImgHub.PEPE.WALK[0]);
        this.loadImages(ImgHub.PEPE.WALK);
        this.loadImages(ImgHub.PEPE.JUMP);

        IntervalHub.startInterval(this.animate, 50); // laufanimation
        IntervalHub.startInterval(this.applyGravity, 1000 / 25); // fall animation
    }

    //#region methods

    // TODO geschwindigkeit animation anpassen
    animate = () => {

        // bewegt objekt wenn pfeiltaste rechts gedrückt 
        // und objekt noch nicht am ende der level_end_x koordinate angekommen
        if (Keyboard.RIGHT && this.x < level1.level_end_x) {
            this.moveRight();
            this.otherDirection = false;
        }

        // bewegt objekt wenn pfeiltaste links gedrückt 
        // und x koordinate größer als 0
        if (Keyboard.LEFT && this.x > 0) {
            this.moveLeft();
            this.otherDirection = true;
        }

        // sprung wird nur ausgeführt wenn character auf boden
        if (Keyboard.UP && !this.isAboveGround()) {
            this.jump();
        }

        World.CAMERA_X = - this.x + 100;

        // spielt sprung animation wenn character über dem boden
        if (this.isAboveGround()) {
            this.playAnimation(ImgHub.PEPE.JUMP)
        } else {

            // spielt laufanimation wenn rechte oder linke pfeiltaste gedrückt
            if (Keyboard.RIGHT || Keyboard.LEFT) {
                this.playAnimation(ImgHub.PEPE.WALK)
            }
        }

    };
    //#endregion
}
