import { AudioHub } from "../manager/audio-hub.clas.js";
import { ImgHub } from "../manager/imgHub.class.js";
import { IntervalHub } from "../manager/intervalHub.class.js";
import { Keyboard } from "../manager/keyboard.class.js";
import { Entity } from "./entity.class.js";
import { Level } from "./level.class.js";
import { World } from "./world.class.js";

export class ThrowableObject extends Entity {
    offset = {
        top: 10,
        right: 30,
        bottom: 10,
        left: 30,
    };
    speedY = 27;
    currentSplashImg = 0;
    throwDirection;
    audioPlayed;

    constructor(x_, y_, direction_) {
        super(x_, y_, 70, 70, 10, 100, 100, ImgHub.BOTTLE.ROTATION, ImgHub.BOTTLE.SPLASH);
        this.throwDirection = direction_;
        
        IntervalHub.startInterval(this.applyGravity, 1000 / 25);
        IntervalHub.startInterval(this.movement, 25);
        IntervalHub.startInterval(this.animate, 50);
    }

    //#region methods

    // bewegt sich je nach instanzierung nach rechts oder links wenn es über dem boden und noch nicht kollidiert ist
    movement = () => {
        if (this.inAir()) {
            if (this.throwDirection == "right") {
                this.moveRight();
            } else if (this.throwDirection == "left") {
                this.moveLeft();
            }
        }
    };

    // spielt rotation animation, bis es mit mo oder boden kollidiert
    // dann splash animation
    animate = () => {
        if (this.inAir()) {
            this.playAnimation(this.animationWalk);
        } else if (this.splashed()) {
            this.playSplashAnimation();
        }
    };

    inAir(){
        return (this.isAboveGround() && !this.isDead());
    }

    splashed(){
        return !this.isAboveGround() || this.isDead();
    }

    // spielt splash animation ein mal und entfernt object aus array mit throwableObjects
    playSplashAnimation() {
        if (this.animationFirstRound()) {
            this.nextSplashImg(this.animationDead);
            if (!this.audioPlayed) {
                AudioHub.playOne(AudioHub.BOTTLE_BREAK);
                this.audioPlayed = true;
            }
        } else {
            this.removeObj(Level.ThrowableObjects);
        }
    }

    animationFirstRound() {
        return this.currentSplashImg < ImgHub.BOTTLE.SPLASH.length;
    }

    nextSplashImg(images) {
        const i = this.currentSplashImg;
        const path = images[i];
        this.img = this.imgCache[path];
        this.currentSplashImg++;
    }

    //#endregion
}
