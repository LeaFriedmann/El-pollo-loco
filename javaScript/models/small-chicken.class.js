import { ImgHub } from "../manager/imgHub.class.js";
import { Chicken } from "./chicken.class.js";

export class SmallChicken extends Chicken{

    constructor(x_, speed_) {
        super(x_, 384, 30, 30, speed_, ImgHub.ENEMIES.CHICKEN_SMALL.WALK, ImgHub.ENEMIES.CHICKEN_SMALL.DEAD);
    }
}
