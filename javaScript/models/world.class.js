import { ImgHub } from "../manager/imgHub.class.js";
import { IntervalHub } from "../manager/intervalHub.class.js";
import { Keyboard } from "../manager/keyboard.class.js";
import { Character } from "./character.class.js";
import { Chicken } from "./chicken.class.js";
import { Endboss } from "./endboss.class.js";
import { Entity } from "./entity.class.js";
import { GameState } from "./game-state.class.js";
import { Level } from "./level.class.js";
import { NormalChicken } from "./normal-chicken.class.js";
import { SmallChicken } from "./small-chicken.class.js";
import { StatusBar } from "./status-bar.class.js";
import { ThrowableObject } from "./throwable-object.class.js";

export class World {
    //#region properties
    character = new Character();
    level;
    canvas;
    ctx;
    statusbarHealth = new StatusBar(ImgHub.STATUSBAR.HEALTH, 0);
    statusbarEndboss = new StatusBar(ImgHub.STATUSBAR.ENEMY, 60);
    static CAMERA_X = 0;
    outroBackgr = GameState.outroBackground();

    //#endregion

    constructor(canvas, level) {
        this.ctx = canvas.getContext("2d");
        this.canvas = canvas;
        this.level = level;
        this.draw();
        IntervalHub.startInterval(this.checkCollisions, 200);
        IntervalHub.startInterval(this.collisionTop, 1000 / 60);
        IntervalHub.startInterval(this.checkThrowObjects, 50);
    }

    //#region methods

    // checkt für jeden enemy ob kollision mit character
    checkCollisions = () => {
        // Level.enemies.forEach((enemy) => {
        //     if (this.character.isColliding(enemy)) {
        //         this.character.hit();
        //         this.statusbar.setPercentage(this.character.energy)
        //         console.log(this.character.energy);
        //     }
        // });

        // this.collisionObjects(Level.enemies, this.character, this.statusbarHealth);
        // this.collisionObjects(Level.ThrowableObjects, Level.endboss, this.statusbarEndboss);

        this.collisionCharacter();
        this.collisionBottle();
    };

    collisionObjects(mO, target, statusbar) {
        if (target.energy > 0) {
            mO.forEach((mo) => {
                if (target.isColliding(mo)) {
                    if (!mo.isDead()) {
                        target.hit();
                        console.log(mo instanceof SmallChicken);
                        if (mo instanceof ThrowableObject) {
                            mo.energy = 0;
                        }
                    }
                    statusbar.setPercentage(target.energy);
                    console.log(target.energy);
                }
            });
        }
    }

    // checkt für jede bottle kollision mit jedem enemy
    collisionBottle() {
        Level.ThrowableObjects.forEach((bottle) => {
            this.collisionEnemies(bottle);
        });
    }

    // checkt für jeden enemy collision mit bottle
    // bei kollision wird enemy schaden abgezogen, flasche auch (chicken, smallChicken und bottle direkt energy auf 0)
    collisionEnemies(bottle) {
        Level.enemies.forEach((enemy) => {
            if (bottle.isColliding(enemy)) {
                if (!bottle.isDead()) {
                    enemy.hit();
                    bottle.hit();
                    if (enemy instanceof Endboss) {
                        this.statusbarEndboss.setPercentage(enemy.energy);
                    }
                }
            }
        });
    }

    // checkt für jeden enemy collision mit character
    // wenn enemy lebt wird character energy abgezogen
    collisionCharacter() {
        Level.enemies.forEach((enemy) => {
            if (this.character.isColliding(enemy) && this.character.speedY >= 0 && !enemy.isDead()) {
                this.character.hit();
                this.statusbarHealth.setPercentage(this.character.energy);
                console.log(this.character.energy);
            }
        });
    }

    // prüft für jeden enemy, ob character kollidiert, wenn er vom sprung runter kommt
    // tötet enemy bei collision (außer endboss)
    collisionTop = () => {
        Level.enemies.forEach((enemy) => {
            if (this.character.isColliding(enemy) && this.killableByJump(enemy) && this.character.speedY < 0) {
                enemy.hit();
            }
        });
    };

    killableByJump(enemy) {
        return enemy instanceof NormalChicken || enemy instanceof SmallChicken;
    }

    // instanziert flasche bei klick auf taste D
    // flasche wird bei instanzierung geworfen
    checkThrowObjects = () => {
        if (Keyboard.D && this.character.otherDirection && Level.ThrowableObjects.length < 1) {
            this.addThrowableObject("left");
        } else if (Keyboard.D && !this.character.otherDirection && Level.ThrowableObjects.length < 1) {
            this.addThrowableObject("right");
        }
    };

    addThrowableObject(direction) {
        Level.ThrowableObjects.push(new ThrowableObject(this.character.rX, this.character.rY, direction));
    }

    draw() {
        // canvas leeren
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        if (GameState.GAME_ONGOING) {
            this.drawGameObjects();
        } else {
            this.drawOutro();
        }

        requestAnimationFrame(() => this.draw()); // draw wird immer wieder aufgerufen
    }

    // während spiel läuft
    drawGameObjects() {
        // erster wert x achse, zweiter wert y achse
        this.ctx.translate(World.CAMERA_X, 0);

        // objekte hinzufügen
        this.addObjectsToMap(this.level.backgroundObjects);
        this.addObjectsToMap(this.level.clouds);

        this.ctx.translate(-World.CAMERA_X, 0);
        this.addToMap(this.statusbarHealth);
        this.addToMap(this.statusbarEndboss);
        this.ctx.translate(World.CAMERA_X, 0);

        this.addToMap(this.character);
        this.addObjectsToMap(Level.enemies);
        this.addToMap(Level.endboss);
        this.addObjectsToMap(Level.ThrowableObjects);

        this.ctx.translate(-World.CAMERA_X, 0);
    }

    // wenn spiel vorbei endscreen
    drawOutro() {
        this.addObjectsToMap(GameState.outroBackgrArr);
        this.addToMap(GameState.outro);
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

        // gemeint ist draw methode in drawable object class
        mo.draw(this.ctx);

        // if (mo instanceof Entity) {
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
