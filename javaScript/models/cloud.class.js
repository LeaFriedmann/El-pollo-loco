class Cloud extends MovableObject {

    constructor(x_) {
        super(x_, 20, 250, 500, 0.15);
        this.loadImage(ImgHub.BACKGROUND.CLOUDS[0]);
        IntervalHub.startInterval(this.animate, 1000 / 60); // startet interval um wolken zu bewegen

    }

    // für interval bewegung wolken nach links
    animate = () => {
        this.moveLeft();
    }

}
