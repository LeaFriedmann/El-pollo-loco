import { AudioHub } from "./manager/audio-hub.clas.js";
import { Listener } from "./manager/eventlistener.class.js";
import { Render } from "./manager/render.class.js";

export const world = [];

export class StartGame {
    constructor() {
        AudioHub.getFromLocl();
        Render.btnSound();
        Listener.clickKeyDown();
        Listener.clickKeyUp();
        Listener.clickStartGame();
        Listener.clickHome();
        Listener.clickNextLvl();
        Listener.clickRestart();
        Listener.addMobileBtn();
        Listener.endSnoring();
        Listener.muteAudio();
        Listener.startGameAudio();
        Listener.restartAudio();
        Listener.disableCntxtMenu();
    }
}

new StartGame();
