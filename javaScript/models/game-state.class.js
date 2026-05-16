import { world } from "../game.js";
import { AudioHub } from "../manager/audio-hub.clas.js";
import { ImgHub } from "../manager/imgHub.class.js";
import { IntervalHub } from "../manager/intervalHub.class.js";
import { Ref } from "../manager/ref.class.js";
import { Render } from "../manager/render.class.js";
import { BackgroundObject } from "./background-object.class.js";
import { Cloud } from "./cloud.class.js";
import { Coin } from "./coin.class.js";
import { CollectableBottle } from "./collectable-bottle.class.js";
import { CollectableObject } from "./collectable-object.class.js";
import { DrawableObject } from "./drawable-objects.class.js";
import { Endboss } from "./endboss.class.js";
import { Level } from "./level.class.js";
import { World } from "./world.class.js";

export class GameState extends DrawableObject {
    //#region properties
    static WON = false;
    static LOST = false;
    static GAME_ONGOING = false;
    static outro;
    static startscreen = true;
    //#endregion

    constructor(x_, y_, height_, width_, img_) {
        super(x_, y_, height_, width_);
        this.loadImage(img_);
    }

    // lädt img won
    static wonOutro() {
        return new GameState(206, 90, 300, 308, ImgHub.RESULT.W0N[0]);
    }

    // lädt img lost
    static lostOutro() {
        return new GameState(206, 131, 218, 308, ImgHub.RESULT.LOST[0]);
    }

    // setzt werte nach ende des spiels zurück
    static gameReset() {
        BackgroundObject.xPos = -719;
        BackgroundObject.turn = 0;
        GameState.WON = false;
        GameState.LOST = false;
        Cloud.xPos = 0;
        Coin.collected = 0;
        CollectableBottle.collected = 0;
        Coin.gap = 0;
        CollectableBottle.gap = 0;
        Coin.xPos = 300;
        CollectableBottle.xPos = 300;
        Endboss.isAlert = false;
        Endboss.startWalking = false;
        Endboss.attack = false;
        GameState.outro = "";
        Level.enemies = [];
        Level.endboss = "";
        Level.ThrowableObjects = [];
        CollectableObject.arrAll = [];
        CollectableBottle.availableBottles = 0;
        World.CAMERA_X = 0;
        world.splice(0);                
    }

    static showOutro() {
        // weist je nach ergebnis class property outro instanz von Gamestate zu, damit enstprechendes img geladen wird
        // zeigt benötigte buttons 
        if (GameState.WON) {
            GameState.outro = GameState.wonOutro();
        } else if (GameState.LOST) {
            GameState.outro = GameState.lostOutro();
        }
        Ref.hideMobileBtn();
        Ref.showBtns();
        Ref.btnVisible(Ref.btnInfo);
        GameState.GAME_ONGOING = false;
        AudioHub.stopAll();
    }

    static nextLvl(){
        Level.currentLevel++;
    }

    static startLevel() {
        GameState.startscreen = false;
        GameState.gameReset();
        Ref.btnInvisible(Ref.btnInfo)
        AudioHub.playOne(AudioHub.BACKGROUND_MUSIC);
        AudioHub.toggleSound();
        AudioHub.toggleSound();
        world.push(new World(Ref.canvas, new Level(Level.currentLevel)));
        Render.currentLvl();
        GameState.GAME_ONGOING = true;
        console.log(Level.currentLevel);
    }
}
