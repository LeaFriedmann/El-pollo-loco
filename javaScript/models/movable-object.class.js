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
    speedY = 0;
    acceleration = 2.5;
    energy = 100;

    //#endregion

    constructor(x_, y_, height_, width_, speed_) {
        this.x = x_;
        this.y = y_;
        this.height = height_;
        this.width = width_;
        this.speed = speed_;
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

    drawFrame(ctx) {
        if (this instanceof Character || this instanceof Chicken) {
            ctx.beginPath();
            ctx.lineWidth = "5";
            ctx.strokeStyle = "blue";
            ctx.rect(this.x, this.y, this.width, this.height);
            ctx.stroke();
        }
    }

    // gibt zurück, ob zwei objekte miteinander kollidieren
    isColliding(mo) {
        return this.x + this.width > mo.x && this.y + this.height > mo.y && this.x < mo.x + mo.width && this.y < mo.y + mo.height;
    }

    // vorlage für animation des jeweiligen objects. arr mit images muss übergeben werden
    playAnimation(images) {
        const i = this.currentImg % images.length;
        const path = images[i];
        this.img = this.imgCache[path];
        this.currentImg++;
    }

    moveRight() {
        this.x += this.speed;
    }

    // verringert x koordinate des objekts um die geschwindigkeit (speed) des objekts
    moveLeft() {
        this.x -= this.speed;
    }

    // verringert y koordinate so lange, bis objekt am boden angekommen ist
    applyGravity = () => {
        if (this.isAboveGround() || this.speedY > 0) {
            this.y -= this.speedY;
            this.speedY -= this.acceleration;
        }
    };

    // gibt zurück ob objekt eine geringere y koordinate hat, als wenn es auf dem boden stehen würde
    isAboveGround() {
        return this.y < 155;
    }

    jump() {
        this.speedY = 30;
    }
    //#endregion
}
