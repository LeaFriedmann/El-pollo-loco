import { ImgHub } from "../manager/imgHub.class.js";
import { DrawableObject } from "./drawable-objects.class.js";

export class StatusBar extends DrawableObject {

    //#region properties
    percentage = 100;
    //#endregion

    constructor(){
        super(30, 0, 60, 200);
        this.loadImages(ImgHub.STATUSBAR.HEALTH);
        this.setPercentage(100);
    }

    //#region methods

    setPercentage(percentage){
        this.percentage = percentage;
        const path = ImgHub.STATUSBAR.HEALTH[this.resolveImageIndex()];
        this.img = this.imgCache[path];
    }

    resolveImageIndex(){
        const imgIndex = this.percentage / 10;
        return imgIndex;
    }
}