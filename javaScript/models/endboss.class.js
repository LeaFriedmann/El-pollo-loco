import { ImgHub } from "../manager/imgHub.class.js";
import { IntervalHub } from "../manager/intervalHub.class.js";
import { BackgroundObject } from "./background-object.class.js";
import { Entity } from "./entity.class.js";
import { GameState } from "./game-state.class.js";
import { Level } from "./level.class.js";

export class Endboss extends Entity {
    animationHurt = ImgHub.ENEMIES.ENDBOSS.HURT;
    animationAlert = ImgHub.ENEMIES.ENDBOSS.ALERT;
    animationAtack = ImgHub.ENEMIES.ENDBOSS.ATTACK;
    offset = {
        top: 80,
        right: 20,
        bottom: 50,
        left: 30,
    };
    static isAlert = false;
    static startWalking = false;
    static attack = false;

    constructor(x_, speed_) {
        super(x_, 50, 400, 250, speed_, 100, 20, ImgHub.ENEMIES.ENDBOSS.WALK, ImgHub.ENEMIES.ENDBOSS.DEAD);

        this.loadImages(this.animationAlert);
        this.loadImages(this.animationHurt);
        this.loadImages(this.animationWalk);
        this.loadImages(this.animationAtack);

        IntervalHub.startInterval(this.animate, 100);
    }

    // animation endboss für interval
    animate = () => {
        if (this.isHurt()) {
            this.playAnimation(this.animationHurt);
        } else if (Endboss.attack) {
            this.playAnimation(this.animationAtack)
        } else if (this.isDead()) {
            this.playAnimation(this.animationDead);
            setTimeout(() => {
                GameState.gameReset("won");
                GameState.WON = true;
            }, 1500);
        } else if (Endboss.isAlert) {
            this.playAnimation(this.animationAlert);
        } else if (Endboss.startWalking) {
            this.playAnimation(this.animationWalk);
            this.moveLeft();
        }
    };
}
