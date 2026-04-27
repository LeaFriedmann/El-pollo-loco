import { ImgHub } from "../manager/imgHub.class.js";
import { IntervalHub } from "../manager/intervalHub.class.js";
import { MovableObject } from "./movable-object.class.js";

export class Chicken extends MovableObject {

    //#region properties
    offset = {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
    };
    //#endregion

    constructor(x_, speed_){
        super(x_, 360, 60, 60, speed_);
        this.loadImage(ImgHub.ENEMIES.CHICKEN_NORMAL.WALK[0]);
        this.loadImages(ImgHub.ENEMIES.CHICKEN_NORMAL.WALK);

        IntervalHub.startInterval(this.animate, 50);
        IntervalHub.startInterval(this.getFrameValues, 1000 / 60);
    }

    // für interval, laufanimation + laufen nach links
    animate = () => {
        this.moveLeft();
        this.playAnimation(ImgHub.ENEMIES.CHICKEN_NORMAL.WALK)
    };
}