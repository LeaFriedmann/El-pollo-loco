class MovableObject {
    //#region properties
    x;
    y;
    img;
    height;
    width;
    imgCache = {};
    currentImg = 0;
    speed;
    otherDirection = false;

    //#endregion

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

    playAnimation(images) {
        const i = this.currentImg % images.length;
        const path = images[i];
        this.img = this.imgCache[path];
        this.currentImg++;
    }

    moveRight() {}

    // verringert x koordinate des objekts um die geschwindigkeit (speed) des objekts
    moveLeft() {
        this.x -= this.speed;
    }
    //#endregion
}
