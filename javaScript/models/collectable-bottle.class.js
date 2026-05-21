import { ImgHub } from "../manager/imgHub.class.js";
import { CollectableObject } from "./collectable-object.class.js";

/**
 * Represents a collectible bottle object in the game.
 * Extends CollectableObject and defines specific behavior and positioning for bottle collectibles.
 */
export class CollectableBottle extends CollectableObject {
    //#region properties
    offset = {
        top: 10,
        right: 20,
        bottom: 10,
        left: 30,
    };
    static availableBottles = 0;
    //#endregion

    /**
     * Creates a new CollectableBottle instance positioned randomly within a defined gap.
     * Increases the global bottle counter and updates the x-position for next instance.
     */
    constructor() {
        super(CollectableBottle.xPos + Math.random() * CollectableBottle.gap, 350, 70, 70, ImgHub.BOTTLE.ON_GROUND);
        CollectableBottle.xPos += CollectableBottle.gap;
        CollectableBottle.availableBottles++;
    }
}
