import { AudioHub } from "../manager/audio-hub.clas.js";
import { ImgHub } from "../manager/imgHub.class.js";
import { IntervalHub } from "../manager/intervalHub.class.js";
import { Entity } from "./entity.class.js";
import { Level } from "./level.class.js";

/**
 * Represents a chicken enemy entity in the game.
 * Handles movement, animation, and death behavior including sound playback and removal.
 * Extends Entity.
 */
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

    /**
     * Creates a new Chicken enemy instance and starts its animation and movement loops.
     * @param {number} x_ - X position.
     * @param {number} y_ - Y position.
     * @param {number} width_ - Width of the chicken.
     * @param {number} height_ - Height of the chicken.
     * @param {number} speed_ - Movement speed.
     * @param {string[]} animationWalk_ - Walking animation frames.
     * @param {string[]} animationDead_ - Death animation frames.
     */
    constructor(x_, y_, width_, height_, speed_, animationWalk_, animationDead_) {
        super(x_, y_, height_, width_, speed_, 100, 100, animationWalk_, animationDead_);

        IntervalHub.startInterval(this.animate, 1000 / 60);
        IntervalHub.startInterval(this.move, 1000 / 25);
    }

    /**
     * Handles animation states (walking or dead) and triggers sound/effects on death.
     */
    animate = () => {
        if (this.isDead()) {
            this.playAnimation("dead", this.animationDead, 4);
            if (this.isDead && !this.audioPlayed) {
                AudioHub.playOne(AudioHub.CHICKEN.DEAD);
                this.audioPlayed = true;
            }
            setTimeout(() => {
                this.removeObj(Level.enemies);
            }, 450);
        } else {
            this.playAnimation("walk", this.animationWalk, 7);
        }
    };

    /**
     * Moves the chicken to the left if it is still alive.
     */
    move = () => {
        if (!this.isDead()) {
            this.moveLeft();
        }
    };
}
