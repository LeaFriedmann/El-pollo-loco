import { ImgHub } from "../manager/imgHub.class.js";
import { IntervalHub } from "../manager/intervalHub.class.js";
import { Keyboard } from "../manager/keyboard.class.js";
import { MovableObject } from "./movable-object.class.js";
import { World } from "./world.class.js";

export class ThrowableObject extends MovableObject {
    offset = {
        top: 10,
        right: 20,
        bottom: 10,
        left: 20,
    };
    speedY = 30;
    currentSplashImg = 0;

    constructor(x_, y_) {
        super(x_, y_, 70, 50, 10);
        this.loadImage(ImgHub.BOTTLE.NORMAL);
        this.loadImages(ImgHub.BOTTLE.ROTATION);
        this.loadImages(ImgHub.BOTTLE.SPLASH);
        IntervalHub.startInterval(this.getFrameValues, 1000 / 60);
        IntervalHub.startInterval(this.applyGravity, 1000 / 25);
        IntervalHub.startInterval(this.movement, 25);
        IntervalHub.startInterval(this.animate, 50);
        // this.throw();
    }

    //#region methods

    animate = () => {
        if (this.isAboveGround() && this.alive) {
            this.playAnimation(ImgHub.BOTTLE.ROTATION);
        } else if (!this.isAboveGround() || !this.alive) {
            this.playSplashAnimation(ImgHub.BOTTLE.SPLASH);
        }
    };

    movement = () => {
        if (this.isAboveGround() && this.alive) {
            this.moveRight();
        }
    };

    playSplashAnimation() {
        if (this.currentSplashImg < ImgHub.BOTTLE.SPLASH.length) {
            this.nextSplashImg(ImgHub.BOTTLE.SPLASH);
        } else {
            const index = World.ThrowableObjects.indexOf(this);
            if (index > -1) {
                World.ThrowableObjects.splice(index, 1);
            }
        }
    }

    nextSplashImg(images) {
        const i = this.currentSplashImg;
        const path = images[i];
        this.img = this.imgCache[path];
        this.currentSplashImg++;
    }

    //#endregion
}
