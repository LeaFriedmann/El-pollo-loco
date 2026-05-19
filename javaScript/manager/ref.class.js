export class Ref {
    //#region properties
    static header = document.getElementById("header")
    static canvas = document.getElementById("canvas");
    static rotateMsg = document.getElementById("rotateMessage");
    static wrprCanvas = document.getElementById("wrprCanvas");
    static levelInfo = document.getElementById("level");
    static btnInfo = document.getElementById("btnInfo")
    static btnMute = document.getElementById("btnMute");
    static impressum = document.getElementById("sectImpressum");
    static btnStart = document.getElementById("btnStartGame");
    static btnHome = document.getElementById("btnHome");
    static btnRestart = document.getElementById("btnRestart");
    static btnNextLvl = document.getElementById("btnNextLvl");
    static wrprBtns = document.getElementById("btnsPostGame");

    static mobileBtns = document.getElementById("mobileBtns");
    static btnLeftMobile = document.getElementById("btnLeft");
    static btnRightMobile = document.getElementById("btnRight");
    static btnJumpMobile = document.getElementById("btnJump");
    static btnThrowMobile = document.getElementById("btnThrow");

    static infoDialog = document.getElementById("gameInfo");
    static btnClose = document.getElementById("btnClose");
    static infoKeys = document.getElementById("infoControls"); // p der nur bei desktop version gebraucht wird

    //#endregion

    //#region methods
    static btnInvisible(refBtn){
        refBtn.classList.add("invisible")
    }

    static btnVisible(refBtn){
        refBtn.classList.remove("invisible")
    }

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

    static hideImpressum(){
        Ref.hideButton(Ref.impressum);
    }

    static showImpressum(){
        Ref.showButton(Ref.impressum);
    }
    //#endregion
}
