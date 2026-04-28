import { ImgHub } from "../manager/imgHub.class.js";
import { IntervalHub } from "../manager/intervalHub.class.js";
import { Keyboard } from "../manager/keyboard.class.js";
import { Character } from "./character.class.js";
import { Chicken } from "./chicken.class.js";
import { Endboss } from "./endboss.class.js";
import { StatusBar } from "./status-bar.class.js";
import { ThrowableObject } from "./throwable-object.class.js";

export class World {
    //#region properties
    character = new Character();
    level;
    canvas;
    ctx;
    statusbar = new StatusBar();
    static ThrowableObjects = [];
    static CAMERA_X = 0;

    //#endregion

    constructor(canvas, level) {
        this.ctx = canvas.getContext("2d");
        this.canvas = canvas;
        this.level = level;
        this.draw();
        IntervalHub.startInterval(this.checkCollisions, 200);
        IntervalHub.startInterval(this.checkThrowObjects, 150);
    }

    //#region methods

    // checkt für jeden enemy ob kollision mit character
    checkCollisions = () => {
        // this.level.enemies.forEach((enemy) => {
        //     if (this.character.isColliding(enemy)) {
        //         this.character.hit();
        //         this.statusbar.setPercentage(this.character.energy)
        //         console.log(this.character.energy);
        //     }
        // });
        this.collisionObjects(this.level.enemies, this.character);
        this.collisionObjects(World.ThrowableObjects, this.level.endboss);
    };

    collisionObjects(mO, target) {
        if (target.energy > 0) {
            mO.forEach((mo) => {
                if (target.isColliding(mo)) {
                    if (mo.alive) {
                        target.hit();
                        if (mo instanceof ThrowableObject) {                            
                            mo.alive = false;
                        }
                    }
                    this.statusbar.setPercentage(target.energy);
                    console.log(target.energy);
                }
            });
        }
    }

    checkThrowObjects = () => {
        if (Keyboard.D) {
            this.addThrowableObject();
        }
    };

    addThrowableObject() {
        World.ThrowableObjects.push(new ThrowableObject(this.character.rX, this.character.rY));
    }

    draw() {
        // canvas leeren
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // erster wert x achse, zweiter wert y achse
        this.ctx.translate(World.CAMERA_X, 0);

        // objekte hinzufügen
        this.addObjectsToMap(this.level.backgroundObjects);
        this.addObjectsToMap(this.level.clouds);

        this.ctx.translate(-World.CAMERA_X, 0);
        this.addToMap(this.statusbar);
        this.ctx.translate(World.CAMERA_X, 0);

        this.addToMap(this.character);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(World.ThrowableObjects);

        this.ctx.translate(-World.CAMERA_X, 0);

        requestAnimationFrame(() => this.draw()); // draw wird immer wieder aufgerufen
    }

    // for each durch array von img der objekte
    addObjectsToMap(objects) {
        objects.forEach((o) => {
            this.addToMap(o);
        });
    }

    // zeigt objekte auf canvas an
    // dreht objekt bei laufen in andere richtung
    addToMap(mo) {
        if (mo.otherDirection) {
            this.flipImage(mo);
        }

        // gemeint ist draw methode in movable object class
        mo.draw(this.ctx);

        // if (mo instanceof Character || mo instanceof Chicken || mo instanceof Endboss || mo instanceof ThrowableObject) {
        //     mo.drawFrame(this.ctx);
        //     mo.drawRealFrame(this.ctx);
        // }

        if (mo.otherDirection) {
            this.flipImageBack(mo);
        }
    }

    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }

    flipImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }
    //#endregion
}
