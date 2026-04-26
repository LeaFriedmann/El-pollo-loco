class MovableObject {
    //#region properties
    x;
    y;
    img;
    height;
    width;
    imgCache = {};
    currentImg = 0;
    currentJumpImg = 0;
    speed;
    otherDirection = false;
    speedY = 0;
    acceleration = 2.5;
    energy = 100;
    rX;
    rY;
    rW;
    rH;
    lastHit = 0;

    //#endregion

    constructor(x_, y_, height_, width_, speed_) {
        this.x = x_;
        this.y = y_;
        this.height = height_;
        this.width = width_;
        this.speed = speed_;
        if (this instanceof Character || this instanceof Endboss || this instanceof Chicken) {
            IntervalHub.startInterval(this.getFrameValues, 1000 / 60);
        }
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
        if (this instanceof Character || this instanceof Chicken || this instanceof Endboss) {
            ctx.beginPath();
            ctx.lineWidth = "5";
            ctx.strokeStyle = "blue";
            ctx.rect(this.x, this.y, this.width, this.height);
            ctx.stroke();
        }
    }

    drawRealFrame(ctx) {
        if (this instanceof Character || this instanceof Endboss) {
            ctx.beginPath();
            ctx.lineWidth = "5";
            ctx.strokeStyle = "blue";
            ctx.rect(this.rX, this.rY, this.rW, this.rH);
            ctx.stroke();
        }
    }

    // berechnet frame mit offset werten des jeweiligen objekts
    getFrameValues = () => {
        this.rX = this.x + this.offset.left;
        this.rY = this.y + this.offset.top;
        this.rW = this.width - this.offset.left - this.offset.right;
        this.rH = this.height - this.offset.top - this.offset.bottom;
    };

    // gibt zurück, ob zwei objekte miteinander kollidieren
    isColliding(mo) {
        return this.rX + this.rW > mo.rX && this.rY + this.rH > mo.rY && this.rX < mo.rX + mo.rW && this.rY < mo.rY + mo.rH;
    }

    hit() {
        this.energy -= 5;
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }

    // gibt true zurück, wenn letzter hit weniger als 5 sec her war
    isHurt() {
        let timePassed = new Date().getTime() - this.lastHit;
        timePassed = timePassed / 1000;
        return timePassed < 0.5;
    }

    isDead() {
        return this.energy == 0;
    }

    // vorlage für animation des jeweiligen objects. arr mit images muss übergeben werden
    playAnimation(images) {
        const i = this.currentImg % images.length;
        const path = images[i];
        this.img = this.imgCache[path];
        this.currentImg++;
    }

    // speilt jump animation ein mal pro sprung
    playJumpAnimation(images) {
        if (this.currentJumpImg < images.length) {
            this.nextJumpImg(images);
        }
        if (!this.isAboveGround()) {
            this.resetJumpAnimation();
        }
    }

    nextJumpImg(images) {
        const i = this.currentJumpImg;
        const path = images[i];
        this.img = this.imgCache[path];
        this.currentJumpImg++;
    }

    resetJumpAnimation() {
        this.currentJumpImg = 0;
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
        return this.y < 140;
    }

    jump() {
        this.speedY = 25;
    }
    //#endregion
}
