import { ImgHub } from "../manager/imgHub.class.js";
import { IntervalHub } from "../manager/intervalHub.class.js";
import { CollectableObject } from "./collectable-object.class.js";

export class Coin extends CollectableObject{

    offset = {
        top: 30,
        right: 30,
        bottom: 30,
        left: 30,
    };

    constructor(){
        super(Coin.xPos + Math.random() * Coin.gap, 100 + Math.random() * 200, 80, 80, ImgHub.COIN);
        Coin.xPos += Coin.gap;
        IntervalHub.startInterval(this.animate, 1000 / 7)
    }

    animate = () => {
        this.playAnimation(this.animation)
    }
}