import { ImgHub } from "../manager/imgHub.class.js";
import { IntervalHub } from "../manager/intervalHub.class.js";
import { Keyboard } from "../manager/keyboard.class.js";
import { DrawableObject } from "./drawable-objects.class.js";

export class MovableObject extends DrawableObject {
    //#region properties
    speed;
    otherDirection = false;
    speedY = 0;
    acceleration = 2.5;
    energy = 100;
    healthReduction;
    rX;
    rY;
    rW;
    rH;
    lastHit = 0;
    alive = true;
    //#endregion

    constructor(x_, y_, height_, width_, speed_) {
        super(x_, y_, height_, width_);
        this.x = x_;
        this.y = y_;
        this.height = height_;
        this.width = width_;
        this.speed = speed_;
        // if (this instanceof Character || this instanceof Endboss || this instanceof Chicken || this instanceof ThrowableObject) {
        //     IntervalHub.startInterval(this.getFrameValues, 1000 / 60);
        // }
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

    hit() {
        this.energy -= this.healthReduction;
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }

    // gibt true zurück, wenn letzter hit weniger als 0.5 sec her war
    // 0.5 ist dann die dauer der hurt animation
    isHurt() {
        let timePassed = new Date().getTime() - this.lastHit;
        timePassed = timePassed / 1000;
        // console.log(timePassed);
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

    moveRight() {
        this.x += this.speed;
    }

    // verringert x koordinate des objekts um die geschwindigkeit (speed) des objekts
    moveLeft() {
        this.x -= this.speed;
    }

    // verringert y koordinate so lange, bis objekt am boden angekommen ist
    // this.alive abfrage für throwable object
    applyGravity = () => {
        if ((this.isAboveGround() || (this.speedY) > 0 && !this.isDead())) {
            this.y -= this.speedY;
            this.speedY -= this.acceleration;
            if (!this.isAboveGround()) {
                // speedY auf 0 setzen, damit character chicken hit() wenn er von oben runter kommt
                this.speedY = 0;
            }
        }
    };

    isAboveGround() {
        return this.y < 420 - this.height;
    }

    //#endregion
}
