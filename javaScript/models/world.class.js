class World {
    //#region properties
    character = new Character();
    enemies = [new Chicken(), new Chicken(), new Chicken()];
    clouds = [new Cloud()];
    backgroundObjects = [
        new BackgroundObject(ImgHub.BACKGROUND.AIR),
        new BackgroundObject(ImgHub.BACKGROUND.THIRD_LAYER[0]),
        new BackgroundObject(ImgHub.BACKGROUND.SECOND_LAYER[0]),
        new BackgroundObject(ImgHub.BACKGROUND.FIRST_LAYER[0]),
    ];
    canvas;
    ctx;

    //#endregion

    constructor(canvas) {
        this.ctx = canvas.getContext("2d");
        this.canvas = canvas;
        this.draw();
    }

    //#region methods

    draw() {
        // canvas leeren
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        // objekte hinzufügen
        this.addObjectsToMap(this.backgroundObjects);
        this.addToMap(this.character);
        this.addObjectsToMap(this.clouds);
        this.addObjectsToMap(this.enemies);

        requestAnimationFrame(() => this.draw()); // draw wird immer wieder aufgerufen
    }

    // for each durch array von img der objekte
    addObjectsToMap(objects){
        objects.forEach(o => {
            this.addToMap(o);
        })
    }

    // zeigt objekte auf canvas an
    addToMap(mo) {
        this.ctx.drawImage(mo.img, mo.x, mo.y, mo.width, mo.height);
    }
    //#endregion
}
