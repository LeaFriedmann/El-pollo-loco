import { ImgHub } from "../manager/imgHub.class.js";
import { IntervalHub } from "../manager/intervalHub.class.js";
import { MovableObject } from "./movable-object.class.js";

export class SmallChicken extends MovableObject {
    //#region properties
    offset = {
        top: 0,
        right: 2,
        bottom: 1,
        left: 2,
    };
    healthReduction = 100;
    //#endregion

    constructor(x_, speed_) {
        super(x_, 384, 30, 30, speed_);
        this.loadImage(ImgHub.ENEMIES.CHICKEN_SMALL.WALK[0]);
        this.loadImages(ImgHub.ENEMIES.CHICKEN_SMALL.WALK);
        this.loadImages(ImgHub.ENEMIES.CHICKEN_SMALL.DEAD);

        IntervalHub.startInterval(this.animate, 50);
        IntervalHub.startInterval(this.getFrameValues, 1000 / 60);
    }

    //#region methods

    animate = () => {
        if (this.isDead()) {
            this.playAnimation(ImgHub.ENEMIES.CHICKEN_SMALL.DEAD)
        } else {
            this.moveLeft();
            this.playAnimation(ImgHub.ENEMIES.CHICKEN_SMALL.WALK);
        }
    }
    
    //#endregion
}
