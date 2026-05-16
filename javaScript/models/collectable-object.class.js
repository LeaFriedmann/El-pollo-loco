import { ImgHub } from "../manager/imgHub.class.js";
import { IntervalHub } from "../manager/intervalHub.class.js";
import { DrawableObject } from "./drawable-objects.class.js";
import { MovableObject } from "./movable-object.class.js";

export class CollectableObject extends MovableObject {
    //#region properties
    animation;
    static gap = 0;
    static xPos = 300;
    static arrAll = [];
    static collected = 0;    
    //#endregion

    constructor(x_, y_, height_, width_, animation_) {
        super(x_, y_, height_, width_, 0);

        this.animation = animation_;
        this.loadImage(this.animation[0]);
        this.loadImages(this.animation);
        IntervalHub.startInterval(this.getFrameValues, 1000 / 60);
    }

    removeCollectable() {
        this.removeObj(CollectableObject.arrAll);
    }
}