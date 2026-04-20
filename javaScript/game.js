
let canvas;
let world;

function init(){
    canvas = document.getElementById("canvas");
    world = new World(canvas);
    console.log(world.character);
    
}

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
})

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
})