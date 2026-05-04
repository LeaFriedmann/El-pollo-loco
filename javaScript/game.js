import { Keyboard } from "./manager/keyboard.class.js";
import { GameState } from "./models/game-state.class.js";
import { Level } from "./models/level.class.js";
import { World } from "./models/world.class.js";

export let world = [];
export const canvas = document.getElementById("canvas");

export class StartGame {

    constructor() {
        world.push(new World(canvas));

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
            if (e.key == "g") {
                World.level = new Level(Level.currentLevel);
                GameState.GAME_ONGOING = true;
                console.log(Level.currentLevel)
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

// new StartGame();
