import { AudioHub } from "./audio-hub.clas.js";
import { Ref } from "./ref.class.js";
import { Template } from "./template.class.js";

export class Render {
    // static btnMute() {}

    static btnSound() {
        if (AudioHub.TOGGLE_SOUND) {
            Ref.btnMute.innerHTML = "";
            Ref.btnMute.innerHTML = Template.soundBtn();
        } else {
            Ref.btnMute.innerHTML = "";
            Ref.btnMute.innerHTML = Template.btnMute();
        }
    }
}
