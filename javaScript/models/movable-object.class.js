import { ImgHub } from "../manager/imgHub.class.js";
import { IntervalHub } from "../manager/intervalHub.class.js";
import { Keyboard } from "../manager/keyboard.class.js";
import { DrawableObject } from "./drawable-objects.class.js";

export class MovableObject extends DrawableObject {
    //#region properties
    speed;
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

    //#endregion
}
