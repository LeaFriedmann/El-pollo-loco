import { ImgHub } from "../manager/imgHub.class.js";
import { IntervalHub } from "../manager/intervalHub.class.js";
import { Entity } from "./entity.class.js";
import { Level } from "./level.class.js";

export class Endboss extends Entity {

    animationHurt = ImgHub.ENEMIES.ENDBOSS.HURT;
    animationAlert = ImgHub.ENEMIES.ENDBOSS.ALERT;
    offset = {
        top: 80,
        right: 20,
        bottom: 50,
        left: 30,
    }

    constructor(x_, speed_){
        super(x_, 50, 400, 250, speed_, 100, 10, ImgHub.ENEMIES.ENDBOSS.WALK, ImgHub.ENEMIES.ENDBOSS.DEAD);

        this.loadImages(this.animationAlert);
        this.loadImages(this.animationHurt);

        IntervalHub.startInterval(this.animate, 100);
    }

    // animation endboss für interval
    animate = () => {
        
        if (this.isHurt()) {
            this.playAnimation(this.animationHurt);
        } else if (this.isDead()) {
            this.playAnimation(this.animationDead);
            setTimeout(() => {
                this.visible = false;
            }, 1000);
        } else {
            this.playAnimation(this.animationAlert);
        }
    };
}