class Cloud extends MovableObject {
    //#region properties
    // y = 20;
    // height = 250;
    // width = 500;
    // speed = 0.15;
    //#endregion

    constructor() {
        super(Math.random() * 500, 20, 250, 500, 0.15);
        this.loadImage(ImgHub.BACKGROUND.CLOUDS[0]);
        // this.x = Math.random() * 500;
        IntervalHub.startInterval(this.animate, 1000 / 60); // startet interval um wolken zu bewegen

    }

    // für interval bewegung wolken nach links
    animate = () => {
        this.moveLeft();
    }

}
