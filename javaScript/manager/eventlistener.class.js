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

    static btnsTouchstart(){
        Ref.btnLeftMobile.addEventListener("touchstart", () => {
            Keyboard.LEFT = true;
        });

        Ref.btnRightMobile.addEventListener("touchstart", () => {
            Keyboard.RIGHT = true;
        });

        Ref.btnJumpMobile.addEventListener("touchstart", () => {
            Keyboard.UP = true;
        })

        Ref.btnThrowMobile.addEventListener("touchstart", () => {
            Keyboard.D = true;
        })
    }

    static btnsToucend(){
        Ref.btnLeftMobile.addEventListener("touchend", () => {
            Keyboard.LEFT = false;
        });

        Ref.btnRightMobile.addEventListener("touchend", () => {
            Keyboard.RIGHT = false;
        });

        Ref.btnJumpMobile.addEventListener("touchend", () => {
            Keyboard.UP = false;
        })

        Ref.btnThrowMobile.addEventListener("touchend", () => {
            Keyboard.D = false;
        })
    }
    //#endregion

    //#region buttons
    static openInfo(){
        Ref.btnInfo.addEventListener("click", () => {
            Ref.infoDialog.showModal();
            console.log("yes");
            
        })
    }

    static closeInfo(){
        Ref.btnClose.addEventListener("click", () => {
            Ref.infoDialog.close();
        })
    }

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
            Ref.wrprCanvas.classList.remove("hide");
            Ref.footer.classList.remove("hide");
            Ref.header.classList.remove("hide");
        } else if (Listener.isMobile() && (orientationType == "portrait-primary" || orientationType == "portrait-secondary")) {
            Listener.mobilePortrait();
            Ref.infoKeys.classList.add("hide");
        } else if ((this.isMobile() && orientationType == "landscape-primary") || orientationType == "landscape-secondary") {
            Listener.mobileLandscape();
            Ref.infoKeys.classList.add("hide");
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
        Ref.rotateMsg.classList.add("hide"); // aufforderung zum drehen des geräts verbergen
        Ref.wrprCanvas.classList.remove("hide"); // mobile quer
        Ref.header.classList.add("hide"); // überschrift verbergen
        document.body.classList.add("positionCenter"); // canvas zentral positionieren 
        if (window.screen.height < 600) { // footer zeigen falls genug platz
            Ref.footer.classList.add("hide");
        }
    }

    static mobilePortrait() {
        Ref.rotateMsg.classList.remove("hide"); // mobile hochkant
        Ref.header.classList.add("hide"); // überschrift verbergen
        document.body.classList.add("positionCenter"); // canvas zentral positionieren
        Ref.wrprCanvas.classList.add("hide"); // canvas verbergen
        Ref.footer.classList.remove("hide"); // footer zeigen
    }
    //#endregion
}
