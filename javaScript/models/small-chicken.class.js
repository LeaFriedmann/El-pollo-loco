import { ImgHub } from "../manager/imgHub.class.js";
import { Chicken } from "./chicken.class.js";

/**
 * Represents a small chicken enemy.
 */
export class SmallChicken extends Chicken {
    /**
     * Creates a SmallChicken instance.
     * @param {number} x_ - Initial x position of the chicken.
     * @param {number} speed_ - Movement speed of the chicken.
     */
    constructor(x_, speed_) {
        super(x_, 384, 30, 30, speed_, ImgHub.ENEMIES.CHICKEN_SMALL.WALK, ImgHub.ENEMIES.CHICKEN_SMALL.DEAD);
    }
}
