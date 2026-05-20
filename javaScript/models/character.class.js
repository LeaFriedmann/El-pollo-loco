import { AudioHub } from "../manager/audio-hub.clas.js";
import { ImgHub } from "../manager/imgHub.class.js";
import { IntervalHub } from "../manager/intervalHub.class.js";
import { Keyboard } from "../manager/keyboard.class.js";
import { Ref } from "../manager/ref.class.js";
import { BackgroundObject } from "./background-object.class.js";
import { Endboss } from "./endboss.class.js";
import { Entity } from "./entity.class.js";
import { GameState } from "./game-state.class.js";
import { Level } from "./level.class.js";
import { World } from "./world.class.js";

export class Character extends Entity {
    //#region properties
    animationJump = ImgHub.PEPE.JUMP;
    animationIdle = ImgHub.PEPE.IDLE;
    animationSleep = ImgHub.PEPE.SLEEPING;
    animationHurt = ImgHub.PEPE.HURT;
    offset = {
        top: 130,
        right: 30,
        bottom: 20,
        left: 30,
    };
    idleCounter = 0;

    //#endregion

    constructor() {
        super(120, 150, 280, 120, 10, 100, 10, ImgHub.PEPE.WALK, ImgHub.PEPE.DEAD);

        this.loadImages(this.animationJump);
        this.loadImages(this.animationHurt);
        this.loadImages(this.animationIdle);
        this.loadImages(this.animationSleep);

        IntervalHub.startInterval(this.movement, 1000 / 25);
        IntervalHub.startInterval(this.animate, 1000 / 60); // laufanimation
        IntervalHub.startInterval(this.applyGravity, 1000 / 25); // fall animation
        IntervalHub.startInterval(this.resetValues, 1000 / 60);
    }

    //#region methods

    movement = () => {
        // bewegt objekt wenn pfeiltaste rechts gedrückt
        // und objekt noch nicht am ende der Level.END_X koordinate angekommen
        if (Keyboard.RIGHT && this.x < Level.END_X && this.endbossNotPassed() && !this.isDead() && !Level.endboss.isDead()) {
            this.moveRight();
            this.otherDirection = false;
        }

        // bewegt objekt wenn pfeiltaste links gedrückt
        // und x koordinate größer als 0
        if (Keyboard.LEFT && this.x > 0 && !this.isDead() && !Level.endboss.isDead()) {
            this.moveLeft();
            this.otherDirection = true;
        }

        // sprung wird nur ausgeführt wenn character auf boden
        if (Keyboard.UP && !this.isAboveGround()) {
            this.jump();
            AudioHub.playOne(AudioHub.CHARACTER.JUMP);
        }

        World.CAMERA_X = -this.x + 100;
    };

    endbossNotPassed() {
        return Level.endboss.rX > this.rX + this.rW;
    }

    animate = () => {
        if (this.isDead()) {
            // if abfrage damit nach ein paar sekunden animation stoppt und outro angezeigt wird
            if (!this.deadAnimationStop()) {
                this.playAnimation("dead", this.animationDead, 14);
                if (!AudioHub.CHARACTER.DEAD.isPlaying) {
                    AudioHub.playOne(AudioHub.CHARACTER.DEAD);
                }
            } else {
                IntervalHub.stopAllIntervals();
                GameState.LOST = true;
                GameState.showOutro();
            }
        } else if (this.isHurt()) {
            this.playAnimation("hurt", this.animationHurt, 14);
            if (!AudioHub.CHARACTER.DAMAGE.isPlaying) {
                AudioHub.playOne(AudioHub.CHARACTER.DAMAGE);
            }
        } else if (this.isAboveGround()) {
            this.playAnimation("jump", this.animationJump, 14);
        } else if ((Keyboard.RIGHT || Keyboard.LEFT) && !Level.endboss.isDead()) {
            this.playAnimation("walk", this.animationWalk, 14);
            if (!AudioHub.CHARACTER.RUN.isPlaying) {
                AudioHub.playOne(AudioHub.CHARACTER.RUN);
            }
        } else if (this.sleepTime() && !this.idleCounter == 0) {
            // wenn idle counter über 8 sleep animation
            this.playAnimation("sleep", this.animationSleep, 10);
            if (!AudioHub.CHARACTER.SNORING.isPlaying) {
                AudioHub.playOne(AudioHub.CHARACTER.SNORING);
            }
        } else {
            // idle animation wenn keine tasten gedrückt
            this.playAnimation("idle", this.animationIdle, 10);
            if (this.idleCounter == 0) {
                // idle counter starten, wird  auf 0 gesetzt wenn character sich bewegt
                this.startIdleCounter();
            }
        }
    };

    resetValues = () => {
        if (this.isAboveGround() || Keyboard.LEFT || Keyboard.RIGHT || Keyboard.D || this.isHurt()) {
            this.resetIdleCounter();
            AudioHub.stopOne(AudioHub.CHARACTER.SNORING);
        }
        if (Level.END_X - this.x < 600 && !Endboss.startWalking) {
            Endboss.isAlert = true;
        }
        if (Level.END_X - this.x < 400) {
            Endboss.isAlert = false;
            Endboss.startWalking = true;
        }
        if (!this.isHurt()) {
            AudioHub.stopOne(AudioHub.CHARACTER.DAMAGE);
        }
        if ((!Keyboard.LEFT && !Keyboard.RIGHT) || this.isHurt() || this.isDead() || this.isAboveGround()) {
            AudioHub.stopOne(AudioHub.CHARACTER.RUN);
        }
    };

    jumpsDown() {
        return this.speedY < 0;
    }

    jump() {
        this.speedY = 25;
    }

    //#region methods idle/sleep
    // berechnet wie lange schon idle, true wenn länger als 8 sec
    sleepTime() {
        let timePassed = new Date().getTime() - this.idleCounter;
        timePassed = timePassed / 1000;
        return timePassed > 8;
    }

    startIdleCounter() {
        this.idleCounter = new Date().getTime();
    }

    resetIdleCounter() {
        this.idleCounter = 0;
    }
    //#endregion

    //#endregion
}
