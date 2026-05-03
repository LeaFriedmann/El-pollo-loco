import { ImgHub } from "../manager/imgHub.class.js";
import { IntervalHub } from "../manager/intervalHub.class.js";
import { BackgroundObject } from "./background-object.class.js";
import { Cloud } from "./cloud.class.js";
import { DrawableObject } from "./drawable-objects.class.js";

export class GameState extends DrawableObject {
    //#region properties
    static WON = false;
    static LOST = false;
    static GAME_ONGOING = false;
    static outro;
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

    // setzt werte nach ende des spiels zurück, beendet invervalle
    static gameReset(state) {
        // weist je nach ergebnis class property outro instanz von Gamestate zu, damit enstprechendes img geladen wird
        if (state == "won") {
            GameState.outro = GameState.wonOutro();
        } else if (state == "lost") {
            GameState.outro = GameState.lostOutro();
        }
        GameState.GAME_ONGOING = false;
        BackgroundObject.xPos = -719;
        IntervalHub.stopAllIntervals();
    }
}
