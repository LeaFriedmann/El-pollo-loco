import { ImgHub } from "../manager/imgHub.class.js";
import { Chicken } from "./chicken.class.js";

export class NormalChicken extends Chicken{

    constructor(x_, speed_){
        super(x_, 360, 60, 60, speed_, ImgHub.ENEMIES.CHICKEN_NORMAL.WALK, ImgHub.ENEMIES.CHICKEN_NORMAL.DEAD)
    }
}