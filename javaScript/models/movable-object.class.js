import { ImgHub } from "../manager/imgHub.class.js";
import { IntervalHub } from "../manager/intervalHub.class.js";
import { Keyboard } from "../manager/keyboard.class.js";
import { DrawableObject } from "./drawable-objects.class.js";

export class MovableObject extends DrawableObject {
    //#region properties
    otherDirection = false;
    rX;
    rY;
    rW;
    rH;
    speed;
    currentAnimation = null;
    currentImage = 0;
    lastFrameChange = 0;
    //#endregion

    constructor(x_, y_, height_, width_, speed_) {
        super(x_, y_, height_, width_);
        this.x = x_;
        this.y = y_;
        this.height = height_;
        this.width = width_;
        this.speed = speed_;
    }
    //#region methods

    drawFrame(ctx) {
        ctx.beginPath();
        ctx.lineWidth = "5";
        ctx.strokeStyle = "blue";
        ctx.rect(this.x, this.y, this.width, this.height);
        ctx.stroke();
    }

    drawRealFrame(ctx) {
        ctx.beginPath();
        ctx.lineWidth = "5";
        ctx.strokeStyle = "blue";
        ctx.rect(this.rX, this.rY, this.rW, this.rH);
        ctx.stroke();
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

    removeObj(arr) {
        const index = arr.indexOf(this);
        if (index > -1) {
            arr.splice(index, 1);
        }
    }

    playAnimation(name, images, fps){

        // checkt animations wechsel
        if (this.currentAnimation !==name) {
            this.currentAnimation = name;
            this.currentImage = 0;
            this.lastFrameChange = 0;
        }

        const now = Date.now();
        const interval = 1000 / fps;

        // ändert img in individuellem interval
        if (now - this.lastFrameChange > interval) {
            this.img = this.imgCache[images[this.currentImage]];
            this.currentImage++;

            // falls animation durchgelaufen index auf 0
            if (this.currentImage == images.length) {
                this.currentImage = 0;
            }

            // last frame change aktualisieren
            this.lastFrameChange = now;
        }
    }

    moveRight() {
        this.x += this.speed;
    }

    // verringert x koordinate des objekts um die geschwindigkeit (speed) des objekts
    moveLeft() {
        this.x -= this.speed;
    }

    //#endregion
}
