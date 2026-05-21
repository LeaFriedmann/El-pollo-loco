import { MovableObject } from "./movable-object.class.js";

/**
 * Represents a background object used for creating a tiled scrolling background.
 * Extends MovableObject to support positioning and rendering in the game world.
 */
export class BackgroundObject extends MovableObject {
    //#region properties
    static xPos = -719;
    static turn = 0;
    //#endregion

    /**
     * Creates a new BackgroundObject instance and positions it in the background sequence.
     * @param {string} imagePath - The path to the image used for this background segment.
     */
    constructor(imagePath) {
        if (BackgroundObject.turn == 4) {
            BackgroundObject.xPos += 719;
            BackgroundObject.turn = 0;
        }

        super(BackgroundObject.xPos, 0, 480, 720, 0);
        this.loadImage(imagePath);
        BackgroundObject.turn++;
    }
}
