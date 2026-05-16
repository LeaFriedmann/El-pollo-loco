import { AudioHub } from "./manager/audio-hub.clas.js";
import { Listener } from "./manager/eventlistener.class.js";
import { Render } from "./manager/render.class.js";

export const world = [];

export class StartGame {
    constructor() {
        Listener.checkDevice();
        Listener.checkOrientation();
        AudioHub.getFromLocl();
        Render.btnSound();
        Listener.clickKeyDown();
        Listener.clickKeyUp();
        Listener.clickStartGame();
        Listener.clickHome();
        Listener.clickNextLvl();
        Listener.clickRestart();
        Listener.addMobileBtn();
        Listener.btnsToucend();
        Listener.btnsTouchstart();
        Listener.endSnoring();
        Listener.muteAudio();
        Listener.startGameAudio();
        Listener.restartAudio();
        Listener.disableCntxtMenu();
        Listener.playBackgrMusic();
        Listener.openInfo();
        Listener.closeInfo();
    }
}

new StartGame();
