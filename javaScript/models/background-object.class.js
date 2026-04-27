import { MovableObject } from "./movable-object.class.js";

export class BackgroundObject extends MovableObject {

    //#region properties
    static xPos = -719;
    static turn = 0;
    //#endregion

    constructor(imagePath){
        if (BackgroundObject.turn == 4) {
            BackgroundObject.xPos += 719;
            BackgroundObject.turn = 0;
        }
        super(BackgroundObject.xPos, 0, 480, 720, 0);
        this.loadImage(imagePath);
        BackgroundObject.turn++;
    }
}