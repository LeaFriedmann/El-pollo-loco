import { ImgHub } from "../manager/imgHub.class.js";
import { IntervalHub } from "../manager/intervalHub.class.js";
import { CollectableObject } from "./collectable-object.class.js";

/**
 * Represents a collectible coin object in the game.
 * Handles animation and positioning of coin collectibles.
 * Extends CollectableObject.
 */
export class Coin extends CollectableObject {
    offset = {
        top: 30,
        right: 30,
        bottom: 30,
        left: 30,
    };

    /**
     * Creates a new Coin instance at a randomized position and starts its animation loop.
     */
    constructor() {
        super(Coin.xPos + Math.random() * Coin.gap, 100 + Math.random() * 200, 80, 80, ImgHub.COIN);
        Coin.xPos += Coin.gap;
        IntervalHub.startInterval(this.animate, 1000 / 60);
    }

    /**
     * Runs the coin animation
     */
    animate = () => {
        this.playAnimation("coin", this.animation, 7);
    };
}
