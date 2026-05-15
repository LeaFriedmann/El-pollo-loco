export class Ref {
    static body = document.getElementsByTagName("body")
    static header = document.getElementById("header")
    static canvas = document.getElementById("canvas");
    static rotateMsg = document.getElementById("rotateMessage");
    static wrprCanvas = document.getElementById("wrprCanvas");
    static btnMute = document.getElementById("btnMute");
    static btnStart = document.getElementById("btnStartGame");
    static btnHome = document.getElementById("btnHome");
    static btnRestart = document.getElementById("btnRestart");
    static btnNextLvl = document.getElementById("btnNextLvl");
    static wrprBtns = document.getElementById("btnsPostGame");

    static mobileBtns = document.getElementById("mobileBtns")
    static btnLeftMobile = document.getElementById("btnLeft");
    static btnRightMobile = document.getElementById("btnRight");
    static btnJumpMobile = document.getElementById("btnJump");
    static btnThrowMobile = document.getElementById("btnThrow");

    static footer = document.getElementById("footer");

    static hideButton(refBtn) {
        refBtn.classList.add("hide");
    }

    static showButton(refBtn) {
        refBtn.classList.remove("hide");
    }

    static hideBtns() {
        Ref.hideButton(Ref.wrprBtns);
    }

    static showBtns(){
        Ref.showButton(Ref.wrprBtns);
    }

    static hideMobileBtn(){
        Ref.hideButton(Ref.mobileBtns);
    }

    static showMobileBtn(){
        Ref.showButton(Ref.mobileBtns);
    }
}
