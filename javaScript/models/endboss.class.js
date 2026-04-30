import { ImgHub } from "../manager/imgHub.class.js";
import { IntervalHub } from "../manager/intervalHub.class.js";
import { Entity } from "./entity.class.js";
import { Level } from "./level.class.js";

export class Endboss extends Entity {

    offset = {
        top: 80,
        right: 20,
        bottom: 50,
        left: 30,
    }

    constructor(x_, speed_){
        super(x_, 50, 400, 250, speed_, 100, 10);

        this.loadImage(ImgHub.ENEMIES.ENDBOSS.ALERT[0]);
        this.loadImages(ImgHub.ENEMIES.ENDBOSS.ALERT);
        this.loadImages(ImgHub.ENEMIES.ENDBOSS.HURT);
        this.loadImages(ImgHub.ENEMIES.ENDBOSS.DEAD);

        IntervalHub.startInterval(this.animate, 100);
    }

    // animation endboss für interval
    animate = () => {
        // console.log(this.isDead());
        
        if (this.isHurt()) {
            this.playAnimation(ImgHub.ENEMIES.ENDBOSS.HURT);
        } else if (this.isDead()) {
            this.playAnimation(ImgHub.ENEMIES.ENDBOSS.DEAD);
            setTimeout(() => {
                this.visible = false;
            }, 1000);

        } else {
            this.playAnimation(ImgHub.ENEMIES.ENDBOSS.ALERT);
        }
    };
}