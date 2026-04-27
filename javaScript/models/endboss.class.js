import { ImgHub } from "../manager/imgHub.class.js";
import { IntervalHub } from "../manager/intervalHub.class.js";
import { MovableObject } from "./movable-object.class.js";

export class Endboss extends MovableObject {

    offset = {
        top: 80,
        right: 20,
        bottom: 20,
        left: 20,
    }

    constructor(x_){
        super(x_, 50, 400, 250);

        this.loadImage(ImgHub.ENEMIES.ENDBOSS.ALERT[0]);
        this.loadImages(ImgHub.ENEMIES.ENDBOSS.ALERT);

        IntervalHub.startInterval(this.animate, 100);
        IntervalHub.startInterval(this.getFrameValues, 1000 / 60);
    }

    // animation endboss für interval
    animate = () => {
        this.playAnimation(ImgHub.ENEMIES.ENDBOSS.ALERT)
    };
}