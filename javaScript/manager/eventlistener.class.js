import { world } from "../game.js";
import { GameState } from "../models/game-state.class.js";
import { Level } from "../models/level.class.js";
import { World } from "../models/world.class.js";
import { AudioHub } from "./audio-hub.clas.js";
import { Keyboard } from "./keyboard.class.js";
import { Ref } from "./ref.class.js";
import { Render } from "./render.class.js";

export class Listener {
    //#region methods
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

    static btnsTouchstart() {
        Ref.btnLeftMobile.addEventListener("pointerdown", (e) => {
            e.preventDefault();
            Keyboard.LEFT = true;
        });

        Ref.btnRightMobile.addEventListener("pointerdown", (e) => {
            e.preventDefault();
            Keyboard.RIGHT = true;
        });

        Ref.btnJumpMobile.addEventListener("pointerdown", (e) => {
            e.preventDefault();
            Keyboard.UP = true;
        });

        Ref.btnThrowMobile.addEventListener("pointerdown", (e) => {
            e.preventDefault();
            Keyboard.D = true;
        });
    }

    static btnsToucend() {
        Ref.btnLeftMobile.addEventListener("pointerup", () => {
            Keyboard.LEFT = false;
        });

        Ref.btnRightMobile.addEventListener("pointerup", () => {
            Keyboard.RIGHT = false;
        });

        Ref.btnJumpMobile.addEventListener("pointerup", () => {
            Keyboard.UP = false;
        });

        Ref.btnThrowMobile.addEventListener("pointerup", () => {
            Keyboard.D = false;
        });
    }
    //#endregion

    //#region buttons
    static openInfo() {
        Ref.btnInfo.addEventListener("click", () => {
            Ref.infoDialog.showModal();
        });
    }

    static closeInfo() {
        Ref.btnClose.addEventListener("click", () => {
            Ref.infoDialog.close();
        });
    }

    static clickStartGame() {
        Ref.btnStart.addEventListener("click", () => {
            // fullscreen falls mobile
            if (Listener.isMobile()) {
                Listener.toFullscreen();
            }

            Ref.hideElement(Ref.btnStart);
            Ref.hideImpressum();
            GameState.startLevel();
        });
    }

    static toFullscreen() {
        const elem = document.documentElement;
        /* View in fullscreen */
        if (elem.requestFullscreen) {
            elem.requestFullscreen();
        } else if (elem.webkitRequestFullscreen) {
            /* Safari */
            elem.webkitRequestFullscreen();
        } else if (elem.msRequestFullscreen) {
            /* IE11 */
            elem.msRequestFullscreen();
        }
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
            // fulscreen beenden
            if (Listener.isMobile()) {
                Listener.endFullscreen();
            }

            GameState.startscreen = true;
            GameState.gameReset();
            Ref.showElement(Ref.btnStart);
            Ref.showImpressum();
            Ref.hideBtns();
        });
    }

    static endFullscreen() {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.webkitExitFullscreen) {
            /* Safari */
            document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) {
            /* IE11 */
            document.msExitFullscreen();
        }
    }

    static isMobile() {
        return "ontouchstart" in window || navigator.maxTouchPoints > 0;
    }

    //#region buttons mobile
    static addMobileBtn() {
        if (Listener.isMobile()) {
            Ref.btnStart.addEventListener("click", () => {
                Ref.showMobileBtn();
            });
            Ref.btnRestart.addEventListener("click", () => {
                Ref.showMobileBtn();
            });
            Ref.btnNextLvl.addEventListener("click", () => {
                Ref.showMobileBtn();
            });
        }
    }

    //#endregion
    //#endregion

    //#region audio
    // wenn audio für schnarchen durchgelaufen ist, wird isPlaying auf false gesetzt, dass sound im interval wieder von vore gespielt wird
    static endSnoring() {
        AudioHub.CHARACTER.SNORING.file.addEventListener("ended", () => {
            AudioHub.CHARACTER.SNORING.isPlaying = false;
        });
    }

    static muteAudio() {
        Ref.btnMute.addEventListener("click", () => {
            AudioHub.toggleSound();
            Render.btnSound();
        });
    }

    static startGameAudio() {
        Ref.btnStart.addEventListener("click", () => {
            AudioHub.playOne(AudioHub.GAME_START);
        });
    }

    static restartAudio() {
        Ref.btnRestart.addEventListener("click", () => {
            AudioHub.playOne(AudioHub.GAME_START);
        });
    }

    static playBackgrMusic() {
        AudioHub.BACKGROUND_MUSIC.file.addEventListener("ended", () => {
            AudioHub.playOne(AudioHub.BACKGROUND_MUSIC);
        });
    }
    //#endregion

    //#region fit-device
    // konttext menü bei mobile btns deaktivieren
    static disableCntxtMenu() {
        Ref.mobileBtns.addEventListener("contextmenu", (e) => e.preventDefault());
    }

    // zeigt je nach gerät und ausrichtung entweder canvas oder aufforderung Gerät zu drehen um zu spielen
    static checkDevice() {
        const orientationType = window.screen.orientation.type;
        if (!this.isMobile()) {
            // desktop
            Ref.showElement(Ref.wrprCanvas);
            Ref.showElement(Ref.header);
        } else if (Listener.isMobile() && (orientationType == "portrait-primary" || orientationType == "portrait-secondary")) {
            Listener.mobilePortrait();
            Ref.hideElement(Ref.infoKeys);
        } else if ((this.isMobile() && orientationType == "landscape-primary") || orientationType == "landscape-secondary") {
            Listener.mobileLandscape();
            Ref.hideElement(Ref.infoKeys);
        }
    }

    // checkt ob sich die ausrichtung des gräts ändert und zeigt je nach ausrichtung canvas, footer, meldung zum drehen des geräts
    static checkOrientation() {
        screen.orientation.addEventListener("change", (e) => {
            if (this.isMobile()) {
                const type = e.target.type;
                if (type == "portrait-primary" || type == "portrait-secondary") {
                    // hochkant
                    Listener.mobilePortrait();
                } else if (type == "landscape-primary" || type == "landscape-secondary") {
                    Listener.mobileLandscape();
                }
            }
        });
    }

    static mobileLandscape() {
        Ref.hideElement(Ref.rotateMsg);
        Ref.showElement(Ref.wrprCanvas);
        Ref.hideElement(Ref.header);
        document.body.classList.add("positionCenter"); // canvas zentral positionieren
    }

    static mobilePortrait() {
        Ref.showElement(Ref.rotateMsg);
        Ref.hideElement(Ref.header);
        document.body.classList.add("positionCenter"); // canvas zentral positionieren
        Ref.hideElement(Ref.wrprCanvas);
    }
    //#endregion
    //#endregion
}
