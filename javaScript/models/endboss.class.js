import { ImgHub } from "../manager/imgHub.class.js";
import { IntervalHub } from "../manager/intervalHub.class.js";
import { Level } from "./level.class.js";
import { MovableObject } from "./movable-object.class.js";

export class Endboss extends MovableObject {

    offset = {
        top: 80,
        right: 20,
        bottom: 20,
        left: 20,
    }
    healthReduction = 10;

    constructor(x_){
        super(x_, 50, 400, 250);

        this.loadImage(ImgHub.ENEMIES.ENDBOSS.ALERT[0]);
        this.loadImages(ImgHub.ENEMIES.ENDBOSS.ALERT);
        this.loadImages(ImgHub.ENEMIES.ENDBOSS.HURT);
        this.loadImages(ImgHub.ENEMIES.ENDBOSS.DEAD);

        IntervalHub.startInterval(this.animate, 100);
        IntervalHub.startInterval(this.getFrameValues, 1000 / 60);
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