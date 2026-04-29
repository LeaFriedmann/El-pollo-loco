import { ImgHub } from "../manager/imgHub.class.js";
import { IntervalHub } from "../manager/intervalHub.class.js";
import { MovableObject } from "./movable-object.class.js";

export class SmallChicken extends MovableObject {
    //#region properties
    offset = {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
    };
    healthReduction = 100;
    //#endregion

    constructor(x_, speed_) {
        super(x_, 390, 30, 30, speed_);
        this.loadImage(ImgHub.ENEMIES.CHICKEN_SMALL.WALK[0]);
        this.loadImages(ImgHub.ENEMIES.CHICKEN_SMALL.WALK);

        IntervalHub.startInterval(this.animate, 50);
        IntervalHub.startInterval(this.getFrameValues, 1000 / 60);
    }

    //#region methods

    animate = () => {
        this.moveLeft();
        this.playAnimation(ImgHub.ENEMIES.CHICKEN_SMALL.WALK);
    }
    
    //#endregion
}
