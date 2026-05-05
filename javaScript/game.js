import { Keyboard } from "./manager/keyboard.class.js";
import { Ref } from "./manager/ref.class.js";
import { GameState } from "./models/game-state.class.js";
import { Level } from "./models/level.class.js";
import { World } from "./models/world.class.js";

export const world = [];

export class StartGame {
    constructor() {
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

        Ref.btnStart.addEventListener("click", () => {
            Ref.hideButton(Ref.btnStart);
            GameState.startscreen = false;
            GameState.gameReset();
            world.push(new World(Ref.canvas, new Level(Level.currentLevel)));
            GameState.GAME_ONGOING = true;
            console.log(Level.currentLevel);
        });

        Ref.btnRestart.addEventListener("click", () => {
            Ref.hideButton(Ref.btnHome);
            Ref.hideButton(Ref.btnRestart);
            GameState.startscreen = false;
            GameState.gameReset();
            world.push(new World(Ref.canvas, new Level(Level.currentLevel)));
            GameState.GAME_ONGOING = true;
            console.log(Level.currentLevel);
        });

        Ref.btnNextLvl.addEventListener("click", () => {
            Ref.hideButton(Ref.btnHome);
            Ref.hideButton(Ref.btnNextLvl);
            GameState.startscreen = false;
            GameState.gameReset();
            world.push(new World(Ref.canvas, new Level(Level.currentLevel)));
            GameState.GAME_ONGOING = true;
            console.log(Level.currentLevel);
        });

        Ref.btnHome.addEventListener("click", () => {
            GameState.WON = false;
            GameState.LOST = false;
            GameState.startscreen = true;
            GameState.gameReset();
            Ref.hideButton(Ref.btnHome);
            Ref.showButton(Ref.btnStart);
            Ref.hideButton(Ref.btnRestart);
            Ref.hideButton(Ref.btnNextLvl);
        });
    }
}

new StartGame();
