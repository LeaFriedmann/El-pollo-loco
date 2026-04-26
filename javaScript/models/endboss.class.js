class Endboss extends MovableObject {

    offset = {
        top: 80,
        right: 20,
        bottom: 20,
        left: 20,
    }

    constructor(x_){
        super(x_, 50, 400, 250);

        this.loadImage(ImgHub.ENEMIES.ENDBOSS.ALERT[0]);
        this.loadImages(ImgHub.ENEMIES.ENDBOSS.ALERT);

        IntervalHub.startInterval(this.animate, 100)
    }

    // animation endboss für interval
    animate = () => {
        this.playAnimation(ImgHub.ENEMIES.ENDBOSS.ALERT)
    };
}