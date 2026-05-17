import { ImgHub } from "../manager/imgHub.class.js";
import { CollectableObject } from "./collectable-object.class.js";

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

    constructor(){
        super(CollectableBottle.xPos + Math.random() * CollectableBottle.gap, 350, 70, 70, ImgHub.BOTTLE.ON_GROUND)
        CollectableBottle.xPos += CollectableBottle.gap;
        CollectableBottle.availableBottles ++;
    }
}