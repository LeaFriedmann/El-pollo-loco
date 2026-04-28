import { ImgHub } from "../manager/imgHub.class.js";
import { DrawableObject } from "./drawable-objects.class.js";

export class StatusBar extends DrawableObject {

    //#region properties
    percentage = 100;
    imgStatusbar;
    //#endregion

    constructor(imgStatusbar_, y_){
        super(30, y_, 60, 200);
        this.imgStatusbar = imgStatusbar_;
        this.loadImages(imgStatusbar_);
        this.setPercentage(100);
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