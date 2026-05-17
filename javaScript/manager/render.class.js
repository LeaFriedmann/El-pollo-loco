import { Level } from "../models/level.class.js";
import { AudioHub } from "./audio-hub.clas.js";
import { Ref } from "./ref.class.js";
import { Template } from "./template.class.js";

export class Render {

    static btnSound() {
        if (AudioHub.TOGGLE_SOUND) {
            Ref.btnMute.innerHTML = "";
            Ref.btnMute.innerHTML = Template.soundBtn();
        } else {
            Ref.btnMute.innerHTML = "";
            Ref.btnMute.innerHTML = Template.btnMute();
        }
    }

    static currentLvl(){
        Ref.levelInfo.innerText = "";
        Ref.levelInfo.innerText = "Level: " + Level.currentLevel;
    }
}
