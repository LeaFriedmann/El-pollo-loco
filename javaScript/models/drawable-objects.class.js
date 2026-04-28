export class DrawableObject {
    //#region properties
    x;
    y;
    img;
    height;
    width;
    imgCache = {};
    currentImg = 0;
    visible = true;
    //#endregion

    constructor(x_, y_, height_, width_) {
        this.x = x_;
        this.y = y_;
        this.height = height_;
        this.width = width_;
    }

    //#region methods
    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    // lädt alle bilder des entsprechenden arays in variable imgCache
    loadImages(arr) {
        arr.forEach((path) => {
            const img = new Image();
            img.src = path;
            this.imgCache[path] = img;
        });
    }

    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }

    //#endregion
}
