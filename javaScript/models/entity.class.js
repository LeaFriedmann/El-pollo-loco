import { IntervalHub } from "../manager/intervalHub.class.js";
import { MovableObject } from "./movable-object.class.js";

export class Entity extends MovableObject{

    //#region properties
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

    constructor(x_, y_, height_, width_, speed_, energy_, healthReduction_){
        super(x_, y_, height_, width_, speed_);
        this.x = x_;
        this.y = y_;
        this.height = height_;
        this.width = width_;
        this.speed = speed_;
        this.energy = energy_;
        this.healthReduction = healthReduction_;

        IntervalHub.startInterval(this.getFrameValues, 1000 / 60);
    }


    //#region methods

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

    // verringert y koordinate so lange, bis objekt am boden angekommen ist
    // this.alive abfrage für throwable object
    applyGravity = () => {
        if ((this.isAboveGround() || (this.speedY)) > 0 && !this.isDead()) {
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