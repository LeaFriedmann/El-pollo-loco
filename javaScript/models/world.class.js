class World {
    //#region properties
    character = new Character();
    enemies = [new Chicken(), new Chicken(), new Chicken()];
    clouds = [new Cloud()];
    backgroundObjects = [
        new BackgroundObject(ImgHub.BACKGROUND.AIR, -719),
        new BackgroundObject(ImgHub.BACKGROUND.THIRD_LAYER[1], -719),
        new BackgroundObject(ImgHub.BACKGROUND.SECOND_LAYER[1], -719),
        new BackgroundObject(ImgHub.BACKGROUND.FIRST_LAYER[1], -719),

        new BackgroundObject(ImgHub.BACKGROUND.AIR, 0),
        new BackgroundObject(ImgHub.BACKGROUND.THIRD_LAYER[0], 0),
        new BackgroundObject(ImgHub.BACKGROUND.SECOND_LAYER[0], 0),
        new BackgroundObject(ImgHub.BACKGROUND.FIRST_LAYER[0], 0),

        new BackgroundObject(ImgHub.BACKGROUND.AIR, 719),
        new BackgroundObject(ImgHub.BACKGROUND.THIRD_LAYER[1], 719),
        new BackgroundObject(ImgHub.BACKGROUND.SECOND_LAYER[1], 719),
        new BackgroundObject(ImgHub.BACKGROUND.FIRST_LAYER[1], 719),

        new BackgroundObject(ImgHub.BACKGROUND.AIR, 719 * 2),
        new BackgroundObject(ImgHub.BACKGROUND.THIRD_LAYER[0], 719 * 2),
        new BackgroundObject(ImgHub.BACKGROUND.SECOND_LAYER[0], 719 * 2),
        new BackgroundObject(ImgHub.BACKGROUND.FIRST_LAYER[0], 719 * 2),
    ];
    canvas;
    ctx;
    static CAMERA_X = 0;

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

        this.ctx.translate(World.CAMERA_X, 0);
        
        // objekte hinzufügen
        this.addObjectsToMap(this.backgroundObjects);
        this.addToMap(this.character);
        this.addObjectsToMap(this.clouds);
        this.addObjectsToMap(this.enemies);

        this.ctx.translate(-World.CAMERA_X, 0);

        requestAnimationFrame(() => this.draw()); // draw wird immer wieder aufgerufen
    }

    // for each durch array von img der objekte
    addObjectsToMap(objects){
        objects.forEach(o => {
            this.addToMap(o);
        })
    }

    // zeigt objekte auf canvas an
    // dreht objekt bei laufen in andere richtung
    // TODO erklärung googlen
    addToMap(mo) {
        if (mo.otherDirection) {
            this.ctx.save();
            this.ctx.translate(mo.width, 0);
            this.ctx.scale(-1, 1);
            mo.x = mo.x * -1;
        }
        this.ctx.drawImage(mo.img, mo.x, mo.y, mo.width, mo.height);
        if (mo.otherDirection) {
            mo.x = mo.x * -1;
            this.ctx.restore();
        }
    }
    //#endregion
}
