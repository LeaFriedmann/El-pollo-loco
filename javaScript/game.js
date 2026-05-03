import { Keyboard } from "./manager/keyboard.class.js";
import { GameState } from "./models/game-state.class.js";
import { Level } from "./models/level.class.js";
import { World } from "./models/world.class.js";

class StartGame {
    //#region properties
    canvas;
    world;
    //#endregion

    constructor() {
        GameState.GAME_ONGOING = true;
        this.canvas = document.getElementById("canvas");
        this.world = new World(canvas, new Level(15));

        window.addEventListener("keydown", (e) => {
            if (e.key == "ArrowUp") {
                Keyboard.UP = true;
            }
            if (e.key == "ArrowDown") {
                Keyboard.DOWN = true;
            }
            if (e.key == "ArrowRight") {
                Keyboard.RIGHT = true;
            }
            if (e.key == "ArrowLeft") {
                Keyboard.LEFT = true;
            }
            if (e.key == " ") {
                Keyboard.SPACE = true;
            }
            if (e.key == "d") {
                Keyboard.D = true;
            }
        });

        window.addEventListener("keyup", (e) => {
            if (e.key == "ArrowUp") {
                Keyboard.UP = false;
            }
            if (e.key == "ArrowDown") {
                Keyboard.DOWN = false;
            }
            if (e.key == "ArrowRight") {
                Keyboard.RIGHT = false;
            }
            if (e.key == "ArrowLeft") {
                Keyboard.LEFT = false;
            }
            if (e.key == " ") {
                Keyboard.SPACE = false;
            }
            if (e.key == "d") {
                Keyboard.D = false;
            }
        });
    }
}

new StartGame();