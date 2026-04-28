import { ImgHub } from "../manager/imgHub.class.js";
import { IntervalHub } from "../manager/intervalHub.class.js";
import { Keyboard } from "../manager/keyboard.class.js";
import { MovableObject } from "./movable-object.class.js";

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
        this.throw();
    }

    //#region methods
    throw() {
        if (Keyboard.D) {
            IntervalHub.startInterval(this.applyGravity, 1000 / 25);
            IntervalHub.startInterval(this.movement, 25);
            IntervalHub.startInterval(this.animate, 100);
        }
    }

    animate = () => {
        if (this.isAboveGround()) {
            this.playAnimation(ImgHub.BOTTLE.ROTATION);          
        } else if (!this.isAboveGround()) {
            this.playSplashAnimation(ImgHub.BOTTLE.SPLASH);
        }
    }

    movement = () => {
        if (this.isAboveGround()) { 
            this.moveRight();
        }
    };

    playSplashAnimation(images) {
        if (this.currentSplashImg < images.length) {
            this.nextSplashImg(images);
        } else {
            this.visible = false;
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
