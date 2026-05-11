import { Ref } from "./ref.class.js";
import { Template } from "./template.class.js";

export class Render {

    static btnMute(){
        Ref.btnMute.innerHTML = "";
        Ref.btnMute.innerHTML = Template.btnMute();
    }

    static btnSound(){
        Ref.btnMute.innerHTML = "";
        Ref.btnMute.innerHTML = Template.soundBtn();
    }
}