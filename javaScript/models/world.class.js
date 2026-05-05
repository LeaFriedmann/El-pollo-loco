import { ImgHub } from "../manager/imgHub.class.js";
import { IntervalHub } from "../manager/intervalHub.class.js";
import { Keyboard } from "../manager/keyboard.class.js";
import { Character } from "./character.class.js";
import { Chicken } from "./chicken.class.js";
import { CollectableObject } from "./collectable-object.class.js";
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
    canvas;
    ctx;
    statusbarHealth = new StatusBar(30, 0, ImgHub.STATUSBAR.HEALTH, 100);
    statusbarEndboss = new StatusBar(30, 60, ImgHub.STATUSBAR.ENEMY, 100);
    statusbarBottle = new StatusBar(490, 0, ImgHub.STATUSBAR.BOTTLE, 0);
    statusbarCoin = new StatusBar(490, 60, ImgHub.STATUSBAR.COIN, 0)
    static CAMERA_X = 0;
    static level;

    //#endregion

    constructor(canvas, level) {
        this.ctx = canvas.getContext("2d");
        this.canvas = canvas;
        World.level = level;
        this.draw();
        IntervalHub.startInterval(this.checkCollisions, 1000 / 60);
        IntervalHub.startInterval(this.checkThrowObjects, 1000 / 25);
    }

    //#region methods

    //#region methods collision
    checkCollisions = () => {
        this.collisionTop();
        this.collisionCharacter();
        this.collisionBottle();
        this.bottleColllect();
    };

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
            if (this.character.isColliding(enemy) && !this.character.jumpsDown() && !enemy.isDead() && !this.character.isHurt()) {
                this.character.hit();
                this.statusbarHealth.setPercentage(this.character.energy);
                if (enemy instanceof Endboss) {
                    Endboss.attack = true;
                    setTimeout(() => {
                        Endboss.attack = false;
                    }, 1000);
                }
                console.log(this.character.energy);
            }
        });
    }

    // prüft für jeden enemy, ob character kollidiert, wenn er vom sprung runter kommt
    // tötet enemy bei collision (außer endboss)
    collisionTop() {
        Level.enemies.forEach((enemy) => {
            if (this.character.isColliding(enemy) && this.killableByJump(enemy) && this.character.jumpsDown()) {
                enemy.hit();
            }
        });
    }

    killableByJump(enemy) {
        return enemy instanceof NormalChicken || enemy instanceof SmallChicken;
    }

    bottleColllect() {
        Level.collectableObj.forEach((bottle) => {
            if (this.character.isColliding(bottle)) {
                CollectableObject.bottles++;
                bottle.removeBottle();
                this.statusbarBottle.setPercentage(CollectableObject.bottles * 10);
            }
        });
    }

    //#endregion

    // instanziert flasche bei klick auf taste D
    // flasche wird bei instanzierung geworfen
    checkThrowObjects = () => {
        if (Keyboard.D && this.bottleAvailable()) {
            if (this.character.otherDirection) {
                this.addThrowableObject("left");
            } else {
                this.addThrowableObject("right");
            }
            CollectableObject.bottles--;
            this.statusbarBottle.setPercentage(CollectableObject.bottles * 10);
        }
    };

    bottleAvailable() {
        return Level.ThrowableObjects.length < 1 && CollectableObject.bottles > 0 && !Level.endboss.isDead();
    }

    addThrowableObject(direction) {
        Level.ThrowableObjects.push(new ThrowableObject(this.character.rX, this.character.rY, direction));
    }

    //#region methods draw

    draw() {
        // canvas leeren
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // erster wert x achse, zweiter wert y achse
        this.ctx.translate(World.CAMERA_X, 0);

        this.addObjectsToMap(World.level.backgroundObjects);
        this.addObjectsToMap(World.level.clouds);

        if (GameState.GAME_ONGOING) {
            this.drawGameObjects();
        } else if(GameState.LOST || GameState.WON){
            this.drawOutro();
        } else if (GameState.startscreen) {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        }

        this.ctx.translate(-World.CAMERA_X, 0);
        requestAnimationFrame(() => this.draw()); // draw wird immer wieder aufgerufen
    }

    // während spiel läuft
    drawGameObjects() {
        this.ctx.translate(-World.CAMERA_X, 0);
        this.addToMap(this.statusbarHealth);
        this.addToMap(this.statusbarEndboss);
        this.addToMap(this.statusbarBottle);
        this.addToMap(this.statusbarCoin);
        this.ctx.translate(World.CAMERA_X, 0);

        this.addToMap(this.character);
        this.addObjectsToMap(Level.enemies);
        this.addToMap(Level.endboss);
        this.addObjectsToMap(Level.collectableObj);
        this.addObjectsToMap(Level.ThrowableObjects);
    }

    // wenn spiel vorbei endscreen
    drawOutro() {
        this.ctx.translate(-World.CAMERA_X, 0);
        this.addToMap(GameState.outro);
        this.ctx.translate(World.CAMERA_X, 0);
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
    //#endregion
}
