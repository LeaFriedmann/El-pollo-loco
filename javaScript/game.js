import { Listener } from "./manager/eventlistener.class.js";

export const world = [];

export class StartGame {
    constructor() {
        Listener.clickKeyDown();
        Listener.clickKeyUp();
        Listener.clickStartGame();
        Listener.clickHome();
        Listener.clickNextLvl();
        Listener.clickRestart();
        Listener.endSnoring();
        Listener.muteAudio();
    }
}

new StartGame();
