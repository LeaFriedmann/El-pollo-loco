class Cloud extends MovableObject {
    //#region properties
    y = 20;
    height = 250;
    width = 500;
    //#endregion

    constructor() {
        super();
        this.loadImage(ImgHub.BACKGROUND.CLOUDS[0]);
        this.x = Math.random() * 500;
        IntervalHub.startInterval(this.animate, 1000 / 60); // startet interval um wolken zu bewegen

    }

    // zieht 0.15 px von x koordinate ab (für interval)
    animate = () => {
        this.x -= 0.15;
    }

}
