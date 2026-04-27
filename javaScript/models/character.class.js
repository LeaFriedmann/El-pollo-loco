class Character extends MovableObject {
    //#region properties

    currentImg = 0;
    offset = {
        top: 130,
        right: 30,
        bottom: 20,
        left: 30,
    };

    //#endregion

    constructor() {
        super(120, 150, 280, 120, 10);

        this.getFrameValues();
        this.loadImage(ImgHub.PEPE.WALK[0]);
        this.loadImages(ImgHub.PEPE.WALK);
        this.loadImages(ImgHub.PEPE.JUMP);
        this.loadImages(ImgHub.PEPE.DEAD);
        this.loadImages(ImgHub.PEPE.HURT);

        IntervalHub.startInterval(this.movement, 1000 / 25);
        IntervalHub.startInterval(this.animate, 70); // laufanimation
        IntervalHub.startInterval(this.applyGravity, 1000 / 25); // fall animation
    }

    //#region methods

    // TODO geschwindigkeit animation anpassen

    movement = () => {
        // bewegt objekt wenn pfeiltaste rechts gedrückt
        // und objekt noch nicht am ende der Level.END_X koordinate angekommen
        if (Keyboard.RIGHT && this.x < Level.END_X) {
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

        World.CAMERA_X = -this.x + 100;
    };

    animate = () => {
        // spielt sprung animation wenn character über dem boden
        if (!this.isAboveGround()) {
            this.currentJumpImg = 0;
        }
        if (this.isDead()) {
            this.playAnimation(ImgHub.PEPE.DEAD);
        } else if(this.isHurt()){
            this.playAnimation(ImgHub.PEPE.HURT)
        } else if (this.isAboveGround()) {
            this.playJumpAnimation(ImgHub.PEPE.JUMP);
        } else {
            // spielt laufanimation wenn rechte oder linke pfeiltaste gedrückt
            if (Keyboard.RIGHT || Keyboard.LEFT) {
                this.playAnimation(ImgHub.PEPE.WALK);
            }
        }
    };
    //#endregion
}
