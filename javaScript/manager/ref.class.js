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
    static btnInvisible(refElement){
        refElement.classList.add("invisible")
    }

    static btnVisible(refElement){
        refElement.classList.remove("invisible")
    }

    static hideElement(refElement) {
        refElement.classList.add("hide");
    }

    static showElement(refElement) {
        refElement.classList.remove("hide");
    }

    static hideBtns() {
        Ref.hideElement(Ref.wrprBtns);
    }

    static showBtns(){
        Ref.showElement(Ref.wrprBtns);
    }

    static hideMobileBtn(){
        Ref.hideElement(Ref.mobileBtns);
    }

    static showMobileBtn(){
        Ref.showElement(Ref.mobileBtns);
    }

    static hideImpressum(){
        Ref.hideElement(Ref.impressum);
    }

    static showImpressum(){
        Ref.showElement(Ref.impressum);
    }
    //#endregion
}
