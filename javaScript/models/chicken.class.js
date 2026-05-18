import { AudioHub } from "../manager/audio-hub.clas.js";
import { ImgHub } from "../manager/imgHub.class.js";
import { IntervalHub } from "../manager/intervalHub.class.js";
import { Entity } from "./entity.class.js";
import { Level } from "./level.class.js";

export class Chicken extends Entity {
    //#region properties
    offset = {
        top: 0,
        right: 1,
        bottom: 1,
        left: 1,
    };
    audioPlayed = false;
    //#endregion

    constructor(x_, y_, width_, height_, speed_, animationWalk_, animationDead_) {
        super(x_, y_, height_, width_, speed_, 100, 100, animationWalk_, animationDead_);

        IntervalHub.startInterval(this.animate, 1000/ 60);
        IntervalHub.startInterval(this.move, 1000 / 25)
    }

    // für interval, laufanimation + laufen nach links
    animate = () => {
        if (this.isDead()) {
            this.playAnimation("dead", this.animationDead, 15);
            if (this.isDead && !this.audioPlayed) {
                AudioHub.playOne(AudioHub.CHICKEN.DEAD);
                this.audioPlayed = true;
            }
            setTimeout(() => {
                this.removeObj(Level.enemies);
            }, 2000);
        } else {
            this.playAnimation("walk", this.animationWalk, 15);
        }
    };

    move = () => {
        if (!this.isDead()) {
            this.moveLeft();            
        }
    }
}
