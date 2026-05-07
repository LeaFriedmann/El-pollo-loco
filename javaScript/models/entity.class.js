import { IntervalHub } from "../manager/intervalHub.class.js";
import { MovableObject } from "./movable-object.class.js";

export class Entity extends MovableObject {
    //#region properties
    speedY = 0;
    acceleration = 2.5;
    energy;
    healthReduction;
    lastHit = 0;
    animationWalk;
    animationDead;
    //#endregion

    constructor(x_, y_, height_, width_, speed_, energy_, healthReduction_, animationWalk_, animationDead_) {
        super(x_, y_, height_, width_, speed_);
        this.x = x_;
        this.y = y_;
        this.height = height_;
        this.width = width_;
        this.speed = speed_;
        this.energy = energy_;
        this.healthReduction = healthReduction_;
        this.animationWalk = animationWalk_;
        this.animationDead = animationDead_;

        this.loadImage(this.animationWalk[0]);
        this.loadImages(this.animationWalk);
        this.loadImages(this.animationDead);
        IntervalHub.startInterval(this.getFrameValues, 1000 / 60);
    }

    //#region methods

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
        return timePassed < 0.5;
    }

    isDead() {
        return this.energy == 0;
    }

    deadAnimationStop(){
        let timePassed = new Date().getTime() - this.lastHit;
        timePassed = timePassed / 1000;
        return timePassed > 3;
    }

    // verringert y koordinate so lange, bis objekt am boden angekommen ist
    // this.isDead() abfrage für throwable object
    applyGravity = () => {
        if ((this.isAboveGround() || this.speedY) > 0 && !this.isDead()) {
            this.y -= this.speedY;
            this.speedY -= this.acceleration;
            if (!this.isAboveGround()) {
                this.speedY = 0; // speedY auf 0 setzen, damit character chicken hit() wenn er von oben runter kommt
            }
        }
    };

    isAboveGround() {
        return this.y < 430 - this.height;
    }

    //#endregion
}
