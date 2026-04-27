import { ImgHub } from "../manager/imgHub.class.js";
import { IntervalHub } from "../manager/intervalHub.class.js";
import { MovableObject } from "./movable-object.class.js";

export class ThrowableObject extends MovableObject {

    offset = {
        top: 10,
        right: 20,
        bottom: 10,
        left: 20,
    }
    speedY = 30;

    constructor(x_, y_){
        super(x_, y_, 70, 50, 10);
        this.loadImage(ImgHub.BOTTLE.NORMAL);
        // this.throw();
        IntervalHub.startInterval(this.applyGravity, 1000 / 25);
        IntervalHub.startInterval(this.animate, 25)
        IntervalHub.startInterval(this.getFrameValues, 1000 / 60);
    }

    //#region methods

    animate = () => {
        this.moveRight();
    }

    //#endregion
}