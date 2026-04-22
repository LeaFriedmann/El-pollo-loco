class Endboss extends MovableObject {

    constructor(){
        super(1700, 50, 400, 250);
        this.loadImage(ImgHub.ENEMIES.ENDBOSS.ALERT[0]);
        this.loadImages(ImgHub.ENEMIES.ENDBOSS.ALERT);
        // this.x = 1700;
        // this.y = 50;
        // this.height = 400;
        // this.width = 250;

        IntervalHub.startInterval(this.animate, 100)
    }

    // animation endboss für interval
    animate = () => {
        this.playAnimation(ImgHub.ENEMIES.ENDBOSS.ALERT)
    };
}