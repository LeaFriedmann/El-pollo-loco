export class Ref {
    static canvas = document.getElementById("canvas");
    static btnMute = document.getElementById("btnMute");
    static btnStart = document.getElementById("btnStartGame");
    static btnHome = document.getElementById("btnHome");
    static btnRestart = document.getElementById("btnRestart");
    static btnNextLvl = document.getElementById("btnNextLvl");

    static mobileBtns = document.getElementById("mobileBtns")
    static btnLeftMobile = document.getElementById("btnLeft");
    static btnRightMobile = document.getElementById("btnRight");
    static btnJumpMobile = document.getElementById("btnJump");
    static btnThrowMobile = document.getElementById("btnThrow");

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

    static hideMobileBtn(){
        Ref.hideButton(Ref.mobileBtns);
    }

    static showMobileBtn(){
        Ref.showButton(Ref.mobileBtns);
    }
}
