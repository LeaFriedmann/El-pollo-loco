import { ImgHub } from "../manager/imgHub.class.js";
import { IntervalHub } from "../manager/intervalHub.class.js";
import { MovableObject } from "./movable-object.class.js";

export class Chicken extends MovableObject {

    //#region properties
    offset = {
        top: 2,
        right: 2,
        bottom: 2,
        left: 2,
    };
    healthReduction = 100;
    //#endregion

    constructor(x_, speed_){
        super(x_, 360, 60, 60, speed_);
        this.loadImage(ImgHub.ENEMIES.CHICKEN_NORMAL.WALK[0]);
        this.loadImages(ImgHub.ENEMIES.CHICKEN_NORMAL.WALK);
        this.loadImages(ImgHub.ENEMIES.CHICKEN_NORMAL.DEAD);

        IntervalHub.startInterval(this.animate, 50);
        IntervalHub.startInterval(this.getFrameValues, 1000 / 60);
    }

    // für interval, laufanimation + laufen nach links
    animate = () => {
        if (this.isDead()) {
            this.playAnimation(ImgHub.ENEMIES.CHICKEN_NORMAL.DEAD)
        } else {
            this.moveLeft();
            this.playAnimation(ImgHub.ENEMIES.CHICKEN_NORMAL.WALK)
        }
    };
}