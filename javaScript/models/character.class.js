import { ImgHub } from "../manager/imgHub.class.js";
import { IntervalHub } from "../manager/intervalHub.class.js";
import { Keyboard } from "../manager/keyboard.class.js";
import { BackgroundObject } from "./background-object.class.js";
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
    currentJumpImg = 0;
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
        IntervalHub.startInterval(this.animate, 70); // laufanimation
        IntervalHub.startInterval(this.applyGravity, 1000 / 25); // fall animation
    }

    //#region methods

    // TODO geschwindigkeit animation anpassen

    movement = () => {
        // bewegt objekt wenn pfeiltaste rechts gedrückt
        // und objekt noch nicht am ende der Level.END_X koordinate angekommen
        if (Keyboard.RIGHT && this.x < Level.END_X) {
            this.moveRight();
            this.otherDirection = false;
        }

        // bewegt objekt wenn pfeiltaste links gedrückt
        // und x koordinate größer als 0
        if (Keyboard.LEFT && this.x > 0) {
            this.moveLeft();
            this.otherDirection = true;
        }

        // sprung wird nur ausgeführt wenn character auf boden
        if (Keyboard.SPACE && !this.isAboveGround()) {
            this.jump();
        }

        World.CAMERA_X = -this.x + 100;
    };

    animate = () => {
        
        if (!this.isAboveGround()) {
            // jump img auf index 0 wenn sprung vorbei
            this.resetJumpAnimation();
        }
        if (this.isAboveGround() || Keyboard.LEFT || Keyboard.RIGHT || Keyboard.D ){
            this.resetIdleCounter();
        }
        if (this.isDead()) {
            // deat animation wenn health = 0
            this.playAnimation(this.animationDead);
            setTimeout(() => {
                GameState.gameReset("lost");
                GameState.LOST = true;
            }, 1500);
        } else if (this.isHurt()) {
            // hurt animation wenn letzter hit mehl als 0.5 sec her war
            this.playAnimation(this.animationHurt);
        } else if (this.isAboveGround()) {
            // jump animation bei sprung
            this.playJumpAnimation(this.animationJump);
        } else if (Keyboard.RIGHT || Keyboard.LEFT) {
            // laufanimation wenn pfeil rechts oder links gedrückt
            this.playAnimation(this.animationWalk);
        } else {
            // idle animation wenn keine tasten gedrückt
            this.playAnimation(this.animationIdle);
            if (this.idleCounter == 0) { // idle counter starten, wird  auf 0 gesetzt wenn character sich bewegt
                this.startIdleCounter();
            }
            if (this.sleepTime()) { // wenn idle counter über 8 sleep animation
                this.playAnimation(this.animationSleep);
            }
        }
    };

    //#region methods idle/sleepdd
    // berechnet wie lange schon idle, true wenn länger als 8 sec
    sleepTime() {
        let timePassed = new Date().getTime() - this.idleCounter;
        timePassed = timePassed / 1000;
        return timePassed > 8;
    }

    startIdleCounter() {
        this.idleCounter = new Date().getTime();
    }

    resetIdleCounter(){
        this.idleCounter = 0;
    }
    //#endregion

    //#region methods jump animation
    // speilt jump animation ein mal pro sprung
    playJumpAnimation(images) {
        if (this.currentJumpImg < images.length) {
            this.nextJumpImg(images);
        }
        if (!this.isAboveGround()) {
            this.resetJumpAnimation();
        }
    }

    nextJumpImg(images) {
        const i = this.currentJumpImg;
        const path = images[i];
        this.img = this.imgCache[path];
        this.currentJumpImg++;
    }

    resetJumpAnimation() {
        this.currentJumpImg = 0;
    }

    jump() {
        this.speedY = 25;
    }
    //#endregion

    //#endregion
}
