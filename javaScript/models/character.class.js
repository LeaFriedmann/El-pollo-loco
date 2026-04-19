class Character extends MovableObject {
    //#region properties
    height = 280;
    width = 120;
    y = 155;
    x = 120;
    currentImg = 0;

    //#endregion

    constructor() {
        super();
        this.loadImage(ImgHub.PEPE.WALK[0]);
        this.loadImages(ImgHub.PEPE.WALK);
        IntervalHub.startInterval(this.animate, 150);
    }

    //#region methods

    animate = () => {
        const i = this.currentImg % ImgHub.PEPE.WALK.length;
        const path = ImgHub.PEPE.WALK[i];
        this.img = this.imgCache[path];
        this.currentImg++;
    };

    jump() {}
    //#endregion
}
