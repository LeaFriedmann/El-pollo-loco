import { world } from "../game.js";
import { GameState } from "../models/game-state.class.js";
import { Level } from "../models/level.class.js";
import { World } from "../models/world.class.js";
import { AudioHub } from "./audio-hub.clas.js";
import { Keyboard } from "./keyboard.class.js";
import { Ref } from "./ref.class.js";
import { Render } from "./render.class.js";

export class Listener {
    //#region tastatur
    static clickKeyDown() {
        window.addEventListener("keydown", (e) => {
            if (e.key == "ArrowUp") {
                Keyboard.UP = true;
            }
            if (e.key == "ArrowDown") {
                Keyboard.DOWN = true;
            }
            if (e.key == "ArrowRight") {
                Keyboard.RIGHT = true;
            }
            if (e.key == "ArrowLeft") {
                Keyboard.LEFT = true;
            }
            if (e.key == " ") {
                Keyboard.SPACE = true;
            }
            if (e.key == "d") {
                Keyboard.D = true;
            }
        });
    }

    static clickKeyUp() {
        window.addEventListener("keyup", (e) => {
            if (e.key == "ArrowUp") {
                Keyboard.UP = false;
            }
            if (e.key == "ArrowDown") {
                Keyboard.DOWN = false;
            }
            if (e.key == "ArrowRight") {
                Keyboard.RIGHT = false;
            }
            if (e.key == "ArrowLeft") {
                Keyboard.LEFT = false;
            }
            if (e.key == " ") {
                Keyboard.SPACE = false;
            }
            if (e.key == "d") {
                Keyboard.D = false;
            }
        });
    }
    //#endregion

    //#region buttons
    static clickStartGame() {
        Ref.btnStart.addEventListener("click", () => {
            Ref.hideButton(Ref.btnStart);
            GameState.startLevel();
        });
    }

    static clickRestart() {
        Ref.btnRestart.addEventListener("click", () => {
            Ref.hideBtns();
            GameState.startLevel();
        });
    }

    static clickNextLvl() {
        Ref.btnNextLvl.addEventListener("click", () => {
            Ref.hideBtns();
            GameState.nextLvl();
            GameState.startLevel();
        });
    }

    static clickHome() {
        Ref.btnHome.addEventListener("click", () => {
            GameState.startscreen = true;
            GameState.gameReset();
            Ref.showButton(Ref.btnStart);
            Ref.hideBtns();
        });
    }

    //#region buttons mobile
    static addMobileBtn(){
        Ref.btnStart.addEventListener("click", () => {
            Ref.showMobileBtn();
        })
    }
    //#endregion
    //#endregion

    //#region audio
    // wenn audio für schnarchen durchgelaufen ist, wird isPlaying auf false gesetzt, dass sound im interval wieder von vore gespielt wird
    static endSnoring(){
        AudioHub.CHARACTER.SNORING.file.addEventListener("ended", () => {
            AudioHub.CHARACTER.SNORING.isPlaying = false;
        })
    }

    static muteAudio(){
        Ref.btnMute.addEventListener("click", () => {
            AudioHub.toggleSound();
            Render.btnSound();
        })
    }

    static startGameAudio(){
        Ref.btnStart.addEventListener("click", () => {
            AudioHub.playOne(AudioHub.GAME_START);
        })
    }

    static restartAudio(){
        Ref.btnRestart.addEventListener("click",() => {
            AudioHub.playOne(AudioHub.GAME_START);
        })
    }
    //#endregion

    static disableCntxtMenu(){
        Ref.mobileBtns.addEventListener("contextmenu", e => e.preventDefault());
    }
}
