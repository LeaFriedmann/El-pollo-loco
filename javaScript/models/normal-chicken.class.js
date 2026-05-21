import { ImgHub } from "../manager/imgHub.class.js";
import { Chicken } from "./chicken.class.js";

/**
 * Represents a normal-sized chicken enemy.
 */
export class NormalChicken extends Chicken {
    /**
     * Creates a NormalChicken instance.
     * @param {number} x_ - Initial x position of the chicken.
     * @param {number} speed_ - Movement speed of the chicken.
     */
    constructor(x_, speed_) {
        super(x_, 360, 60, 60, speed_, ImgHub.ENEMIES.CHICKEN_NORMAL.WALK, ImgHub.ENEMIES.CHICKEN_NORMAL.DEAD);
    }
}
