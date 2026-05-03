import { ImgHub } from "../manager/imgHub.class.js";
import { DrawableObject } from "./drawable-objects.class.js";

export class StatusBar extends DrawableObject {

    //#region properties
    percentage;
    imgStatusbar;
    //#endregion

    constructor(x_, y_, imgStatusbar_, percentage_){
        super(x_, y_, 60, 200);
        this.imgStatusbar = imgStatusbar_;
        this.percentage = percentage_;
        this.loadImages(imgStatusbar_);
        this.setPercentage(percentage_);
    }

    //#region methods

    setPercentage(percentage){
        this.percentage = percentage;
        const path = this.imgStatusbar[this.resolveImageIndex()];
        this.img = this.imgCache[path];
    }

    resolveImageIndex(){
        const imgIndex = this.percentage / 10;
        return imgIndex;
    }
}