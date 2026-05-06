export class Ref {
    static canvas = document.getElementById("canvas");
    static btnMute = document.getElementById("btnMute");
    static btnStart = document.getElementById("btnStartGame");
    static btnHome = document.getElementById("btnHome");
    static btnRestart = document.getElementById("btnRestart");
    static btnNextLvl = document.getElementById("btnNextLvl");

    static hideButton(refBtn) {
        refBtn.classList.add("hide");
    }

    static showButton(refBtn) {
        refBtn.classList.remove("hide");
    }

    static hideBtns() {
        Ref.hideButton(Ref.btnHome);
        Ref.hideButton(Ref.btnRestart);
        Ref.hideButton(Ref.btnNextLvl);
    }

    static showBtns(){
        Ref.showButton(Ref.btnHome);
        Ref.showButton(Ref.btnRestart);
        Ref.showButton(Ref.btnNextLvl);
    }
}
