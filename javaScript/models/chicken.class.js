import { ImgHub } from "../manager/imgHub.class.js";
import { IntervalHub } from "../manager/intervalHub.class.js";
import { Entity } from "./entity.class.js";
import { Level } from "./level.class.js";

export class Chicken extends Entity {
    //#region properties
    offset = {
        top: 2,
        right: 2,
        bottom: 2,
        left: 2,
    };
    //#endregion

    constructor(x_, speed_) {
        super(x_, 360, 60, 60, speed_, 100, 100);
        this.loadImage(ImgHub.ENEMIES.CHICKEN_NORMAL.WALK[0]);
        this.loadImages(ImgHub.ENEMIES.CHICKEN_NORMAL.WALK);
        this.loadImages(ImgHub.ENEMIES.CHICKEN_NORMAL.DEAD);

        IntervalHub.startInterval(this.animate, 50);
    }

    // für interval, laufanimation + laufen nach links
    animate = () => {
        if (this.isDead()) {
            this.playAnimation(ImgHub.ENEMIES.CHICKEN_NORMAL.DEAD);
            setTimeout(() => {
                const index = Level.enemies.indexOf(this);
                if (index > -1) {
                    Level.enemies.splice(index, 1);
                }
            }, 2000);
        } else {
            this.moveLeft();
            this.playAnimation(ImgHub.ENEMIES.CHICKEN_NORMAL.WALK);
        }
    };
}
