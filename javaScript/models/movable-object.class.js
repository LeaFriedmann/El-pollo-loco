class MovableObject {
    //#region properties
    x;
    y;
    img;
    height;
    width;
    imgCache = {};
    currentImg = 0;

    //#endregion

    //#region methods
    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    loadImages(arr){
        arr.forEach(path => {
            const img = new Image();
            img.src = path;
            this.imgCache[path] = img;
        });
    }

    moveRight() {}

    moveLeft() {}
    //#endregion
}
