import { IntervalHub } from "../manager/intervalHub.class.js";
import { DrawableObject } from "./drawable-objects.class.js";
import { Level } from "./level.class.js";
import { MovableObject } from "./movable-object.class.js";

export class CollectableObject extends MovableObject{

    //#region properties
    offset = {
        top: 10,
        right: 20,
        bottom: 10,
        left: 20,
    };
    static gap = 0;
    static xPos = 300;
    static bottles = 0; // wird mehr beim einsammeln und weniger beim werfen
    collected = false;
    //#endregion

    constructor(height_, width_, img_){
        super(CollectableObject.xPos + Math.random() * CollectableObject.gap, 100 + Math.random() * 200, height_, width_, 0);
        this.img = img_;
        this.loadImage(this.img);
        CollectableObject.xPos += CollectableObject.gap;
        IntervalHub.startInterval(this.getFrameValues, 1000 / 60);
        // IntervalHub.startInterval(this.removeCollected, 50)
    }

    //#region methods
    // removeCollected = () => {
    //     if (this.collected) {
    //         this.removeObj(Level.collectableObj);
    //     }
    // }
    removeBottle(){
        this.removeObj(Level.collectableObj);
    }
    //#endregion
}